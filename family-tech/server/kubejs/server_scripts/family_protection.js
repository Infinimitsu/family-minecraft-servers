// Family Tech: protect world-generated towns from being broken or built on.
// Settings: kubejs/config/family_protection.json (dashboard-editable, applied on /reload).
//
// Inside any structure listed under "structures" (ids, or #tags like #minecraft:village),
// minus the ids under "except":
//   - players (and Create-style machines acting as players) can't break or place blocks,
//     except blocks listed in "allow_break" / "allow_place" (crops, flowers, torches...);
//   - explosions don't destroy blocks;
//   - with "protect_villagers", players can't hurt villagers, wandering traders or golems.
// Doors, chests (Lootr), trading, beds for sleeping all still work: only breaking/placing is blocked.
// Admins bypass: operators (permission level 2+) in creative mode, and names in "bypass_players".
// Check a spot in game: /familyprotect here   (ops: /familyprotect at x y z)

const PROTECT_FILE = "kubejs/config/family_protection.json"
const $Registries = Java.loadClass("net.minecraft.core.registries.Registries")
const $BuiltIn = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
const $TagKey = Java.loadClass("net.minecraft.tags.TagKey")
const $RL = Java.loadClass("net.minecraft.resources.ResourceLocation")
const $Component = Java.loadClass("net.minecraft.network.chat.Component")
const $BlockPos = Java.loadClass("net.minecraft.core.BlockPos")

const listOf = x => { let out = []; if (x) for (let i of x) out.push(String(i)); return out }
let cfg = {}
try { cfg = JsonIO.read(PROTECT_FILE) || {} } catch (e) { console.error(`family_protection: can't read ${PROTECT_FILE}: ${e}`) }
const ENABLED = cfg.enabled !== false
const structIds = new Set(), structTags = [], EXCEPT = new Set(listOf(cfg.except))
listOf(cfg.structures).forEach(s => s.startsWith("#")
  ? structTags.push($TagKey.create($Registries.STRUCTURE, $RL.parse(s.slice(1)))) : structIds.add(s))
const splitBlocks = list => {
  const ids = new Set(), tags = []
  listOf(list).forEach(s => s.startsWith("#") ? tags.push($TagKey.create($Registries.BLOCK, $RL.parse(s.slice(1)))) : ids.add(s))
  return { ids, tags }
}
const ALLOW_BREAK = splitBlocks(cfg.allow_break), ALLOW_PLACE = splitBlocks(cfg.allow_place)
const BYPASS = new Set(listOf(cfg.bypass_players).map(n => n.toLowerCase()))
const PROTECT_MOBS = cfg.protect_villagers !== false
const PROTECTED_MOBS = new Set(["minecraft:villager", "minecraft:wandering_trader", "minecraft:iron_golem", "guardvillagers:guard"])
const MESSAGE = $Component.literal(String(cfg.message || "This town is protected."))

// Resolved lazily (registries aren't ready while the script loads): concrete Structure objects for
// the configured ids. Tags are passed as TagKeys. Both use unambiguous getStructureWithPieceAt overloads.
let structObjs = null
function structuresFor(level) {
  if (structObjs) return structObjs
  const reg = level.registryAccess().registryOrThrow($Registries.STRUCTURE)
  structObjs = []
  structIds.forEach(id => { let structure = reg.get($RL.parse(id)); if (structure) structObjs.push(structure) })
  return structObjs
}
function keyOf(level, structure) {
  const key = level.registryAccess().registryOrThrow($Registries.STRUCTURE).getKey(structure)
  return key ? String(key) : "structure"
}
function structureAt(level, pos) {
  if (!ENABLED) return null
  const mgr = level.structureManager()
  // Overloads are spelled out (Rhino can't pick between them), and block-scoped consts are
  // avoided inside loops and try blocks (Rhino reports them as "redeclaration").
  const byStructure = "getStructureWithPieceAt(net.minecraft.core.BlockPos,net.minecraft.world.level.levelgen.structure.Structure)"
  const byTag = "getStructureWithPieceAt(net.minecraft.core.BlockPos,net.minecraft.tags.TagKey)"
  const list = structuresFor(level)
  for (let i = 0; i < list.length; i++) {
    let found = mgr[byStructure](pos, list[i])
    if (found && found.isValid()) return keyOf(level, found.getStructure())
  }
  for (let i = 0; i < structTags.length; i++) {
    let found = mgr[byTag](pos, structTags[i])
    if (found && found.isValid()) {
      let id = keyOf(level, found.getStructure())
      if (!EXCEPT.has(id)) return id
    }
  }
  return null
}

// A broken handler must never break the game: log the first few errors and carry on.
let errors = 0
const safe = fn => e => { try { fn(e) } catch (err) { if (errors++ < 5) console.error(`family_protection: ${err}`) } }

const blockAllowed = (state, allow) =>
  allow.ids.has(String($BuiltIn.BLOCK.getKey(state.getBlock()))) || allow.tags.some(tag => state.is(tag))

function bypasses(player) {
  if (!player) return false
  if (BYPASS.has(String(player.getGameProfile().getName()).toLowerCase())) return true
  return player.hasPermissions(2) && player.isCreative()
}

function deny(player) {
  if (player && player.displayClientMessage) player.displayClientMessage(MESSAGE, true)
}

// The listeners are registered once in startup_scripts/family_protection_events.js; they call these.
const HANDLERS = !ENABLED ? {} : {
  onBreak: safe(e => {
    const level = e.getLevel(), player = e.getPlayer()
    if (level.isClientSide() || bypasses(player) || blockAllowed(e.getState(), ALLOW_BREAK)) return
    if (structureAt(level, e.getPos())) { e.setCanceled(true); deny(player) }
  }),
  onPlace: safe(e => {
    const level = e.getLevel(), entity = e.getEntity()
    const player = entity && entity.isPlayer && entity.isPlayer() ? entity : null
    if (level.isClientSide() || bypasses(player) || blockAllowed(e.getPlacedBlock(), ALLOW_PLACE)) return
    if (structureAt(level, e.getPos())) { e.setCanceled(true); deny(player) }
  }),
  onExplode: safe(e => {
    const level = e.getLevel()
    if (!level.isClientSide()) e.getAffectedBlocks().removeIf(pos => structureAt(level, pos) != null)
  }),
  onHurt: safe(e => {
    if (!PROTECT_MOBS) return
    const victim = e.getEntity(), attacker = e.getSource().getEntity()
    if (!attacker || !attacker.isPlayer || !attacker.isPlayer() || bypasses(attacker)) return
    if (!PROTECTED_MOBS.has(String($BuiltIn.ENTITY_TYPE.getKey(victim.getType())))) return
    if (structureAt(victim.level(), victim.blockPosition())) { e.setCanceled(true); deny(attacker) }
  }),
}
const holder = global.familyProtect
if (holder) { holder.clear(); Object.keys(HANDLERS).forEach(k => holder.put(k, HANDLERS[k])) }
else console.error("family_protection: startup listeners missing (restart the server)")
console.info(`family_protection: ${ENABLED ? "on" : "off"}; ${structIds.size} structure ids, ${structTags.length} tags; ` +
  `allow break ${ALLOW_BREAK.ids.size}+${ALLOW_BREAK.tags.length} tags, place ${ALLOW_PLACE.ids.size}+${ALLOW_PLACE.tags.length}; villagers ${PROTECT_MOBS}`)

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event
  const report = (ctx, x, y, z) => {
    let msg, where
    try {
      where = structureAt(ctx.source.getLevel(), new $BlockPos(x, y, z))
      msg = where ? `Protected: inside ${where}` : "Not protected here"
    } catch (err) { msg = `familyprotect error: ${err}` }
    console.info(`familyprotect ${x} ${y} ${z}: ${msg}`)
    ctx.source.sendSuccess(() => $Component.literal(msg), false)
    return 1
  }
  const pos = ctx => { let p = ctx.source.getPosition(); return [Math.floor(p.x()), Math.floor(p.y()), Math.floor(p.z())] }
  event.register(Commands.literal("familyprotect")
    .then(Commands.literal("ping").executes(ctx => { console.info("familyprotect ping ok (v3)"); return 1 }))
    .then(Commands.literal("here").executes(ctx => { let [x, y, z] = pos(ctx); return report(ctx, x, y, z) }))
    .then(Commands.literal("at").requires(src => src.hasPermission(2))
      .then(Commands.argument("x", Arguments.INTEGER.create(event))
        .then(Commands.argument("y", Arguments.INTEGER.create(event))
          .then(Commands.argument("z", Arguments.INTEGER.create(event))
            .executes(ctx => report(ctx, Arguments.INTEGER.getResult(ctx, "x"), Arguments.INTEGER.getResult(ctx, "y"), Arguments.INTEGER.getResult(ctx, "z"))))))))
})
