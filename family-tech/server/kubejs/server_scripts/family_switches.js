// Family Tech mob switches: turn whole mods' creatures on or off without a restart.
// Settings: kubejs/config/family_switches.json (editable on the World Management
// Dashboard). Changes apply on /reload (the dashboard's "Reload scripts" button).
//
//   "<modid>": false    -> no creature from that mod can spawn (natural spawns, spawners
//                          and structure-placed mobs alike). Ones already in the world stay.
//   "<modid>": true     -> normal.
//   "<modid>": "watch"  -> normal, and every new creature of that mod is logged with its
//                          position ("family_watch: ..." in the server log), e.g. to check
//                          that Family Wards' Mega Torches keep them out of towns.
// Players are never blocked.

const SWITCHES_FILE = "kubejs/config/family_switches.json"
let switches = {}
try {
  switches = JsonIO.read(SWITCHES_FILE) || {}
} catch (e) {
  console.error(`family_switches: can't read ${SWITCHES_FILE}: ${e}`)
}
const blocked = Object.keys(switches).filter(mod => switches[mod] === false)
const watched = Object.keys(switches).filter(mod => switches[mod] === "watch")
console.info(`family_switches: mobs switched off for: ${blocked.length ? blocked.join(", ") : "none"}; watched: ${watched.length ? watched.join(", ") : "none"}`)

if (blocked.length || watched.length) {
  EntityEvents.spawned(event => {
    let entity = event.entity
    if (entity.isPlayer()) return
    let mod = String(entity.type).split(":")[0]
    if (blocked.includes(mod)) {
      event.cancel()
      return
    }
    if (watched.includes(mod)) {
      // spawned also fires when a saved creature loads with its chunk: a tag marks ones already logged.
      let data = entity.persistentData
      if (data.getBoolean("family_watch_seen")) return
      data.putBoolean("family_watch_seen", true)
      console.info(`family_watch: ${entity.type} at ${Math.floor(entity.x)} ${Math.floor(entity.y)} ${Math.floor(entity.z)} in ${entity.level.dimension}`)
    }
  })
}
