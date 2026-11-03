// Family Tech: gold outlines on waystones near chosen players, visible through walls.
// Settings in kubejs/config/family_waystone_glow.json: players (who gets outlines), radius (blocks),
// color (glow colour as an int, 16755200 = gold). /waystoneglow toggles it for yourself.
// How: every second, for each chosen player with it switched on, every waystone block entity in
// loaded chunks within the radius gets a glowing block_display copy of its block, scaled to 0.98 so
// it hides inside the real block; only its outline shows, through walls. Glowing is seen by every
// player near it, not only the chosen ones. Nothing in the world changes: the copies are removed
// when nobody chosen is near, and leftovers (after a restart or /reload) are swept by their tag.
const $WGBuiltIn = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
const $WGComponent = Java.loadClass("net.minecraft.network.chat.Component")
const $WGBlockDisplay = Java.loadClass("net.minecraft.world.entity.Display$BlockDisplay")
const WG_FILE = "kubejs/config/family_waystone_glow.json"
const WG_TAG = "family_waystone_glow"
let wgCfg = {}
try { wgCfg = JsonIO.read(WG_FILE) || {} } catch (e) { console.error(`family_waystone_glow: can't read ${WG_FILE}: ${e}`) }
let wgPlayers = []
if (wgCfg.players) for (let p of wgCfg.players) wgPlayers.push(String(p).toLowerCase())
let wgRadius = Number(wgCfg.radius) || 48
let wgColor = Number(wgCfg.color) || 16755200
let wgShown = {}   // tag -> true for every outline we've summoned and not yet removed
let wgTicks = 0
console.info(`family_waystone_glow: ${wgCfg.enabled === false ? "off" : "on"}, radius ${wgRadius}, players: ${wgPlayers.join(", ")}`)

function wgAllowed(player) { return wgPlayers.indexOf(String(player.getGameProfile().getName()).toLowerCase()) >= 0 }
function wgOn(player) { return wgAllowed(player) && !player.persistentData.getBoolean("waystone_glow_off") }

// block_state NBT for the summon command: {Name:"ns:id",Properties:{k:"v",...}}
function wgStateNbt(state) {
  let props = []
  let it = state.getProperties().iterator()
  while (it.hasNext()) {
    let p = it.next()
    props.push(`${p.getName()}:"${p.getName(state.getValue(p))}"`)
  }
  return `{Name:"${$WGBuiltIn.BLOCK.getKey(state.getBlock())}",Properties:{${props.join(",")}}}`
}

// Waystones (any *waystone block from the waystones mod) within the radius of a player, in loaded chunks.
function wgFind(player, out) {
  let level = player.level
  let dim = String(level.dimension)
  let px = player.getX(), py = player.getY(), pz = player.getZ()
  let r2 = wgRadius * wgRadius
  let c0x = Math.floor((px - wgRadius) / 16), c1x = Math.floor((px + wgRadius) / 16)
  let c0z = Math.floor((pz - wgRadius) / 16), c1z = Math.floor((pz + wgRadius) / 16)
  for (let cx = c0x; cx <= c1x; cx++) for (let cz = c0z; cz <= c1z; cz++) {
    let chunk = level.getChunkSource().getChunkNow(cx, cz)
    if (!chunk) continue
    let it = chunk.getBlockEntities().values().iterator()
    while (it.hasNext()) {
      let be = it.next()
      let state = be.getBlockState()
      let id = String($WGBuiltIn.BLOCK.getKey(state.getBlock()))
      if (id.indexOf("waystones:") != 0 || !/waystone$/.test(id)) continue
      let pos = be.getBlockPos()
      let dx = pos.getX() + 0.5 - px, dy = pos.getY() + 0.5 - py, dz = pos.getZ() + 0.5 - pz
      if (dx * dx + dy * dy + dz * dz > r2) continue
      let tag = `fwg_${dim.replace(/[^a-z0-9_]/g, ".")}_${pos.getX()}_${pos.getY()}_${pos.getZ()}`
      out[tag] = { dim: dim, x: pos.getX(), y: pos.getY(), z: pos.getZ(), state: state }
    }
  }
}

function wgSummon(server, tag, w) {
  server.runCommandSilent(`execute in ${w.dim} run summon minecraft:block_display ${w.x}.0 ${w.y}.0 ${w.z}.0 ` +
    `{Tags:["${WG_TAG}","${tag}"],Glowing:1b,glow_color_override:${wgColor},view_range:2.0f,` +
    `block_state:${wgStateNbt(w.state)},` +
    `transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[0.01f,0.01f,0.01f],scale:[0.98f,0.98f,0.98f]}}`)
}

function wgRemove(server, tag) { server.runCommandSilent(`kill @e[type=minecraft:block_display,tag=${tag}]`) }

// Remove outline entities we don't know about (left from before a restart or /reload) near chosen players.
function wgSweep(player, wanted) {
  let box = player.getBoundingBox().inflate(wgRadius + 16)
  let list = player.level.getEntitiesOfClass($WGBlockDisplay, box)
  let it = list.iterator()
  while (it.hasNext()) {
    let e = it.next()
    let tags = e.getTags()
    if (!tags.contains(WG_TAG)) continue
    let known = false
    let ti = tags.iterator()
    while (ti.hasNext()) { let t = String(ti.next()); if (wgShown[t] && wanted[t]) known = true }
    if (!known) e.discard()
  }
}

ServerEvents.tick(event => {
  if (++wgTicks % 20 != 0) return
  let server = event.server
  let wanted = {}
  let near = []
  if (wgCfg.enabled !== false) {
    let it = server.getPlayerList().getPlayers().iterator()
    while (it.hasNext()) {
      let player = it.next()
      if (!wgOn(player)) continue
      near.push(player)
      try { wgFind(player, wanted) } catch (e) { console.error(`family_waystone_glow: find failed: ${e}`) }
    }
  }
  for (let tag in wgShown) if (!wanted[tag]) { wgRemove(server, tag); delete wgShown[tag] }
  if (wgTicks % 200 == 0) near.forEach(p => { try { wgSweep(p, wanted) } catch (e) { console.error(`family_waystone_glow: sweep failed: ${e}`) } })
  for (let tag in wanted) if (!wgShown[tag]) { wgSummon(server, tag, wanted[tag]); wgShown[tag] = true }
})

ServerEvents.commandRegistry(event => {
  let Commands = event.commands
  event.register(Commands.literal("waystoneglow")
    .requires(src => { let p = src.getPlayer(); return p != null && wgAllowed(p) })
    .executes(ctx => {
      let p = ctx.source.getPlayer()
      let off = !p.persistentData.getBoolean("waystone_glow_off")
      p.persistentData.putBoolean("waystone_glow_off", off)
      ctx.source.sendSuccess(() => $WGComponent.literal(off ? "§6Waystone outlines: off" : "§6Waystone outlines: on"), false)
      return 1
    }))
})
