// Registers Family Tech's protection listeners once at startup. The logic and settings live in
// server_scripts/family_protection.js, which refills global.familyProtect on every /reload
// (server scripts may not assign to `global`, so this map is shared and they only fill it).
// Changes to THIS file need a restart.
const $HashMap = Java.loadClass("java.util.HashMap")
global.familyProtect = new $HashMap()
const call = (name, e) => { const fn = global.familyProtect.get(name); if (fn) fn(e) }
NativeEvents.onEvent("net.neoforged.neoforge.event.level.BlockEvent$BreakEvent", e => call("onBreak", e))
NativeEvents.onEvent("net.neoforged.neoforge.event.level.BlockEvent$EntityPlaceEvent", e => call("onPlace", e))
NativeEvents.onEvent("net.neoforged.neoforge.event.level.ExplosionEvent$Detonate", e => call("onExplode", e))
NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent", e => call("onHurt", e))
