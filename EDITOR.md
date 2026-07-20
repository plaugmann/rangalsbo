# Editorial content convention

Prose on the live site lives in this repo under `src/content/`. The `rangalsro-editor` Worker writes to those files on behalf of the wife's Claude project. The autoconfig branch then redeploys the static bundle.

## File map

| File | Where it shows |
| --- | --- |
| `src/content/home/intro.md` | Intro paragraph on the homepage (`/`). |
| `src/content/house/intro.md` | Title-block lede on **The House** page (`/#/house`). |
| `src/content/house/rooms.json` | Six body paragraphs: `living`, `kitchen`, `dining`, `bedrooms`, `outdoors`, `guesthouse`. |

## Format rules

- **Markdown** (`.md`): blank line separates paragraphs. Inline links use the bundled URL minus the host (`[User's Guide](#/users-guide)`), since `HashRouter` resolves them.
- **JSON** (`.json`): UTF-8 without BOM, double quotes, no trailing commas. Keys are stable IDs the React tree imports (`living`, `kitchen`, ...); renaming a key breaks the site until updated everywhere.

## What the wife types in Claude

The Claude project is configured with a single `tweakRangalsroContent` tool. Examples:

- "Update the home intro to mention the new herb garden."
- "Change the Bedrooms copy so the master bedroom is at the front facing the lake."
- "Make the kitchen section shorter."

The system prompt instructs Claude to:
1. Decide which `path` matches the user's request.
2. Read the current file via `git show <path>` if it wants context.
3. Edit only the part of the file the user asked about.
4. Pass the full updated content to the tool.

## Allowed paths

The Worker refuses anything outside `src/content/*.md | *.json | *.txt`. Renaming the homepage hero, changing layout, adding a new page — those still go through planning with the engineer (you).

## Safety

The Worker checks the bearer token, validates path against the allowlist, and caps writes at 50 KB. Lints: the Worker itself does not parse Markdown, so format errors only surface at build time. If the wife produces broken Markdown, the deploy will fail with a Vite import error and Cloudflare will roll back the previous successful build automatically.
