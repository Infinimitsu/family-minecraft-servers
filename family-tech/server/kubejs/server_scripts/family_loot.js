// Family Tech loot: far more generous than vanilla, in three tiers by danger.
// Deployed to the server's kubejs/server_scripts by tools/deploy-server-files.sh.
// Takes effect on /reload for any chest not opened yet (no world reset needed).
//
// Every chest loot table (vanilla and modded) gets one extra "tier pool" on top of
// its normal loot, and all chest stacks are doubled. Tiers are picked from the
// table id; first match wins:
//   boss      treasure rooms, vaults, strongholds, bastions, end cities, mansions...
//   everyday  village houses, supply crates, camps, barrels
//   adventure everything else (dungeons, mineshafts, temples, ruins, shipwrecks...)

const BOSS_WORDS = ["treasure", "vault", "boss", "elite", "reward_rare", "end_city", "ancient_cit",
  "bastion", "stronghold", "mansion", "monument", "keep_kayra", "shiraz", "heavenly", "mechanical_nest",
  "citadel", "nether_keep", "end_castle", "obsidian", "beacon"]
const EVERYDAY_WORDS = ["village", "house", "supply", "campsite", "tent", "barrel", "igloo", "library",
  "gardening", "bedroom", "wool", "pub", "food", "water_supply", "storage", "pot"]

function tierOf(id) {
  const path = String(id).split(":")[1] || ""
  if (BOSS_WORDS.some(w => path.includes(w))) return "boss"
  if (EVERYDAY_WORDS.some(w => path.includes(w))) return "everyday"
  return "adventure"
}

// [item, count, weight] or [LootEntry, weight]
const item = (id, count, weight) => LootEntry.of(id).setCount(count).withWeight(weight)
const book = (levels, weight) => LootEntry.of("minecraft:book").enchantWithLevels(levels).withWeight(weight)
const gear = (id, levels, weight) => LootEntry.of(id).enchantWithLevels(levels).withWeight(weight)

const TIERS = {
  everyday: {
    rolls: [3, 5],
    entries: () => [
      item("minecraft:bread", [4, 12], 12), item("minecraft:cooked_beef", [4, 10], 10),
      item("minecraft:iron_ingot", [3, 10], 15), item("minecraft:gold_ingot", [2, 6], 10),
      item("minecraft:emerald", [2, 8], 12), item("minecraft:coal", [8, 24], 8),
      item("minecraft:diamond", [1, 3], 7), item("minecraft:ender_pearl", [1, 4], 5),
      item("minecraft:experience_bottle", [4, 12], 8), item("minecraft:netherite_scrap", 1, 3),
      item("create:andesite_alloy", [8, 24], 8), item("create:brass_ingot", [2, 8], 5),
      item("mekanism:ingot_osmium", [4, 12], 6), item("mysticalagriculture:inferium_essence", [8, 32], 8),
      item("ars_nouveau:source_gem", [2, 6], 5), item("minecraft:name_tag", 1, 3),
      item("minecraft:saddle", 1, 2), book([10, 20], 6),
    ],
  },
  adventure: {
    rolls: [4, 7],
    entries: () => [
      item("minecraft:diamond", [2, 6], 15), item("minecraft:emerald", [4, 12], 10),
      item("minecraft:gold_block", [1, 3], 6), item("minecraft:iron_block", [1, 3], 6),
      item("minecraft:ancient_debris", [1, 3], 10), item("minecraft:netherite_scrap", [1, 4], 12),
      item("minecraft:netherite_upgrade_smithing_template", 1, 7),
      item("minecraft:golden_apple", [1, 3], 6), item("minecraft:ender_pearl", [2, 8], 6),
      item("minecraft:experience_bottle", [8, 24], 8), item("minecraft:totem_of_undying", 1, 2),
      item("mysticalagriculture:prudentium_essence", [8, 24], 6), item("mekanism:alloy_infused", [2, 6], 4),
      book([20, 30], 10), gear("minecraft:diamond_pickaxe", [25, 35], 2), gear("minecraft:diamond_sword", [25, 35], 2),
    ],
  },
  boss: {
    rolls: [6, 10],
    entries: () => [
      item("minecraft:netherite_ingot", [1, 3], 12), item("minecraft:netherite_upgrade_smithing_template", [1, 3], 12),
      item("minecraft:ancient_debris", [2, 6], 10), item("minecraft:diamond_block", [1, 3], 8),
      item("minecraft:emerald_block", [1, 4], 6), item("minecraft:enchanted_golden_apple", [1, 2], 4),
      item("minecraft:totem_of_undying", 1, 5), item("minecraft:experience_bottle", [16, 48], 6),
      item("minecraft:nether_star", 1, 2), item("minecraft:elytra", 1, 1),
      item("mysticalagriculture:imperium_essence", [4, 16], 4),
      book([30, 39], 10), gear("minecraft:diamond_helmet", [30, 39], 2), gear("minecraft:diamond_chestplate", [30, 39], 2),
      gear("minecraft:diamond_leggings", [30, 39], 2), gear("minecraft:diamond_boots", [30, 39], 2),
      gear("minecraft:netherite_sword", [30, 39], 2), gear("minecraft:netherite_pickaxe", [30, 39], 1),
    ],
  },
}

LootJS.lootTables(event => {
  const counts = { everyday: 0, adventure: 0, boss: 0 }
  // (getLootTableIds' regex filter matched nothing here, so filter the full list in JS.)
  event.getLootTableIds().forEach(id => {
    const s = String(id)
    if (!s.includes(":chests/") || s.includes("inject")) return // inject = other mods' add-on pools
    const tier = tierOf(id)
    const t = TIERS[tier]
    event.getLootTable(id).createPool(pool => {
      pool.name("family_tier_" + tier)
      pool.rolls(t.rolls)
      t.entries().forEach(e => pool.addEntry(e))
    })
    counts[tier]++
  })
  console.info(`family_loot: tier pools added (everyday ${counts.everyday}, adventure ${counts.adventure}, boss ${counts.boss})`)

  // Fishing: much less junk, much more treasure.
  const fishing = event.getLootTable("minecraft:gameplay/fishing")
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

const doubled = it => {
  it.setCount(Math.min(it.getCount() * 2, it.getMaxStackSize()))
  return it
}

LootJS.modifiers(event => {
  // Twice the normal chest loot (stackable items).
  event.addTableModifier(LootType.CHEST).modifyLoot(Ingredient.all, doubled)

  // Mob drops: doubled, plus a chance of something shiny from anything that drops loot.
  event.addTableModifier(LootType.ENTITY).modifyLoot(Ingredient.all, doubled)
  event.addTableModifier(LootType.ENTITY).addLoot(LootEntry.of("minecraft:emerald").setCount([1, 3]).randomChance(0.15))
  event.addTableModifier(LootType.ENTITY).addLoot(LootEntry.of("minecraft:diamond").randomChance(0.03))
  event.addTableModifier(LootType.ENTITY).addLoot(LootEntry.of("minecraft:netherite_scrap").randomChance(0.01))

  // Fishing: a bonus catch now and then.
  event.addTableModifier(LootType.FISHING).addLoot(LootEntry.of("minecraft:emerald").setCount([1, 4]).randomChance(0.2))
  event.addTableModifier(LootType.FISHING).addLoot(LootEntry.of("minecraft:diamond").randomChance(0.05))

  // Archaeology (brushing suspicious sand/gravel): often an extra treasure.
  event.addTableModifier(LootType.ARCHAEOLOGY).addLoot(LootEntry.of("minecraft:emerald").setCount([2, 6]).randomChance(0.4))
  event.addTableModifier(LootType.ARCHAEOLOGY).addLoot(LootEntry.of("minecraft:diamond").setCount([1, 3]).randomChance(0.25))
  event.addTableModifier(LootType.ARCHAEOLOGY).addLoot(LootEntry.of("minecraft:netherite_scrap").randomChance(0.1))
  event.addTableModifier(LootType.ARCHAEOLOGY).addLoot(LootEntry.of("minecraft:netherite_upgrade_smithing_template").randomChance(0.05))
})
