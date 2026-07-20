#!/usr/bin/env pwsh
# deploy-editor.ps1 - local deploy of the rangalsro-editor Worker.
#
# Run from workers/editor/ after `npm install`. Each interactive command will
# prompt for a value. The script generates a strong random EDITOR_TOKEN locally
# and prints it so you can paste it twice (once at `wrangler secret put`, once
# in the wife's claude.ai Custom Tool Authorization header).

# PowerShell port of Bash `openssl rand -hex 32`:
function New-EditorToken {
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
    # URL-safe base64 (no padding, '+' -> '-', '/' -> '_').
    return ([Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+','-').Replace('/','_'))
}

$ErrorActionPreference = 'Stop'

if (-not (Test-Path package.json) -or -not (Select-String -Path package.json -SimpleMatch 'wrangler' -Quiet)) {
    Write-Host "Run this from workers/editor/." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 1/6  Generate an EDITOR_TOKEN" -ForegroundColor Cyan
Write-Host "------------------------------------"
$editorToken = New-EditorToken
Write-Host "Your EDITOR_TOKEN: " -NoNewline -ForegroundColor Yellow
Write-Host $editorToken
Write-Host "(paste this in Step 4 below, then again in the wife's claude.ai Custom Tool Authorization header)"
Write-Host ""

Write-Host "Step 2/6  Cloudflare login" -ForegroundColor Cyan
Write-Host "------------------------------------"
npx wrangler login
if ($LASTEXITCODE -ne 0) { throw "wrangler login failed" }

Write-Host ""
Write-Host "Step 3/6  Make a fine-grained GitHub PAT" -ForegroundColor Cyan
Write-Host "------------------------------------"
Write-Host "Open https://github.com/settings/tokens (fine-grained, classic tokens also work)"
Write-Host "  - Repository access: only plaugmann/rangalsbo"
Write-Host "  - Permissions: Contents = Read and write. Nothing else."
Write-Host "Press Enter when the PAT is ready..."
Read-Host | Out-Null

Write-Host ""
Write-Host "Step 4/6  Push both secrets to the Worker" -ForegroundColor Cyan
Write-Host "------------------------------------"
Write-Host "  [a] EDITOR_TOKEN (paste the token from Step 1):"
$sec1 = Read-Host -AsSecureString
$plain1 = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec1))
$plain1 | npx wrangler secret put EDITOR_TOKEN
Remove-Variable plain1
if ($LASTEXITCODE -ne 0) { throw "wrangler secret put EDITOR_TOKEN failed" }

Write-Host "  [b] GITHUB_PAT (paste the fine-grained PAT):"
$sec2 = Read-Host -AsSecureString
$plain2 = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec2))
$plain2 | npx wrangler secret put GITHUB_PAT
Remove-Variable plain2
if ($LASTEXITCODE -ne 0) { throw "wrangler secret put GITHUB_PAT failed" }

Write-Host ""
Write-Host "Step 5/6  Deploy the Worker" -ForegroundColor Cyan
Write-Host "------------------------------------"
npx wrangler deploy
if ($LASTEXITCODE -ne 0) { throw "wrangler deploy failed" }

Write-Host ""
Write-Host "Step 6/6  Smoke test" -ForegroundColor Cyan
Write-Host "------------------------------------"
$body = @{
    path    = 'src/content/home/intro.md'
    content = 'Hello.'
    message = 'smoke test from deploy-editor.ps1'
} | ConvertTo-Json -Compress
try {
    $resp = Invoke-RestMethod -Method Post `
        -Uri 'https://rangalsro.com/api/tweak' `
        -Headers @{ Authorization = "Bearer $editorToken" } `
        -Body $body `
        -ContentType 'application/json'
    Write-Host "  OK: $($resp | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "  Smoke test failed: $_" -ForegroundColor Red
    Write-Host "  (the Worker cannot yet be reached at rangalsro.com/api/* if Cloudflare has not yet bound the route; re-run this step in 30 seconds.)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Done. Store the printed editorToken securely - it is also the value the wife's claude.ai Custom Tool Authorization header must send." -ForegroundColor Green
Write-Host ""
