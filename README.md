# Family Minecraft Servers

Two private, whitelisted Minecraft servers that our family plays on, and the mod
packs that go with them. Everything here is public so friends and family can see
what's installed and set up their game in one step.

| Server | Minecraft | Loader | What it is |
|---|---|---|---|
| [Family Tech](family-tech/) | 1.21.1 | NeoForge | A big tech-and-magic world: Create, Mekanism, Refined Storage, Ars Nouveau and ProjectE, with roads between towns, bigger biomes and very generous loot. |
| [Family Server](family-server/) | 1.21.4 | Fabric | Our long-running survival world, restored from backups, with a light, close-to-vanilla mod set. |

## Playing

The servers are private: you need to be whitelisted, and the address comes from
the server admin directly. It isn't published here.

To get the mods, use the one-click pack for the server you're joining:

1. Install [Prism Launcher](https://prismlauncher.org/).
2. Download the server's Prism zip from the [latest release](../../releases/latest).
3. In Prism: **Add Instance → Import**, pick the zip.
4. Launch it. On every launch it checks this repo and downloads any mod changes
   from their official sources (Modrinth and CurseForge). The first launch takes a
   few minutes.
5. The first time, you'll get a checklist of optional shader packs. Tick any you
   like, or none. Shaders are client-only and can be switched in game (Iris).

No mod files are stored in this repo or in the zip, only the list of mods,
versions and where to download them ([packwiz](https://packwiz.infra.link/) format),
so every mod is downloaded from its author's official page.

## What's in this repo

- `<server>/README.md`: what the server is and what makes it different.
- `<server>/MODS.md`: every installed mod, mods we're planning to try, mods we looked
  at and decided against (with the reason), and a change log.
- `<server>/pack/`: the packwiz pack the launcher syncs from.
- `family-tech/server/`: server-side scripts and datapacks (loot and world generation),
  for anyone curious how the world was tuned.
