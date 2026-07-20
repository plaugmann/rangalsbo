/// <reference types="@cloudflare/workers-types" />

// Rangalsro editorial Worker.
// Accepts POST /api/tweak with { path, content, message? } + Authorization: Bearer <EDITOR_TOKEN>.
// Writes via the GitHub Contents API. Auto-deploy happens because origin/main is the
// Cloudflare autoconfig branch.

interface Env {
  EDITOR_TOKEN: string;
  GITHUB_PAT: string;
  REPO_OWNER: string;
  REPO_NAME: string;
  BRANCH: string;
  AUTHOR_NAME: string;
  AUTHOR_EMAIL: string;
}

// Allowlist: only files outside of src/components/, src/pages/, package metadata or build files can be touched.
// Markdown/JSON/text-only under src/content/.
const ALLOWED_PATH_PATTERNS: RegExp[] = [
  /^src\/content\/[a-z0-9_/-]+\.md$/i,
  /^src\/content\/[a-z0-9_/-]+\.json$/i,
  /^src\/content\/[a-z0-9_/-]+\.txt$/i,
];

const MAX_CONTENT_BYTES = 50_000; // 50 KB hard cap per write.

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (req.method !== 'POST' || url.pathname !== '/api/tweak') {
      return jsonError(404, 'not_found', 'POST /api/tweak only');
    }

    const authz = req.headers.get('authorization') || '';
    if (!authz.startsWith('Bearer ')) {
      return jsonError(401, 'missing_authorization', 'Authorization: Bearer <token>');
    }
    if (authz.slice(7) !== env.EDITOR_TOKEN) {
      return jsonError(403, 'bad_token', 'Wrong editor token');
    }

    let body: { path?: string; content?: string; message?: string };
    try {
      body = await req.json();
    } catch {
      return jsonError(400, 'bad_json', 'Body must be JSON');
    }

    const { path, content, message } = body;
    if (!path || typeof content !== 'string') {
      return jsonError(422, 'missing_fields', 'Need { path, content }');
    }
    if (!ALLOWED_PATH_PATTERNS.some((rx) => rx.test(path))) {
      return jsonError(
        422,
        'out_of_scope',
        `Path not allowlisted. Allowed: src/content/*.md | .json | .txt`,
      );
    }
    if (byteLengthUtf8(content) > MAX_CONTENT_BYTES) {
      return jsonError(413, 'too_large', `Content too large (>${MAX_CONTENT_BYTES} bytes)`);
    }

    const gh = ghFetch(env);

    // 1. Look up current file SHA so we update rather than overwrite blindly.
    const lookup = await gh(
      `/repos/${env.REPO_OWNER}/${env.REPO_NAME}/contents/${encodeURIComponent(path)}?ref=${env.BRANCH}`,
    );
    let sha: string | undefined;
    if (lookup.status === 200) {
      const j = (await lookup.json()) as { sha?: string };
      sha = j.sha;
    } else if (lookup.status !== 404) {
      const txt = await lookup.text();
      return jsonError(502, 'github_lookup_failed', `GET ${lookup.status}: ${txt.slice(0, 200)}`);
    }

    // 2. PUT the new content.
    const payload = {
      message: (message || `Update ${path} via Claude editorial tool`).slice(0, 200),
      branch: env.BRANCH,
      author: { name: env.AUTHOR_NAME, email: env.AUTHOR_EMAIL },
      committer: { name: env.AUTHOR_NAME, email: env.AUTHOR_EMAIL },
      content: base64FromUtf8(content),
      sha,
    };
    const put = await gh(
      `/repos/${env.REPO_OWNER}/${env.REPO_NAME}/contents/${encodeURIComponent(path)}`,
      { method: 'PUT', body: JSON.stringify(payload) },
    );
    if (put.status >= 300) {
      const txt = await put.text();
      return jsonError(502, 'github_put_failed', `PUT ${put.status}: ${txt.slice(0, 200)}`);
    }

    const res = (await put.json()) as { commit?: { sha?: string; html_url?: string } };
    return new Response(
      JSON.stringify({
        ok: true,
        path,
        commit: res.commit?.sha,
        url: res.commit?.html_url,
      }),
      { headers: { 'content-type': 'application/json' } },
    );
  },
};

function ghFetch(env: Env) {
  const auth = 'Basic ' + btoa(`x-access-token:${env.GITHUB_PAT}`);
  return async (path: string, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    headers.set('authorization', auth);
    headers.set('accept', 'application/vnd.github+json');
    headers.set('user-agent', 'rangalsro-editor');
    if (init?.body && !headers.has('content-type')) {
      headers.set('content-type', 'application/json');
    }
    return fetch(`https://api.github.com${path}`, { ...init, headers });
  };
}

function jsonError(status: number, code: string, message: string) {
  return new Response(JSON.stringify({ ok: false, code, message }), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function byteLengthUtf8(s: string) {
  return new TextEncoder().encode(s).length;
}

function base64FromUtf8(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
