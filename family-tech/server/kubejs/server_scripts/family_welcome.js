// Family Tech: our own welcome message when a player joins. The text is in
// kubejs/config/family_welcome.json (editable on the World Management Dashboard; "Reload scripts" applies).
// first_join: shown the very first time a player joins; every_join: every later join; news: every join.
// {name} is the player's name; § colour codes work (§6 gold, §7 grey, §a green).
const FW_FILE = "kubejs/config/family_welcome.json"
let fwCfg = {}
try { fwCfg = JsonIO.read(FW_FILE) || {} } catch (e) { console.error(`family_welcome: can't read ${FW_FILE}: ${e}`) }
function fwList(x) { let out = []; if (x) for (let i of x) out.push(String(i)); return out }
console.info(`family_welcome: ${fwCfg.enabled === false ? "off" : "on"}, ${fwList(fwCfg.news).length} news line(s)`)

PlayerEvents.loggedIn(event => {
  if (fwCfg.enabled === false) return
  let player = event.player
  let name = String(player.username)
  let data = player.persistentData
  let first = !data.getBoolean("family_welcomed")
  data.putBoolean("family_welcomed", true)
  let lines = fwList(first ? fwCfg.first_join : fwCfg.every_join).concat(fwList(fwCfg.news))
  lines.forEach(l => player.tell(l.replace(/\{name\}/g, name)))
})
