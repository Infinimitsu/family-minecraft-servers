// Family Tech mob switches: turn whole mods' creatures on or off without a restart.
// Settings: kubejs/config/family_switches.json (editable on the World Management
// Dashboard). Changes apply on /reload (the dashboard's "Reload scripts" button).
//
//   "<modid>": false  -> no creature from that mod can spawn (natural spawns, spawners
//                        and structure-placed mobs alike). Ones already in the world stay.
//   "<modid>": true   -> normal.
// Players are never blocked.

const SWITCHES_FILE = "kubejs/config/family_switches.json"
let switches = {}
try {
  switches = JsonIO.read(SWITCHES_FILE) || {}
} catch (e) {
  console.error(`family_switches: can't read ${SWITCHES_FILE}: ${e}`)
}
const blocked = Object.keys(switches).filter(mod => switches[mod] === false)
console.info(`family_switches: mobs switched off for: ${blocked.length ? blocked.join(", ") : "none"}`)

if (blocked.length) {
  EntityEvents.spawned(event => {
    const entity = event.entity
    if (entity.isPlayer()) return
    const mod = String(entity.type).split(":")[0]
    if (blocked.includes(mod)) event.cancel()
  })
}
