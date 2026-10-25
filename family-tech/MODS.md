# Family Tech mods

Minecraft 1.21.1, NeoForge 21.1.265. A separate server from the Family Server:
Create, Mekanism and Refined Storage only run together on NeoForge 1.21.1
(Create's Fabric port stops at 1.20.1; Mekanism has no Fabric version).
This pack is the single source of truth for the server and every client.
Not shipped to clients (listed in `.packwizignore`).

## In the pack

| Mod | Side | Version | Notes |
|---|---|---|---|
| Create | both | 6.0.10 | |
| Mekanism | both | 10.7.19.85 | |
| Mekanism Generators | both | 10.7.19.85 | |
| Mekanism Tools | both | 10.7.19.85 | |
| Refined Storage | both | 2.0.9 | |
| JEI | both | 19.64.0.455 | pinned to the latest release (packwiz picked a beta) |
| MezzConfig | both | 0.6.9 (beta) | required by JEI; only betas exist |
| Distant Horizons | both | 3.3.3 | |
| Simple Voice Chat | both | 2.6.22 | pinned to the latest release |
| Vivecraft | both | 1.3.15 | |
| Lithium | both | 0.15.4 | |
| FerriteCore | both | 7.0.3 | |
| Xaero's Minimap | both | 26.6.0 | |
| Xaero's World Map | both | 1.47.0 | |
| Easy Villagers | both | 1.1.49 | |
| CC: Tweaked | both | 1.120.2 (alpha) | every NeoForge 1.21.1 build is labeled alpha on Modrinth |
| EnderChests | both | 1.0 | needs ShetiPhianCore |
| ShetiPhianCore | both | | EnderChests library |
| Mob Lassos | both | 21.1.1 | needs Puzzles Lib |
| Puzzles Lib | both | 21.1.65 | Mob Lassos library |
| Waystones | both | 21.1.46 | needs Balm |
| Balm | both | 21.0.66 | Waystones library |
| Mystical Agriculture | both | 8.0.29 | needs Cucumber |
| Cucumber Library | both | 8.0.16 | Mystical Agriculture library |
| Mob Grinding Utils | both | 1.1.10 | from CurseForge (not on Modrinth) |
| EvilCraft | both | 1.2.99 (beta) | closest Blood Magic substitute; its author labels every build beta |
| Cyclops Core | both | 1.30.0 (beta) | EvilCraft library |
| Occultism | both | 1.224.5 | ritual/spirit magic |
| Modonomicon | both | 1.120.7 | Occultism guidebook library |
| Curios API | both | 9.5.1 | Occultism dependency |
| GeckoLib | both | 4.9.3 | Occultism dependency |
| SmartBrainLib | both | 1.16.11 | Occultism dependency |
| Item Collectors | both | 1.1.10 | |
| SuperMartijn642's Core Lib | both | | Item Collectors library |
| SuperMartijn642's Config Lib | both | | Item Collectors library |
| Sodium | client | 0.8.13 | |
| Iris Shaders | client | 1.8.14-beta.1 | Modrinth lists it as a release |
| Cubes Without Borders | client | 5.0.0 | borderless fullscreen |

### Added in 2.0.0 (recommendations round)

| Group | Mods |
|---|---|
| Performance | ModernFix, Clumps, Noisium (server only), ImmediatelyFast / EntityCulling / More Culling (client only; More Culling needs Cloth Config) |
| Server management | Open Parties and Claims (beta; claims show on Xaero's maps), Gravestone, spark, Jade |
| World building | Chipped (+ Athena, Resourceful Lib), Macaw's Furniture/Roofs/Doors/Windows/Bridges, Handcrafted, Supplementaries (+ Moonlight Lib), FramedBlocks |
| Biomes | Tectonic (+ Lithostitched), Oh The Biomes We've Gone (+ TerraBlender (beta-only), CorgiLib, Oh The Trees You'll Grow) |
| Structures | YUNG's API + Better Mineshafts/Dungeons/Strongholds/Desert Temples/Ocean Monuments/Witch Huts/Nether Fortresses/Jungle Temples/End Island, YUNG's Bridges, YUNG's Extras, Towns and Towers (+ Cristel Lib), Dungeons and Taverns, Explorify, When Dungeons Arise, Repurposed Structures, Sparse Structures (spreads all structures out); the last three are server-only |
| Economy | Numismatics (Create add-on: coins, vendors, depositors, bank accounts) |
| Requests round (2.4.0) | Ars Nouveau (spell magic; adds Archwood forests), ProjectE (EMC), Compact Machines, Iron Chests, Sophisticated Backpacks (+ Sophisticated Core), EnderPack (+ MonoLib), Building Wands (pinned to the 2.14 release; packwiz picked a beta), Patchouli |
| Loot (2.4.0) | Lootr (per-player loot in generated chests, refilling about every 3 days of server uptime), KubeJS + LootJS (+ Rhino, Better Advanced Tooltips): `servers/family-tech/kubejs/server_scripts/family_loot.js` |
| Roads (2.3.0) | Routes 1.2.119 (+ Architectury API): roads, bridges, tunnels and signposts between towns, spawn in a town, Waystones and Xaero integration. 2.0.0 is beta-only; 1.2.119 needs the server's `max-tick-time=-1` while a new world picks its spawn town (~5 min). Server config `config/routes.json`: explicit `gen2_settlement_allowlist` (When Dungeons Arise shares one structure set, so bandit villages, airships and pirate ships counted as towns), ocean/beach towns blacklisted as spawn. |

Run `tools/pack-audit.py packs/family-tech` for exact versions; `--non-release` lists the alphas/betas.

## Upcoming (want to try)

- Ender IO (2026-10-25): every 1.21.1 build is labeled beta (8.2.12-beta). Overlaps Mekanism; its draw is the conduits. Add after the 2.4.0 mods have been played a while.

## Rejected

- Random Things (2026-10-25): no version after 1.16.5.
- Thaumcraft (2026-10-25): 1.12.2 only, never ported. Ars Nouveau and Occultism fill the role.
- Baubles (2026-10-25): 1.12 only; Curios (installed) replaced it.
- JourneyMap (2026-10-25): same job as Xaero's Minimap/World Map, which are installed (Routes supports both).
- CraftTweaker (2026-10-25): KubeJS does recipes and loot (with LootJS) in one scripting system.
- Traveler's Backpack (2026-10-25): picked Sophisticated Backpacks instead.

- Incendium (2026-10-25): only a 2024 alpha for 1.21.1, and it replaces Nether biomes (worldgen clash risk).
- Structurify: same job as Sparse Structures but needs every client too.
- Ancient Structures: Cultural Buildings: no NeoForge 1.21.1 version found. Recurrent Complex: unmaintained since 1.12.2.

- Chunky 1.4.23 (2026-10-25): crashed NeoForge 1.21.1 startup ("Chunky is not loaded") and left the server hung.

- Terralith (2026-10-25): with Oh The Biomes We've Gone it crashed new-world generation
  ("Feature order cycle" across vanilla, Terralith and BWG biomes). User kept BWG + Tectonic.

- Blood Magic (2026-10-25): no 1.21.1 version anywhere (newest is for 1.20.1). Its `1.21.1` branch on GitHub is unreleased (last commit 2026-05-02); check for a release when touching the pack. EvilCraft and Occultism added as substitutes.

## Change log

- 1.0.0 (2026-10-25): pack created.
- 1.1.0 (2026-10-25): added Easy Villagers, CC: Tweaked, EnderChests, Mob Lassos, Waystones,
  Mystical Agriculture, Mob Grinding Utils (and their libraries).
- 1.2.0 (2026-10-25): added EvilCraft and Occultism (Blood Magic substitutes) and their libraries.
- 1.3.0 (2026-10-25): added Item Collectors and its libraries.
- 2.0.0 (2026-10-25): performance, server management, building, biome, structure and economy mods
  (see above); world reset so the new generation applies everywhere.
- 2.0.1 (2026-10-25): removed Terralith (feature order cycle with Oh The Biomes We've Gone).
- 2.0.2 (2026-10-25): removed Chunky (startup crash).
- 2.1.0 (2026-10-25): added When Dungeons Arise, Repurposed Structures, Sparse Structures (server-only); world reset.
- 2.2.0 (2026-10-25): added 5 optional client-side shader packs (BSL, Bliss, Complementary Reimagined/Unbound, Photon); players pick them in packwiz-installer's first-run list.
- 2.3.0 (2026-10-25): added Routes and Architectury API; Sparse Structures set back to vanilla spacing for settlements (factor 1) and taverns (1.5); world reset.
- 2.4.0 (2026-10-25): requests round (Ars Nouveau, ProjectE, Compact Machines, Iron Chests, Sophisticated Backpacks, EnderPack, Building Wands, Patchouli), Lootr, KubeJS + LootJS loot script, worldgen datapack (rich cave ores, diamond/emerald geodes, more ancient debris), bigger biomes; world reset.
