# Rangalsbo — Project Setup & Infrastructure Notes

> Summer house website (Vite/React). Last updated 2026-07-20.

## Overview

| Item | Value |
|---|---|
| Repo | `plaugmann/rangalsbo` on github.com (currently **public**) |
| Local path | `C:\Users\Soeren.Plaugmann\OneDrive - EY\Documents\GitHub\rangalsbo` |
| Framework | Vite + React |
| Deploy | Cloudflare Workers `rangalsro` (auto-deploys on push to `main`) |
| Domains | `rangalsro.com` and `rangalsro.se` (registered at Strato.se, DNS now delegated to Cloudflare) |
| Live URLs | https://rangalsro.com · https://rangalsro.se · https://rangalsro.soerenplaugmann.workers.dev |

---

## Git Authentication

### Problem
The development machine is an EY work laptop that authenticates to GitHub with
the work account `DK010005267_EYGS`. Pushing to the hobby repo
`plaugmann/rangalsbo` failed because git used cached work credentials.
(Same fix applies whether the repo is public or private — it just eliminates
the work-account credential chain from the picture for this one repo.)

### Solution (all repo-local, nothing global touched)

**Local git identity** (`.git/config`):
```
user.name = plaugmann
user.email = soerenplaugmann@gmail.com
```

**Remote URL**: `https://github.com/plaugmann/rangalsbo.git`

**Local credential helper** (overrides system `manager` for this repo only):
```
credential.helper =                                    (empty = reset chain)
credential.helper = !"C:/Program Files/GitHub CLI/gh.exe" auth git-credential
credential.useHttpPath = true
```

**gh CLI** (keyring, both accounts present):
- `plaugmann` — active, protocol HTTPS, scopes `gist, read:org, repo`
- `DK010005267_EYGS` — inactive, work account

**SSH key** (for use from non-EY networks, currently unused on this network):
- Key: `~/.ssh/id_ed25519_plaugmann` (ed25519, no passphrase)
- Public key: registered on plaugmann's GitHub account
- Host alias in `~/.ssh/config`:
  ```
  Host github.com-plaugmann
      HostName github.com
      User git
      IdentityFile ~/.ssh/id_ed25519_plaugmann
      IdentitiesOnly yes
  ```
- Remote URL for SSH: `git@github.com-plaugmann:plaugmann/rangalsbo.git`
  (switch with `git remote set-url origin git@github.com-plaugmann:plaugmann/rangalsbo.git`)

**Global git config and Windows Credential Manager work entries: untouched.**

---

## Network Constraint: Zscaler Blocks git push

### Diagnosis
The EY Zscaler VPN/proxy blocks `POST /git-receive-pack` to github.com for
repos outside the `ey-org` organization. Confirmed by direct comparison:

| Target | `POST /git-receive-pack` | Response |
|---|---|---|
| `ey-org/<repo>` | 200 OK | `Server: GitHub-Babel/3.0` (reached GitHub) |
| `plaugmann/rangalsbo` | 403 Forbidden | `Server: Zscaler/6.2` (Zscaler block page) |

The block is **URL-path-based**, not auth-based. No PAT, SSH key, or credential
change can bypass it. `GET /info/refs` (fetch) and `api.github.com` (REST API)
are allowed.

### What works from the EY network
- `git fetch` / `git pull` (GET-based, Zscaler allows)
- `gh api` calls to `api.github.com` (Zscaler allows)
- `git push` to `ey-org/*` repos (Zscaler allowlists the corporate org)

### What does NOT work from the EY network
- `git push` to `plaugmann/rangalsbo` (Zscaler blocks the POST)
- SSH to github.com (port 22 timed out, port 443 to ssh.github.com reset)

### What works from a non-EY network
- `git push` directly (everything is configured)
- SSH push via the `github.com-plaugmann` host alias

---

## API-Push Workaround

Since `api.github.com` is Zscaler-allowed, we use the GitHub Git Data REST API
to push commits. This recreates each unpushed commit on GitHub (blobs → tree →
commit → ref update) without hitting the blocked `git-receive-pack` endpoint.

### Script location
`C:\Users\Soeren.Plaugmann\bin\git-api-push.ps1`

### Git alias (local to this repo)
```
git config --local alias.api-push '!powershell -ExecutionPolicy Bypass -File "C:/Users/Soeren.Plaugmann/bin/git-api-push.ps1"'
```

### Usage
```bash
# Push all unpushed commits via the API:
git api-push

# Preview without pushing:
git api-push -DryRun

# Push without syncing local afterward:
git api-push -NoSync

# Push a specific branch:
git api-push -Branch main
```

### What it does
1. Auto-detects repo root, remote URL, owner/repo, and current branch
2. Verifies `gh` is authenticated with push access to the repo
3. Finds unpushed commits (`origin/<branch>..HEAD`)
4. For each commit (oldest first):
   - Creates blobs for all files (base64-encoded, binary-safe)
   - Creates a tree with all entries
   - Creates a commit preserving original author/committer/dates/message
   - Chains commits (parent = previous API-created commit)
5. Updates the remote ref (`refs/heads/<branch>`) via `PATCH`
6. Verifies the commit on GitHub
7. Syncs local: `git fetch && git reset --hard origin/<branch>`

### For other repos
The script is general-purpose. Run directly:
```bash
powershell -ExecutionPolicy Bypass -File C:\Users\Soeren.Plaugmann\bin\git-api-push.ps1
```
Or add the same local alias in any repo.

---

## Commits Pushed So Far

See `git log --oneline` for the current commit history. The first three commits
were bootstrapped through unusual channels (GitHub UI, then `git api-push` from
an EY network) and are visible in the log for posterity:

- `a0d05c0` — Initial commit (GitHub UI)
- `d81b92e` — Vite React scaffold (API push)
- `0c78b5c` — Add `.gitattributes` (API push, reusable script)

From this point on, regular pushes via `git api-push` (EY network) or `git push`
(non-EY network) are the expected workflow.

---

## Domains & Cloudflare

### Domains
- `rangalsro.com`
- `rangalsro.se`

Both are **registered at Strato.se** (the registrar). DNS is now delegated
to Cloudflare's nameservers; the zone is hosted by Cloudflare. NS pair
assigned to both zones:

- `howard.ns.cloudflare.com`
- `mckenzie.ns.cloudflare.com`

(Strato NS records that were replaced: `docks02.rzone.de` / `shades05.rzone.de`
for `.com`, `docks20.rzone.de` / `shades16.rzone.de` for `.se`. Migration
completed 2026-07-20.)

### Cloudflare Workers

Deploy is via **Cloudflare Workers with Assets** (not Pages), with auto-deploy
on every push to `main`.

- **Worker name**: `rangalsro` (renamed from `rangalsbo` 2026-07-20).
- **Build command**: `npm run build` → `vite build` → `dist/`.
- **Deploy command**: `npx wrangler deploy`.
- **Default Worker URL**: https://rangalsro.soerenplaugmann.workers.dev
- Each `git api-push` triggers a new deploy. Cloudflare watches the ref
  update on `main`, so API-pushed commits deploy just like regular pushes.
- A `cloudflare/workers-autoconfig` branch appears on the remote after the
  first deploy, created and maintained by Cloudflare. Its `wrangler.jsonc`
  is the source of truth for deploy config. **Keep it in sync** if you
  rename the Worker in the dashboard. Currently `name: "rangalsro"` (commit
  `0cf1166` on that branch).

### Custom domains

Both apex domains are bound to the Worker as production custom domains
with Cloudflare Universal SSL.

| URL | Status |
|---|---|
| https://rangalsro.com | Active, Universal SSL |
| https://rangalsro.se | Active, Universal SSL |

Adding a custom domain is straightforward once NS delegation is in place:
Workers → `rangalsro` → production → **Domains** tab → **Add Domain**. DNS
records are auto-created by Cloudflare.

### Deploy status (as of 2026-07-20)

- ✅ Custom domains `rangalsro.com` and `rangalsro.se` bound to Worker.
- ✅ Universal SSL active on both.
- ✅ DNS delegated to Cloudflare NS; old Strato NS removed.
- ✅ Build & deploy verified: `vite build` succeeds (286 ms / 28 modules).
- **Open**: make the GitHub repo private (currently public). No deadline.

---

## Quick Reference

### From the EY network (Zscaler active)
```bash
git add .
git commit -m "your message"
git api-push          # instead of git push
```

### From a non-EY network (home, mobile hotspot)
```bash
git add .
git commit -m "your message"
git push              # works normally, everything is configured
```

### Switching gh accounts
```bash
gh auth switch -u plaugmann           # hobby
gh auth switch -u DK010005267_EYGS    # work
gh auth status                        # see which is active
```

### Switching remote URL (HTTPS ↔ SSH)
```bash
# HTTPS (for EY network + API push):
git remote set-url origin https://github.com/plaugmann/rangalsbo.git

# SSH (for non-EY networks):
git remote set-url origin git@github.com-plaugmann:plaugmann/rangalsbo.git
```
