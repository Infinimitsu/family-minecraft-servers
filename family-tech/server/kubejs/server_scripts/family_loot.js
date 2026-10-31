// Family Tech loot: extra loot on top of vanilla, in three tiers by danger, at a strength
// picked from a profile (kubejs/config/family_loot.json, "profile"; the World Management
// Dashboard shows it as a dropdown). /reload applies a change to every chest not opened yet;
// Lootr chests use it from their next refill. Deployed by tools/deploy-server-files.sh.
//
// Every chest loot table (vanilla and modded) gets one extra "tier pool" on top of its
// normal loot (vanilla items plus items from the pack's mods), and a "book pool" that
// sometimes adds a mod's guide book or one of our Field Notes (kubejs/family_books.json).
// Libraries get a bigger book pool of their own. Tiers are picked from the table id; first
// match wins:
//   boss      treasure rooms, vaults, strongholds, bastions, end cities, mansions...
//   everyday  village houses and workshops, supply crates, camps, barrels
//   adventure everything else (dungeons, mineshafts, temples, ruins, shipwrecks...)

// Profiles. tiers: extra rolls per tier (null = no tier pools). chest_stacks / mob_drops:
// multiply stack sizes (1 = unchanged). fishing / archaeology: our bonus catches and finds.
// books: multiplies the book chances in family_books.json (0 = no books).
// "normal" is what ran from 2026-10-28 (the user found the earlier "generous" too much).
const PROFILES = {
  off:      { tiers: null, chest_stacks: 1, mob_drops: 1, fishing: false, archaeology: false, books: 1 },
  light:    { tiers: { everyday: [0, 1], adventure: [1, 2], boss: [2, 3] },
              chest_stacks: 1, mob_drops: 1, fishing: false, archaeology: true, books: 1 },
  normal:   { tiers: { everyday: [1, 3], adventure: [2, 4], boss: [3, 6] },
              chest_stacks: 1, mob_drops: 2, fishing: true, archaeology: true, books: 1 },
  generous: { tiers: { everyday: [3, 5], adventure: [4, 7], boss: [6, 10] },
              chest_stacks: 2, mob_drops: 2, fishing: true, archaeology: true, books: 1.5 },
}
const LOOT_FILE = "kubejs/config/family_loot.json"
let lootCfg = {}
try { lootCfg = JsonIO.read(LOOT_FILE) || {} } catch (e) { console.error(`family_loot: can't read ${LOOT_FILE}: ${e}`) }
let profileName = String(lootCfg.profile || "normal")
if (!PROFILES[profileName]) {
  console.error(`family_loot: unknown profile "${profileName}" in ${LOOT_FILE}; using normal (choices: ${Object.keys(PROFILES).join(", ")})`)
  profileName = "normal"
}
const PROFILE = PROFILES[profileName]
console.info(`family_loot: profile ${profileName}`)

const BOSS_WORDS = ["treasure", "vault", "boss", "elite", "reward_rare", "end_city", "ancient_cit",
  "bastion", "stronghold", "mansion", "monument", "keep_kayra", "shiraz", "heavenly", "mechanical_nest",
  "citadel", "nether_keep", "end_castle", "obsidian", "beacon"]
const EVERYDAY_WORDS = ["village", "house", "supply", "campsite", "tent", "barrel", "igloo", "library",
  "gardening", "bedroom", "wool", "pub", "food", "water_supply", "storage", "pot",
  // Town workshops of mods that don't put "village" in the id (Katters, Nova hamlets, Create).
  "smith", "farmer", "windmill", "hamlet", "cartographer", "lighthouse"]
// Libraries (also inside boss structures) get the library book pool.
const LIBRARY_WORDS = ["librar", "archive", "study", "scriptorium", "bookshelf"]
const isLibrary = id => LIBRARY_WORDS.some(w => (String(id).split(":")[1] || "").includes(w))

function tierOf(id) {
  const path = String(id).split(":")[1] || ""
  if (BOSS_WORDS.some(w => path.includes(w))) return "boss"
  if (EVERYDAY_WORDS.some(w => path.includes(w))) return "everyday"
  return "adventure"
}

// Entries from a mod that isn't installed are skipped (null, filtered out below), so the
// lists can name mods the server doesn't have yet. Every id was checked against the jars.
function modLoaded(id) { return Platform.isLoaded(String(id).split(":")[0]) }
// An id that isn't a real item is skipped with an error instead of stopping the whole script.
function item(id, count, weight) {
  if (!modLoaded(id)) return null
  try { return LootEntry.of(id).setCount(count).withWeight(weight) } catch (e) {
    console.error(`family_loot: skipped unknown item ${id}`); return null
  }
}
const book = (levels, weight) => LootEntry.of("minecraft:book").enchantWithLevels(levels).withWeight(weight)
const gear = (id, levels, weight) => LootEntry.of(id).enchantWithLevels(levels).withWeight(weight)

const TIERS = {
  everyday: {
    entries: () => [
      item("minecraft:bread", [2, 6], 10), item("minecraft:cooked_beef", [2, 5], 8),
      item("minecraft:iron_ingot", [2, 6], 12), item("minecraft:gold_ingot", [1, 4], 8),
      item("minecraft:emerald", [1, 5], 10), item("minecraft:coal", [4, 12], 8),
      item("minecraft:diamond", 1, 3), item("minecraft:ender_pearl", [1, 2], 4),
      item("minecraft:experience_bottle", [2, 6], 6), item("minecraft:name_tag", 1, 2),
      item("minecraft:saddle", 1, 2), book([5, 15], 4),
      // Starter materials from the pack's mods.
      item("create:andesite_alloy", [4, 12], 8), item("create:zinc_ingot", [2, 6], 5), item("create:cogwheel", [2, 6], 4),
      item("create:shaft", [4, 12], 4), item("mekanism:ingot_osmium", [2, 8], 6), item("mekanism:ingot_tin", [2, 6], 4),
      item("farmersdelight:tomato_seeds", [2, 5], 4), item("farmersdelight:cabbage_seeds", [2, 5], 4),
      item("farmersdelight:rice", [2, 5], 4), item("farmersdelight:onion", [2, 5], 3), item("farmersdelight:flint_knife", 1, 2),
      item("mysticalagriculture:inferium_essence", [4, 16], 6), item("mysticalagriculture:inferium_seeds", 1, 2),
      item("ars_nouveau:source_gem", [1, 4], 4), item("occultism:datura_seeds", [1, 3], 2),
      item("refinedstorage:quartz_enriched_iron", [2, 6], 3), item("refinedstorage:silicon", [2, 6], 3),
      item("sophisticatedbackpacks:backpack", 1, 2), item("waystones:warp_scroll", 1, 3), item("waystones:return_scroll", 1, 3),
      item("numismatics:spur", [4, 16], 4), item("numismatics:bevel", [1, 4], 2),
      item("cyclic:apple_honey", [1, 3], 2), item("cyclic:sleeping_mat", 1, 2),
    ],
  },
  adventure: {
    entries: () => [
      item("minecraft:diamond", [1, 3], 12), item("minecraft:emerald", [2, 8], 10),
      item("minecraft:gold_block", 1, 4), item("minecraft:iron_block", 1, 4),
      item("minecraft:ancient_debris", 1, 5), item("minecraft:netherite_scrap", [1, 2], 6),
      item("minecraft:netherite_upgrade_smithing_template", 1, 4),
      item("minecraft:golden_apple", [1, 2], 5), item("minecraft:ender_pearl", [1, 4], 5),
      item("minecraft:experience_bottle", [4, 12], 6), item("minecraft:totem_of_undying", 1, 1),
      book([15, 30], 8), gear("minecraft:diamond_pickaxe", [20, 30], 1), gear("minecraft:diamond_sword", [20, 30], 1),
      // Mid-game parts: things that save a few steps up each mod's ladder.
      item("create:brass_ingot", [2, 6], 6), item("create:precision_mechanism", 1, 3), item("create:electron_tube", [1, 3], 3),
      item("mekanism:alloy_infused", [2, 4], 5), item("mekanism:basic_control_circuit", [1, 3], 4),
      item("mekanism:alloy_reinforced", [1, 2], 2), item("mekanism:advanced_control_circuit", 1, 2),
      item("mysticalagriculture:prudentium_essence", [4, 12], 5), item("mysticalagriculture:tertium_essence", [2, 6], 2),
      item("refinedstorage:basic_processor", [1, 3], 3), item("refinedstorage:improved_processor", 1, 2),
      item("enderio:grains_of_infinity", [2, 6], 3), item("enderio:conduit_binder", [4, 12], 3),
      item("enderio:energetic_alloy_ingot", [1, 4], 2), item("enderio:dark_steel_ingot", [1, 4], 2),
      item("occultism:silver_ingot", [2, 6], 3), item("evilcraft:dark_gem", [2, 5], 3),
      item("sophisticatedbackpacks:iron_backpack", 1, 2), item("waystones:warp_stone", 1, 1), item("waystones:warp_scroll", [1, 2], 3),
      item("torchmaster:megatorch", 1, 1), item("artifacts:everlasting_beef", 1, 1), item("artifacts:running_shoes", 1, 1),
      item("projecte:alchemical_coal", [2, 6], 2), item("projecte:low_covalence_dust", [8, 24], 2),
      item("numismatics:bevel", [2, 6], 3), item("numismatics:sprocket", [1, 3], 2),
      item("cyclic:apple_iron", [1, 2], 2), item("cyclic:gem_amber", [1, 3], 2), item("cyclic:charm_fire", 1, 1),
    ],
  },
  boss: {
    entries: () => [
      item("minecraft:netherite_ingot", 1, 8), item("minecraft:netherite_upgrade_smithing_template", [1, 2], 8),
      item("minecraft:ancient_debris", [1, 4], 8), item("minecraft:diamond_block", 1, 5),
      item("minecraft:emerald_block", [1, 2], 4), item("minecraft:enchanted_golden_apple", 1, 2),
      item("minecraft:totem_of_undying", 1, 4), item("minecraft:experience_bottle", [8, 24], 5),
      item("minecraft:nether_star", 1, 1), item("minecraft:elytra", 1, 1),
      book([30, 39], 8), gear("minecraft:diamond_helmet", [30, 39], 1), gear("minecraft:diamond_chestplate", [30, 39], 1),
      gear("minecraft:diamond_leggings", [30, 39], 1), gear("minecraft:diamond_boots", [30, 39], 1),
      gear("minecraft:netherite_sword", [30, 39], 1), gear("minecraft:netherite_pickaxe", [30, 39], 1),
      // Late-game parts and rare gear.
      item("mekanism:alloy_atomic", [1, 3], 3), item("mekanism:elite_control_circuit", [1, 2], 3),
      item("mysticalagriculture:imperium_essence", [2, 8], 4), item("mysticalagriculture:supremium_essence", [1, 3], 1),
      item("refinedstorage:advanced_processor", [1, 2], 2), item("enderio:vibrant_alloy_ingot", [2, 6], 2),
      item("sophisticatedbackpacks:gold_backpack", 1, 2), item("sophisticatedbackpacks:diamond_backpack", 1, 1),
      item("create_jetpack:jetpack", 1, 1), item("compactmachines:personal_shrinking_device", 1, 1),
      item("artifacts:lucky_scarf", 1, 1), item("projecte:medium_covalence_dust", [4, 12], 2),
      item("numismatics:cog", [1, 3], 3), item("numismatics:crown", 1, 1),
      item("cyclic:apple_diamond", 1, 2), item("cyclic:heart", 1, 1), item("cyclic:charm_void", 1, 1),
    ],
  },
}

// Pokémon gear, only on servers with Cobblemon installed (the test server for now).
// (A const inside this block trips Rhino's "redeclaration" check, so cm is a top-level function.)
function cm(id) { return "cobblemon:" + id }
if (Platform.isLoaded("cobblemon")) {
  TIERS.everyday.extra = () => [
    item(cm("poke_ball"), [3, 8], 12), item(cm("great_ball"), [1, 4], 6), item(cm("exp_candy_s"), [1, 4], 6),
    item(cm("potion"), [1, 3], 5), item(cm("oran_berry"), [2, 6], 5),
  ]
  TIERS.adventure.extra = () => [
    item(cm("great_ball"), [2, 6], 8), item(cm("ultra_ball"), [1, 3], 6), item(cm("rare_candy"), [1, 3], 6),
    item(cm("exp_candy_m"), [1, 4], 5), item(cm("fire_stone"), 1, 3), item(cm("water_stone"), 1, 3),
    item(cm("thunder_stone"), 1, 3), item(cm("leaf_stone"), 1, 3), item(cm("moon_stone"), 1, 3),
    item(cm("ice_stone"), 1, 2), item(cm("everstone"), 1, 2),
  ]
  TIERS.boss.extra = () => [
    item(cm("ultra_ball"), [3, 8], 8), item(cm("rare_candy"), [3, 8], 8), item(cm("exp_candy_xl"), [1, 4], 5),
    item(cm("master_ball"), 1, 1), item(cm("sun_stone"), 1, 3), item(cm("dawn_stone"), 1, 3),
    item(cm("dusk_stone"), 1, 3), item(cm("shiny_stone"), 1, 3),
  ]
}

// Books (kubejs/family_books.json): the mods' own guide books plus our "Field Notes" written
// books for mods that have none. Each chest gets one extra roll that is a book with the
// tier's chance, otherwise nothing. Books of mods that aren't installed are skipped.
const FB_FILE = "kubejs/family_books.json"
let fbCfg = {}
try { fbCfg = JsonIO.read(FB_FILE) || {} } catch (e) { console.error(`family_loot: can't read ${FB_FILE}: ${e}`) }
const fbList = x => { let out = []; if (x) for (let i of x) out.push(i); return out }
// SNBT single-quoted string: only backslash and the quote need escaping.
const fbQuote = s => "'" + String(s).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'"
// 1.21.1 written_book_content: pages are JSON text components stored as strings.
const fbNotesId = n => "minecraft:written_book[written_book_content={title:" + fbQuote(n.title) +
  ",author:" + fbQuote(fbCfg.author || "Family Tech Library") +
  ",pages:[" + fbList(n.pages).map(p => fbQuote(JSON.stringify({ text: String(p) }))).join(",") + "]}]"
const fbBooks = []
fbList(fbCfg.guides).concat(fbList(fbCfg.notes)).forEach(b => {
  let mod = String(b.mod || String(b.item).split(":")[0])
  if (!Platform.isLoaded(mod)) return
  let id = b.item ? String(b.item) : fbNotesId(b)
  // Item.of throws on an unknown id; one bad book must not stop the whole loot script
  // (an unknown Industrial Foregoing id did that from 2026-10-28 to 10-29: no loot changes ran).
  let stack = null
  try { stack = Item.of(id) } catch (e) { stack = null }
  if (!stack || stack.isEmpty()) { console.error(`family_loot: book for ${mod} didn't parse: ${id.slice(0, 120)}`); return }
  fbBooks.push({ stack: stack, weight: Number(b.weight || 1), tiers: b.tiers ? fbList(b.tiers).map(String) : null })
})
function fbEntries(tier, chanceOverride) {
  let books = fbBooks.filter(b => !b.tiers || b.tiers.indexOf(tier) >= 0)
  if (!books.length) return []
  let chance = Math.min(0.95, (chanceOverride || Number((fbCfg.chance || {})[tier] || 0.2)) * PROFILE.books)
  if (!(chance > 0)) return []
  let total = books.reduce((s, b) => s + b.weight, 0)
  let entries = books.map(b => LootEntry.of(b.stack.copy()).withWeight(b.weight))
  entries.push(LootEntry.empty().withWeight(Math.max(1, Math.round(total * (1 - chance) / chance))))
  return entries
}
console.info(`family_loot: ${fbBooks.length} books in the book pool`)

LootJS.lootTables(event => {
  const counts = { everyday: 0, adventure: 0, boss: 0, library: 0 }
  const lib = fbCfg.library || {}
  // (getLootTableIds' regex filter matched nothing here, so filter the full list in JS.)
  event.getLootTableIds().forEach(id => {
    const s = String(id)
    if (!s.includes(":chests/") || s.includes("inject")) return // inject = other mods' add-on pools
    const tier = tierOf(id)
    const table = event.getLootTable(id)
    if (PROFILE.tiers) {
      let t = TIERS[tier]
      table.createPool(pool => {
        pool.name("family_tier_" + tier)
        pool.rolls(PROFILE.tiers[tier])
        t.entries().concat(t.extra ? t.extra() : []).filter(e => e != null).forEach(e => pool.addEntry(e))
      })
    }
    // Books: one roll (a book or nothing); libraries roll several times at a higher chance.
    let library = isLibrary(id)
    let books = library ? fbEntries(tier, Number(lib.chance || 0.6)) : fbEntries(tier)
    if (books.length) table.createPool(pool => {
      pool.name("family_books")
      pool.rolls(library ? (lib.rolls ? fbList(lib.rolls).map(Number) : [2, 4]) : 1)
      books.forEach(e => pool.addEntry(e))
    })
    counts[tier]++
    if (library) counts.library++
  })
  console.info(`family_loot: ${PROFILE.tiers ? "tier pools added" : "no tier pools"} (everyday ${counts.everyday}, adventure ${counts.adventure}, boss ${counts.boss}; libraries ${counts.library})`)

  // Fishing: much less junk, much more treasure.
  const fishing = PROFILE.fishing ? event.getLootTable("minecraft:gameplay/fishing") : null
  if (fishing) {
    fishing.modifyEntry(entry => {
      if (entry.isReference()) {
        const loc = String(entry.getLocation())
        if (loc.endsWith("/junk")) entry.setWeight(2)
        if (loc.endsWith("/treasure")) entry.setWeight(30)
      }
      return entry
    })
  }
})

const multiplied = m => it => {
  it.setCount(Math.min(Math.round(it.getCount() * m), it.getMaxStackSize()))
  return it
}

LootJS.modifiers(event => {
  // Chest stacks (the "generous" profile doubles them; 2026-10-28 the user found that too much).
  if (PROFILE.chest_stacks != 1) event.addTableModifier(LootType.CHEST).modifyLoot(Ingredient.all, multiplied(PROFILE.chest_stacks))

  // Mob drops: more of what they normally drop, nothing extra. (Until 2026-10-26 every mob could also
  // drop emeralds, diamonds and netherite scrap; the user wanted "more of what they normally drop" only.)
  if (PROFILE.mob_drops != 1) event.addTableModifier(LootType.ENTITY).modifyLoot(Ingredient.all, multiplied(PROFILE.mob_drops))

  // Fishing: a bonus catch now and then.
  if (PROFILE.fishing) {
    event.addTableModifier(LootType.FISHING).addLoot(LootEntry.of("minecraft:emerald").setCount([1, 4]).randomChance(0.2))
    event.addTableModifier(LootType.FISHING).addLoot(LootEntry.of("minecraft:diamond").randomChance(0.05))
  }

  // Archaeology (brushing suspicious sand/gravel): often an extra treasure.
  if (PROFILE.archaeology) {
    event.addTableModifier(LootType.ARCHAEOLOGY).addLoot(LootEntry.of("minecraft:emerald").setCount([2, 6]).randomChance(0.4))
    event.addTableModifier(LootType.ARCHAEOLOGY).addLoot(LootEntry.of("minecraft:diamond").setCount([1, 3]).randomChance(0.25))
    event.addTableModifier(LootType.ARCHAEOLOGY).addLoot(LootEntry.of("minecraft:netherite_scrap").randomChance(0.1))
    event.addTableModifier(LootType.ARCHAEOLOGY).addLoot(LootEntry.of("minecraft:netherite_upgrade_smithing_template").randomChance(0.05))
  }
})
