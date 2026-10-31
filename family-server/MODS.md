# Family Server mods

Minecraft 1.21.4, Fabric loader 0.20.1. The pack (this folder) is the single
source of truth for the server and every client. Not shipped to clients
(listed in `.packwizignore`).

## In the pack

| Mod | Side | Version | Notes |
|---|---|---|---|
| Fabric API | both | 0.119.4 | |
| Distant Horizons | both | 3.3.3 | server and clients must match (3.x protocol) |
| Simple Voice Chat | both | 2.6.22 | pinned to the latest *release*; packwiz picks betas otherwise. UDP 24454 |
| Vivecraft | both | 1.3.15 | VR (Quest 3 via Virtual Desktop + SteamVR) |
| Lithium | both | 0.15.3 | performance |
| FerriteCore | both | 7.1.3 | memory |
| Xaero's Minimap | both | 26.5.0 | |
| Xaero's World Map | both | 1.46.0 | |
| Sodium | client | 0.6.13 | |
| Iris Shaders | client | 1.8.8 | shader packs are per player, not in the pack |
| Mod Menu | client | 13.0.4 | |
| Text Placeholder API | client | 2.5.2 | Mod Menu dependency |
| Cubes Without Borders | client | 5.0.0 | borderless fullscreen |
| Entity Texture Features | client | 7.2.6 | resource-pack textures for mobs |
| Entity Model Features | client | 3.3.12 | resource-pack models and animations for mobs |
| Entity Sound Features | client | 0.8.2 | resource-pack mob sounds |
| Entity Pin Cushions | client | 1.1 | arrows stick into mobs |
| Fresh Animations | client | 1.11.1 | optional resource pack, on by default (turn on in Options → Resource Packs) |
| Traben's 3D Arrows | client | 1.2 | optional resource pack |
| Fresh Animations extensions | client | | Details, Objects, Emissive, Player Extension + Just Expressions; on by default via Resource Pack Overrides |
| Icon Fresh | client | 1.2 | Xaero mob icons in Fresh Animations style |
| Resource Pack Overrides | client | 21.4.0 | turns the animation packs on by default (`config/resourcepackoverrides.json`) |
| Not Enough Animations | client | 1.12.5 | + EMF Compat (Core, NEA) |
| Wavey Capes, 3D Skin Layers | client | | |
| Particle Rain, Subtle Effects, Falling Leaves | client | | + YACL, Fzzy Config, Cloth Config |
| AmbientSounds | client | 6.1.3 | + CreativeCore |
| Spawn Animations | both | 1.11.6 | hostile mobs dig out of the ground |

## Upcoming (want to try)

- Controlify (2026-10-26, add in the next update round): controller support, client-only, in every instance and both packs. 3.0.1+lts release for 1.21.1 NeoForge and 1.21.4 Fabric.
## Rejected

- Traben's 3D Armor (2026-10-25): no version marked for 1.21.4 (it's on Family Tech, 1.21.1).

## Change log

- 1.0.0 (2026-10-25): pack created. Upgrades vs. the restored June 2025 server:
  Distant Horizons 2.3.2 -> 3.3.3, Voice Chat 2.5.26 -> 2.6.22, Vivecraft (server)
  1.2.5 -> 1.3.15, Fabric loader (server) 0.16.10 -> 0.20.1. Added server-side:
  Fabric API, Lithium, FerriteCore, Xaero's maps.
- 1.1.0 (2026-10-25): added 5 optional client-side shader packs (BSL, Bliss, Complementary Reimagined/Unbound, Photon); players pick them in packwiz-installer's first-run list.
- 1.2.0 (2026-10-25): Traben's client mods (ETF, EMF, ESF, Entity Pin Cushions) and optional resource packs (Fresh Animations, 3D Arrows). Client only, no server change.
- 1.3.0 (2026-10-25): animation and ambience round, same as Family Tech 2.6.0 (no Fresh Compats; adds Falling Leaves). Existing players: Resource Packs screen, hold Ctrl+T once.
