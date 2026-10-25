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

## Upcoming (want to try)

## Rejected

## Change log

- 1.0.0 (2026-10-25): pack created. Upgrades vs. the restored June 2025 server:
  Distant Horizons 2.3.2 -> 3.3.3, Voice Chat 2.5.26 -> 2.6.22, Vivecraft (server)
  1.2.5 -> 1.3.15, Fabric loader (server) 0.16.10 -> 0.20.1. Added server-side:
  Fabric API, Lithium, FerriteCore, Xaero's maps.
- 1.1.0 (2026-10-25): added 5 optional client-side shader packs (BSL, Bliss, Complementary Reimagined/Unbound, Photon); players pick them in packwiz-installer's first-run list.
