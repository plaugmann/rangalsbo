# rangalsro-editor

A small Cloudflare Worker that accepts editorial edits from a Claude.ai project and writes them into this repo via the GitHub Contents API. The autoconfig branch picks up the new commit on `origin/main` and redeploys the static site automatically.

## Endpoints

| Path | Method | Auth | Body |
| --- | --- | --- | --- |
| `/api/tweak` | POST | `Authorization: Bearer <EDITOR_TOKEN>` | `{ "path": "src/content/...", "content": "...", "message": "optional" }` |

`path` must match `src/content/*.md | *.json | *.txt`. Anything else returns `422 out_of_scope`.

## Local deploy

```bash
cd workers/editor
npm install
npx wrangler login
npx wrangler secret put EDITOR_TOKEN          # paste a long random string
npx wrangler secret put GITHUB_PAT            # paste a fine-grained GitHub PAT,
                                              # scoped to plaugmann/rangalsbo only,
                                              # with contents:write
npx wrangler deploy
```

After `wrangler deploy`, the `routes` block in `wrangler.jsonc` binds the worker to `rangalsro.com/api/*`, so the wife's Claude project POSTs to `https://rangalsro.com/api/tweak`.

## Smoke test

```bash
curl -X POST https://rangalsro.com/api/tweak \
  -H "Authorization: Bearer $EDITOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"path":"src/content/home/intro.md","content":"Hello.","message":"smoke test"}'
```

Expected: `{"ok":true,"path":"...","commit":"...","url":"https://github.com/.../commit/..."}`.

## Files

- `src/index.ts` — request handler.
- `wrangler.jsonc` — worker name, route, vars. PAT/EDITOR_TOKEN live as Worker secrets.
- `package.json` / `tsconfig.json` — wrangler + types.

## Rotation

To rotate `EDITOR_TOKEN`: `npx wrangler secret put EDITOR_TOKEN` (overwrites). Then update the wife's Claude project's tool `Authorization` header.
To rotate `GITHUB_PAT`: same flow, plus update the token's repo scope in GitHub if the scope changed.
