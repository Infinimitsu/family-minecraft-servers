#!/usr/bin/env python3
"""Generate the family_worldgen datapack for Family Tech (Minecraft 1.21.1, NeoForge).

    python3 servers/family-tech/make_worldgen.py     # writes servers/family-tech/datapacks/family_worldgen/

What it adds (only affects chunks generated afterwards, so it must be in place before
a new world is created; tools/deploy-server-files.sh copies it into <world>/datapacks):
  - Ore patches on exposed cave floors and ceilings ("very rich"): each attempt picks a
    random spot, and only succeeds if it lands in cave air; it then scans down (floor)
    or up (ceiling) to the first solid block and grows an ore blob there. Ore only
    replaces stone/deepslate, so the patch shows on the cave surface.
  - Vanilla diamonds no longer get discarded next to air.
  - Diamond and emerald geodes, and amethyst geodes twice as often.
  - About three times the ancient debris, and some of it exposed in Nether caves.
"""
import json
import shutil
from pathlib import Path

OUT = Path(__file__).parent / "datapacks" / "family_worldgen"
NS = "family"
STONE = {"predicate_type": "minecraft:tag_match", "tag": "minecraft:stone_ore_replaceables"}
DEEP = {"predicate_type": "minecraft:tag_match", "tag": "minecraft:deepslate_ore_replaceables"}
NETHER = {"predicate_type": "minecraft:tag_match", "tag": "minecraft:base_stone_nether"}
AIR = {"type": "minecraft:matching_blocks", "blocks": ["minecraft:air", "minecraft:cave_air"]}

# name: (stone block, deepslate block, min y, max y, attempts per chunk per surface, blob size)
CAVE_ORES = {
    "coal": ("minecraft:coal_ore", "minecraft:deepslate_coal_ore", 0, 192, 30, 14),
    "iron": ("minecraft:iron_ore", "minecraft:deepslate_iron_ore", -48, 112, 30, 12),
    "copper": ("minecraft:copper_ore", "minecraft:deepslate_copper_ore", -16, 112, 20, 14),
    "gold": ("minecraft:gold_ore", "minecraft:deepslate_gold_ore", -64, 48, 16, 10),
    "redstone": ("minecraft:redstone_ore", "minecraft:deepslate_redstone_ore", -64, 16, 18, 10),
    "lapis": ("minecraft:lapis_ore", "minecraft:deepslate_lapis_ore", -64, 48, 12, 9),
    "diamond": ("minecraft:diamond_ore", "minecraft:deepslate_diamond_ore", -64, 16, 14, 8),
    "emerald": ("minecraft:emerald_ore", "minecraft:deepslate_emerald_ore", -32, 160, 10, 6),
    "zinc": ("create:zinc_ore", "create:deepslate_zinc_ore", -48, 80, 14, 10),
    "osmium": ("mekanism:osmium_ore", "mekanism:deepslate_osmium_ore", -48, 80, 12, 9),
    "tin": ("mekanism:tin_ore", "mekanism:deepslate_tin_ore", -32, 96, 12, 10),
    "lead": ("mekanism:lead_ore", "mekanism:deepslate_lead_ore", -48, 48, 10, 9),
    "uranium": ("mekanism:uranium_ore", "mekanism:deepslate_uranium_ore", -64, 0, 6, 6),
    "fluorite": ("mekanism:fluorite_ore", "mekanism:deepslate_fluorite_ore", -64, 16, 6, 8),
}


def write(rel, obj):
    p = OUT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, indent=2) + "\n")


def ore(targets, size, discard=0.0, kind="minecraft:ore"):
    return {"type": kind, "config": {"size": size, "discard_chance_on_air_exposure": discard, "targets": targets}}


def uniform(lo, hi):
    return {"type": "minecraft:uniform", "min_inclusive": {"absolute": lo}, "max_inclusive": {"absolute": hi}}


def surface_placement(count, lo, hi, direction):
    return [
        {"type": "minecraft:count", "count": count},
        {"type": "minecraft:in_square"},
        {"type": "minecraft:height_range", "height": uniform(lo, hi)},
        {"type": "minecraft:environment_scan", "direction_of_search": direction, "max_steps": 16,
         "target_condition": {"type": "minecraft:solid"}, "allowed_search_condition": AIR},
        {"type": "minecraft:biome"},
    ]


def geode(inner, alternate, alt_chance, middle="minecraft:calcite", outer="minecraft:smooth_basalt"):
    """Vanilla amethyst geode shape with a different lining. No buds grow inside."""
    state = lambda b: {"type": "minecraft:simple_state_provider", "state": {"Name": b}}
    return {"type": "minecraft:geode", "config": {
        "blocks": {
            "filling_provider": state("minecraft:air"),
            "inner_layer_provider": {"type": "minecraft:weighted_state_provider",
                                     "entries": [{"data": {"Name": b}, "weight": w} for b, w in inner]},
            "alternate_inner_layer_provider": state(alternate),
            "middle_layer_provider": state(middle),
            "outer_layer_provider": state(outer),
            # Never used (use_potential_placements_chance is 0), but the list can't be empty.
            "inner_placements": [{"Name": "minecraft:small_amethyst_bud", "Properties": {"facing": "up", "waterlogged": "false"}}],
            "cannot_replace": "#minecraft:features_cannot_replace",
            "invalid_blocks": "#minecraft:geode_invalid_blocks",
        },
        "layers": {"filling": 1.7, "inner_layer": 2.2, "middle_layer": 3.2, "outer_layer": 4.2},
        "crack": {"generate_crack_chance": 0.95, "base_crack_size": 2.0, "crack_point_offset": 2},
        "use_potential_placements_chance": 0.0, "use_alternate_layer0_chance": alt_chance,
        "placements_require_layer0_alternate": True,
        "outer_wall_distance": {"type": "minecraft:uniform", "min_inclusive": 4, "max_inclusive": 6},
        "distribution_points": {"type": "minecraft:uniform", "min_inclusive": 3, "max_inclusive": 4},
        "point_offset": {"type": "minecraft:uniform", "min_inclusive": 1, "max_inclusive": 2},
        "min_gen_offset": -16, "max_gen_offset": 16, "noise_multiplier": 0.05, "invalid_blocks_threshold": 1,
    }}


def geode_placement(rarity, lo, hi):
    return [{"type": "minecraft:rarity_filter", "chance": rarity}, {"type": "minecraft:in_square"},
            {"type": "minecraft:height_range", "height": uniform(lo, hi)}, {"type": "minecraft:biome"}]


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    write("pack.mcmeta", {"pack": {"pack_format": 48, "description": "Family Tech: rich cave ores, gem geodes, more ancient debris"}})
    wg = "data/%s/worldgen" % NS
    overworld = []
    for name, (stone, deep, lo, hi, count, size) in CAVE_ORES.items():
        write(f"{wg}/configured_feature/cave_{name}.json",
              ore([{"target": STONE, "state": {"Name": stone}}, {"target": DEEP, "state": {"Name": deep}}], size))
        for surface, direction in (("floor", "down"), ("ceiling", "up")):
            fid = f"cave_{name}_{surface}"
            write(f"{wg}/placed_feature/{fid}.json",
                  {"feature": f"{NS}:cave_{name}", "placement": surface_placement(count, lo, hi, direction)})
            overworld.append(f"{NS}:{fid}")

    # Gem geodes.
    write(f"{wg}/configured_feature/diamond_geode.json",
          geode([("minecraft:deepslate_diamond_ore", 2), ("minecraft:amethyst_block", 1)], "minecraft:diamond_block", 0.06))
    write(f"{wg}/placed_feature/diamond_geode.json", {"feature": f"{NS}:diamond_geode", "placement": geode_placement(200, -58, 0)})
    write(f"{wg}/configured_feature/emerald_geode.json",
          geode([("minecraft:emerald_ore", 2), ("minecraft:calcite", 1)], "minecraft:emerald_block", 0.06,
                middle="minecraft:tuff"))
    write(f"{wg}/placed_feature/emerald_geode.json", {"feature": f"{NS}:emerald_geode", "placement": geode_placement(150, -32, 48)})

    # Exposed ancient debris in Nether caves.
    write(f"{wg}/configured_feature/cave_debris.json",
          ore([{"target": NETHER, "state": {"Name": "minecraft:ancient_debris"}}], 3))
    write(f"{wg}/placed_feature/cave_debris.json",
          {"feature": f"{NS}:cave_debris", "placement": surface_placement(8, 8, 119, "down")})

    bm = f"data/{NS}/neoforge/biome_modifier"
    write(f"{bm}/cave_ores.json", {"type": "neoforge:add_features", "biomes": "#minecraft:is_overworld",
                                   "features": overworld, "step": "underground_ores"})
    write(f"{bm}/gem_geodes.json", {"type": "neoforge:add_features", "biomes": "#minecraft:is_overworld",
                                    "features": [f"{NS}:diamond_geode", f"{NS}:emerald_geode"], "step": "local_modifications"})
    write(f"{bm}/nether_debris.json", {"type": "neoforge:add_features", "biomes": "#minecraft:is_nether",
                                       "features": [f"{NS}:cave_debris"], "step": "underground_decoration"})

    # Vanilla overrides: diamonds keep their air-exposed blocks; amethyst geodes twice as
    # common; ancient debris three to four times as common and only half hidden.
    vwg = "data/minecraft/worldgen"
    diamonds = [{"target": STONE, "state": {"Name": "minecraft:diamond_ore"}},
                {"target": DEEP, "state": {"Name": "minecraft:deepslate_diamond_ore"}}]
    for fid, size in (("ore_diamond_small", 4), ("ore_diamond_medium", 8), ("ore_diamond_large", 12)):
        write(f"{vwg}/configured_feature/{fid}.json", ore(diamonds, size))
    write(f"{vwg}/placed_feature/amethyst_geode.json", {"feature": "minecraft:amethyst_geode", "placement": [
        {"type": "minecraft:rarity_filter", "chance": 12}, {"type": "minecraft:in_square"},
        {"type": "minecraft:height_range", "height": {"type": "minecraft:uniform", "min_inclusive": {"above_bottom": 6},
                                                      "max_inclusive": {"absolute": 30}}},
        {"type": "minecraft:biome"}]})
    debris = [{"target": NETHER, "state": {"Name": "minecraft:ancient_debris"}}]
    write(f"{vwg}/configured_feature/ore_ancient_debris_large.json", ore(debris, 3, 0.5, "minecraft:scattered_ore"))
    write(f"{vwg}/configured_feature/ore_ancient_debris_small.json", ore(debris, 2, 0.5, "minecraft:scattered_ore"))
    write(f"{vwg}/placed_feature/ore_ancient_debris_large.json", {"feature": "minecraft:ore_ancient_debris_large", "placement": [
        {"type": "minecraft:count", "count": 3}, {"type": "minecraft:in_square"},
        {"type": "minecraft:height_range", "height": {"type": "minecraft:trapezoid", "min_inclusive": {"absolute": 8},
                                                      "max_inclusive": {"absolute": 24}}},
        {"type": "minecraft:biome"}]})
    write(f"{vwg}/placed_feature/ore_debris_small.json", {"feature": "minecraft:ore_ancient_debris_small", "placement": [
        {"type": "minecraft:count", "count": 4}, {"type": "minecraft:in_square"},
        {"type": "minecraft:height_range", "height": {"type": "minecraft:uniform", "min_inclusive": {"above_bottom": 8},
                                                      "max_inclusive": {"below_top": 8}}},
        {"type": "minecraft:biome"}]})
    n = sum(1 for _ in OUT.rglob("*.json"))
    print(f"wrote {n} files to {OUT}")


if __name__ == "__main__":
    main()
