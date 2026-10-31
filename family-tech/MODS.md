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
| Ender IO | both | 8.2.12-beta (beta) | conduits and machines; every 1.21.1 build is beta. Bundles EnderCore and the Mekanism/AE2/RS conduits. No worldgen |
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
| Cyclic | both | 1.14.2 | requested by a player (2026-10-28): hundreds of utility blocks, items and machines; adds 4 flowers to new chunks only |
| FLib | both | 0.2.9 | Cyclic library (Modrinth doesn't list it) |
| Cooking for Blockheads | both | 21.1.24 | player request (2026-10-28): kitchen multiblock that cooks from connected storage |
| Crafting Tweaks | both | 21.1.11 | player request: rotate/balance/clear buttons on crafting grids |
| Pick Up Notifier | both | 21.1.1 | player request: shows picked-up items on screen |
| Anti Enderman Grief | both | 1.0.0.1 | player request: empties `minecraft:enderman_holdable`, so endermen pick nothing up |
| Mining Gadgets | both | 1.18.8 | player request (CurseForge): laser mining tool |
| Building Gadgets 2 | both | 21.1.1 | player request (CurseForge): building/copy-paste gadgets |
| Just Zoom | client | 3.1.0 | player request, stands in for Zoomify (no NeoForge 1.21.1 build) |
| Konkrete | client | 1.9.9 | Just Zoom library |
| Functional Storage | both | 1.5.7 (beta) | player request (2026-10-28): drawers, compacting drawers, storage controller; its author labels nearly every build beta |
| Industrial Foregoing | both | 3.6.39 (beta) | player request: machine-based automation (farms, mob processing, laser drills) |
| Titanium | both | 4.0.51 (beta) | library for Functional Storage and Industrial Foregoing |
| Powah | both | 6.2.10 | player request: energy generators, cables, energy cells; **ores**: uraninite, dry ice |
| GuideME | both | 21.1.21 | Powah's in-game manual system |
| Extreme Reactors | both | 2.4.9 | player request: multiblock reactors and turbines; **ores**: yellorite, anglesite, benitoite |
| ZeroCore 2 | both | 2.4.9 | Extreme Reactors library |
| Immersive Engineering | both | 12.4.2 | player request: industrial multiblocks, wires, excavator; **ores**: bauxite, lead, silver, nickel, uranium (lead/silver/uranium to be switched off: Mekanism, Occultism and Galosphere already have them); adds IE workshops to villages |
| Mahou Tsukai | both | 1.36.27 | player request: magic mod; only worldgen is its own pocket dimension |
| Create: New Age | both | 1.2.0 | player request (2026-10-28): Create electricity, generators, motors, thorium reactors; bundles its energy library (esl); **ores**: thorium, magnetite blocks |
| Controlling | client | 19.0.5 | search box and conflict view in the Controls menu (2026-10-28, key-conflict cleanup) |
| Searchables | client | 1.0.2 | Controlling library |
| Light Level Overlay | client | 1.3.0 | shows block light levels on surfaces (where mobs can spawn), toggled with F10; stands in for the shader trick (2026-10-29) |
| Mouse Unlock | client | 1.3.4 | frees the mouse cursor without pausing (to reach another monitor); click the game to grab it again (2026-10-29). Shipped config `config/mouseunlock-client.toml` turns off its cinematic camera, HUD hiding and idle animation (user's choice; players can't keep their own settings for it) |
| ProjectE Integration | both | 8.4.0 | EMC from other mods' machine recipes and raw materials (Create, Ars Nouveau, Farmer's Delight, IE, Industrial Foregoing, Mystical Agriculture, Occultism) (2026-10-29) |
| ProjectE: EMC for L_Ender's Cataclysm | both | 0.1.0 | hand-set EMC values for Cataclysm items (2026-10-29) |
| ProjectE: EMC for Deeper and Darker | both | 0.1.0 | hand-set EMC values for Deeper and Darker items (2026-10-29) |
| Inventory Profiles Next | client | 2.2.5 | sorting buttons for inventory and chests, locked slots, hotbar refill, swaps a tool out before it breaks, gear sets (2026-10-29) |
| libIPN | client | 6.6.3 | Inventory Profiles Next library (also needs Kotlin for Forge, already in) |
| Mouse Tweaks | client | 2.26.1 | scroll-wheel and drag item moving in inventories (2026-10-29) |
| Simply Light | both | 1.5.3 | player request: simple light blocks in many shapes and colours (CurseForge only) (2026-10-29) |
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
| Mobs (2.7.0) | Friends & Foes (+ Repurposed Structures compat), Creeper Overhaul, Enderman Overhaul, Nyf's Spiders, Critters and Companions, Ribbits (frog villages, on Routes), Galosphere (cave biomes), Deeper and Darker (Otherside dimension), Spawn (+ Teal Lib), Naturalist, Ecologics, Untitled Duck Mod, Fishing Real, Upgrade Aquatic (+ Blueprint), Mowzie's Mobs, Variants & Ventures, Mobs of Mythology (+ AzureLib), Born in Chaos, Aquamirae (+ Fragmentum; **switched off by default**, see family_switches.js), The Graveyard, L_Ender's Cataclysm (+ Lionfish API), Legendary Monsters, Mutant Monsters. Villages: Guard Villagers, Villagers Plus (+ Villagers Trading Plus), Bartering Station. Let's Do Vinery and Camping. Libraries: Resourceful Config, YACL. |
| Animations (2.6.0) | Always downloaded and on by default (Resource Pack Overrides, `config/resourcepackoverrides.json`): Fresh Animations + its official Details, Objects, Emissive and Player extensions, Player Extension + Just Expressions (blinking), Fresh Compats, Icon Fresh (Xaero mob icons). Optional, on by default: Traben's 3D Armor and 3D Arrows. Client mods: Not Enough Animations (+ EMF Compat core/NEA/Create), Wavey Capes, 3D Skin Layers, Particle Rain, Subtle Effects (+ Fzzy Config), AmbientSounds (+ CreativeCore). Both sides: Spawn Animations (hostile mobs dig out of the ground). Existing players: Options → Resource Packs, hold Ctrl+T once to apply the defaults. |
| Visuals (2.5.2) | Traben's Entity Texture/Model/Sound Features and Entity Pin Cushions (client only), plus optional resource packs: Fresh Animations (on by default), Traben's 3D Armor and 3D Arrows. Resource packs still need turning on in Options → Resource Packs. |
| Requests round (2.4.0) | Ars Nouveau (spell magic; adds Archwood forests), ProjectE (EMC), Compact Machines, Iron Chests, Sophisticated Backpacks (+ Sophisticated Core), EnderPack (+ MonoLib), Building Wands (pinned to the 2.14 release; packwiz picked a beta), Patchouli |
| Loot (2.4.0) | Lootr (per-player loot in generated chests, refilling about every 3 days of server uptime), KubeJS + LootJS (+ Rhino, Better Advanced Tooltips): `servers/family-tech/kubejs/server_scripts/family_loot.js` |
| Create and gameplay (2.10.0) | Create: Crafts & Additions (rotation ↔ FE power; pinned to the 1.6.0 release, packwiz picked a beta), Create: Enchantment Industry (liquid XP, automated enchanting; pinned to the 2.4.2 release) + Create: Dragons Plus, Create: Connected, Copycats+, Create Deco, Create: Power Loader (chunk loaders, also on trains), Farmer's Delight + Create: Central Kitchen, Create Jetpack (bundles Flightlib), Create: Structures Arise (worldgen). Sophisticated Storage, Nature's Compass, Explorer's Compass, Torchmaster (mob-proofing), Just Enough Resources, Artifacts, Comforts |
| Worldgen (2.11.0) | Regions Unexplored (more Overworld biomes, on TerraBlender next to Oh The Biomes We've Gone), Nullscape (End terrain), Amplified Nether (taller Nether terrain) |
| Roads (2.3.0; removed in 2.18.0, **back in 2.19.0 as 2.0.0-beta.2, pinned**) | Routes (+ Architectury API): roads, bridges, tunnels and signposts between towns, Waystones and Xaero integration. Every player needs it (the server sends its registry entries). 2.0.0-beta.2 saves its town survey and road plans in the world and plans roads off the server thread; tested on a copy of the final world 2026-10-30 (2 stalls of 3-6 s in a 10-minute fast flight, against 75 a day on 1.2.119). 1.2.119 needed the server's `max-tick-time=-1` while a new world picks its spawn town (~5 min). Server config `config/routes.json`: explicit `gen2_settlement_allowlist` (When Dungeons Arise shares one structure set, so bandit villages, airships and pirate ships counted as towns), ocean/beach towns blacklisted as spawn. |

Run `tools/pack-audit.py packs/family-tech` for exact versions; `--non-release` lists the alphas/betas.

## Upcoming (want to try)

- Controlify (2026-10-26, add in the next update round): controller support, client-only, in every instance and both packs. 3.0.1+lts release for 1.21.1 NeoForge and 1.21.4 Fabric.
- MCA Reborn (2026-10-25): villagers with families and dialogue; replaces villagers, so it clashes with Guard Villagers/Villagers Plus. Better on another server.
- The Aether (2026-10-25, planned): the dimension plus Deep Aether, Aether Villages, Explore Ruins: The Aether, Aetherial Islands, Aether Basic Ores and quality-of-life add-ons. Only affects the Aether, so it can be added to the running world.
- RPG Series (2026-10-25, to discuss): Better Combat, Combat Roll, Wizards/Paladins/Archers/Rogues, Spell Engine and friends. Changes combat for everyone.
- Create: Aeronautics + Awakened Islands (2026-10-25, to discuss): airships and floating islands. Awakened Islands is alpha.
- Cobblemon (2026-10-25): wanted on a separate server instead.

## Rejected

- Reintegrated: Chipped (2026-10-25): its inline Lithostitched dungeon features ('Found direct holder') make every /reload fail, which breaks the KubeJS switches and loot tuning. Removed.
- Alex's Mobs, Alex's Caves, Ice and Fire (2026-10-25): no official NeoForge 1.21.1 version (only unofficial ports of Alex's Mobs).
- Bosses of Mass Destruction (2026-10-25): Fabric only.
- Fresh Food (2026-10-25): pulls in Sinytra Connector (Fabric-on-NeoForge layer), Modefite and Respackopts. Too risky for a cosmetic pack.
- Fresh Animations: Player Extension Compat (2026-10-25): requires Better Combat + playerAnimator (RPG Series, on hold).
- Fresh Animations Extensions bundle (2026-10-25): used the individual official extensions instead (the Just Expressions bridge needs the standalone Player Extension).
- Flowing Fluids (2026-10-25, held back): finite water/lava physics would break infinite water and many Create water builds; discuss before adding.
- Solid Mobs, Resource Explorer (2026-10-25): Fabric only / a resource-pack authoring tool.
- MBS - Moog's Bountiful Structures (2026-10-25): needs Biomes O' Plenty (not listed on Modrinth); we use Oh The Biomes We've Gone.
- Gazebos (2026-10-25): needs Spell Engine (RPG Series); revisit with the RPG Series.
- Incendium (again, 2026-10-25): still alpha-only for 1.21.1.
- Repurposed Structures - Friends and Foes compat (2026-10-25): only matters with Friends & Foes, which isn't installed.

- Random Things (2026-10-25): no version after 1.16.5.
- Thaumcraft (2026-10-25): 1.12.2 only, never ported. Ars Nouveau and Occultism fill the role.
- Baubles (2026-10-25): 1.12 only; Curios (installed) replaced it.
- JourneyMap (2026-10-25): same job as Xaero's Minimap/World Map, which are installed (Routes supports both).
- CraftTweaker (2026-10-25): KubeJS does recipes and loot (with LootJS) in one scripting system.
- AutoEMC (2026-10-29, removed in 2.17.1): wrote thousands of fixed values into ProjectE's custom_emc.json that overrode ProjectE's own (diamond 32 EMC). ProjectE Integration and the hand-set add-ons cover the pack instead. If it ever comes back, test on a copy and check custom_emc.json afterwards.
- Traveler's Backpack (2026-10-25): picked Sophisticated Backpacks instead.

- Incendium (2026-10-25): only a 2024 alpha for 1.21.1, and it replaces Nether biomes (worldgen clash risk).
- Structurify: same job as Sparse Structures but needs every client too.
- Ancient Structures: Cultural Buildings: no NeoForge 1.21.1 version found. Recurrent Complex: unmaintained since 1.12.2.

- Chunky 1.4.23 (2026-10-25): crashed NeoForge 1.21.1 startup ("Chunky is not loaded") and left the server hung.

- Terralith (2026-10-25): with Oh The Biomes We've Gone it crashed new-world generation
  ("Feature order cycle" across vanilla, Terralith and BWG biomes). User kept BWG + Tectonic.

- Blood Magic (2026-10-25): no 1.21.1 version anywhere (newest is for 1.20.1). Its `1.21.1` branch on GitHub is unreleased (last commit 2026-05-02); check for a release when touching the pack. EvilCraft and Occultism added as substitutes.

## Known issues

- Server sometimes fails to start (seen 2026-10-29 on a local copy of the server, pack as of
  2.16.0, 3 of about 10 starts): it stops during mod loading with a `ConcurrentModificationException`
  in Create's `AllSoundEvents.prepare` ("Failed to create mod instance. ModID: create",
  "Mod loading has failed", a crash report in `crash-reports/`). A Create add-on registering
  sounds while Create reads its sound list during parallel mod construction; which add-on wasn't
  pinned down. Nothing is lost: start the server again (a retry has always worked so far).
  Report to Create if it gets frequent.

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

- 2.5.0/2.5.1 (2026-10-25): structure batch (Create: Let The Adventure Begin, Create: New Beginnings, Create: Pretty Structures, Dungeon Crawl, Adventure Dungeons, Yggdrasil, Moog's Voyager/Soaring/Nether/End Structures, Additional Structures, Grim Kingdoms, Immersive Structures, Katters, ATi, Unnamed Desert, Formations Overworld/Nether, Luki's Grand Capitals, Epic Structures Villages/Witch Huts, Nice Villagers Remastered, Reintegrated: Chipped); 2.5.1 dropped MBS and Gazebos (hidden dependencies). World reset.
- 2.5.2 (2026-10-25): Traben's client mods (ETF, EMF, ESF, Entity Pin Cushions) and optional resource packs (Fresh Animations, 3D Armor, 3D Arrows). Client only, no server change.
- 2.6.0 (2026-10-25): animation and ambience round (see the Animations row); resource packs on by default via Resource Pack Overrides.
- 2.7.0 (2026-10-25): mob and village round (see the Mobs row); Aquamirae switched off via kubejs/config/family_switches.json; server.properties spawn-animals and spawn-npcs turned on (they were off and deleted every animal and villager); world reset.
- 2.7.1 (2026-10-25): Immersive Structures pinned to its NeoForge build (2.2.0 was a Forge jar and never loaded; found by the new log digest). Towns and Towers' village_forest (an abandoned ruin, no villagers) taken off Routes' towns and spawn candidates. World reset.
- 2.7.2 (2026-10-25): client crash fix. Kotlin for Forge added for clients (Fzzy Config needs it; not listed on Modrinth). RS × Friends & Foes compat made server-only (it needs Repurposed Structures, which is server-only). Found with tools/check-deps.py.
- 2.8.0 (2026-10-25): Advanced Backups (server). Village protection script (kubejs family_protection) and the family_fixes datapack (missing Towns and Towers villager pools, two broken loot tables).
- 2.8.1 (2026-10-25): removed Reintegrated: Chipped (broke /reload).
- 2.9.0 (2026-10-26): added Ender IO 8.2.12-beta (conduits, machines; no worldgen, so no world reset).
- 2.10.0 (2026-10-26): Create add-ons, Farmer's Delight and gameplay mods (see the "Create and gameplay" row).
- 2.10.1 (2026-10-26): Kotlin for Forge now installs on the server too (Create Jetpack and its Flightlib need it on both sides; 2.10.0 failed to start).
- 2.11.0 (2026-10-26): worldgen round: Regions Unexplored, Nullscape, Amplified Nether; world reset.
- 2.12.0 (2026-10-28): added Cyclic (+ FLib). Only worldgen is 4 flowers in new chunks; no world reset.
- 2.13.0 (2026-10-28): player requests: Cooking for Blockheads, Crafting Tweaks, Pick Up Notifier, Anti Enderman Grief, Mining Gadgets, Building Gadgets 2, Just Zoom (+ Konkrete). No worldgen in any of them (jars checked). Farmer's Delight was already in.
- 2.14.0 (2026-10-28): player requests: Functional Storage, Industrial Foregoing (+ Titanium), Powah (+ GuideME), Extreme Reactors (+ ZeroCore 2), Immersive Engineering, Mahou Tsukai. New ores from Powah, Extreme Reactors and IE (new worlds only); no terrain or biome changes.
- 2.15.0 (2026-10-28): Routes taken out while we look for the final world (the user walks candidate worlds without it, picks spawn, then Routes goes back in and the final world is generated with it). Architectury API stays.
- 2.16.0 (2026-10-28): Routes back (1.2.119, pinned) for the final world; added Create: New Age (Crafts & Additions was already in).
- 2.16.1 (2026-10-28): added Controlling (+ Searchables), client only. Shared key layout: `tools/keybinds/` in the project.
- 2.16.2 (2026-10-29): added Mouse Unlock, client only (user request: free the cursor to use another monitor).
- 2.16.3 (2026-10-29): added Light Level Overlay (`llo`), client only, toggle on F10 in the shared key layout (F9 is the Ender Pack).
- 2.16.4 (2026-10-29): Mouse Unlock config shipped: plain cursor release, no cinematic third-person camera, HUD stays, no idle animation.
- 2.17.0 (2026-10-29): EMC for the rest of the pack (ProjectE Integration, EMC for Cataclysm and Deeper and Darker, AutoEMC for whatever is still missing); Inventory Profiles Next (+ libIPN) and Mouse Tweaks (client); Simply Light. Server scripts (not in the pack): loot profiles (`kubejs/config/family_loot.json`: off/light/normal/generous, a dropdown on the dashboard), library chests get several book rolls, more books in town chests, and the loot script no longer stops on an unknown item (an Industrial Foregoing book id had switched off every loot change since about 2026-10-28). Village protection fixed for player hits (KubeJS calls DamageSource.getEntity "getActual").
- 2.17.1 (2026-10-29): AutoEMC removed. It wrote 23,201 fixed values into ProjectE's `config/ProjectE/custom_emc.json` (diamond 32, iron ingot 8, dark matter 8), overriding ProjectE's own values; reported by a player the same evening. The server's file was restored from the pre-update backup.
- 2.18.0 (2026-10-29): Routes removed (client and server). On the final world it had drawn 160 of 850 planned roads and stalled the server 75 times in a day (25 of 10 s or more, the longest 130 s), re-planning everything after each restart. Its roads stay (plain blocks), and players keep the town waypoints it added (Xaero set "Routes Mod (all)"). Roads, road highlighting on the maps and new town waypoints come back with our own Family Roads mod (`servers/family-tech/family-roads/`).
- 2.19.0 (2026-10-30): Routes back as 2.0.0-beta.2 (pinned; client and server). It picked up the final world's existing network unchanged (39 towns, 4,080 drawn road chunks, the world's original road settings), reloads its town survey in under 0.1 s after a restart, and drew 2,300+ road chunks in a test flight with 2 short stalls. Family Roads is shelved. Server: Distant Horizons `generatorPlan` back to SURFACE_THEN_CHUNKS (chunkGeneratorMode stays PRE_EXISTING_ONLY). First live start: Routes surveys the towns around spawn **on the server thread**, once per world; on the live server it took over 60 s and the hang watchdog stopped the server, so that one start ran with `max-tick-time=-1` (back to 60000 for the next restart). The survey (1,116 towns) is saved in the world now. Backup before the change: `working/family-tech-backups/pre-routes2-2026-10-30-2058/`.
