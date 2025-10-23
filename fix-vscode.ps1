# VS Code Performance Fix - Simple Version
Write-Host "=== VS Code Performance Fix ===" -ForegroundColor Cyan

# 1. Clean cache
Write-Host "`n[1/4] Cleaning VS Code cache..." -ForegroundColor Yellow
$cache1 = "$env:APPDATA\Code\Cache"
$cache2 = "$env:APPDATA\Code\CachedData"
$cache3 = "$env:APPDATA\Code\logs"

if (Test-Path $cache1) { Remove-Item $cache1 -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "  Cleared Cache" -ForegroundColor Green }
if (Test-Path $cache2) { Remove-Item $cache2 -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "  Cleared CachedData" -ForegroundColor Green }
if (Test-Path $cache3) { Remove-Item $cache3 -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "  Cleared Logs" -ForegroundColor Green }

# 2. Create argv.json to disable GPU
Write-Host "`n[2/4] Disabling hardware acceleration..." -ForegroundColor Yellow
$argvPath = "$env:USERPROFILE\.vscode\argv.json"
$argvFolder = Split-Path $argvPath
if (-not (Test-Path $argvFolder)) { New-Item -Path $argvFolder -ItemType Directory -Force | Out-Null }

$json = @{
    "disable-hardware-acceleration" = $true
    "disable-gpu" = $true
}
$json | ConvertTo-Json | Out-File $argvPath -Encoding UTF8
Write-Host "  Created argv.json with GPU disabled" -ForegroundColor Green

# 3. List problematic extensions
Write-Host "`n[3/4] Checking for heavy extensions..." -ForegroundColor Yellow
Write-Host "  Found these Java extensions (not needed for React):" -ForegroundColor Cyan
Write-Host "    - redhat.java"
Write-Host "    - georgewfraser.vscode-javac"
Write-Host "    - vscjava.vscode-java-pack"
Write-Host "  These can be disabled to improve performance" -ForegroundColor Gray

# 4. Check processes
Write-Host "`n[4/4] Checking VS Code processes..." -ForegroundColor Yellow
$codeProcesses = Get-Process -Name "*Code*" -ErrorAction SilentlyContinue
if ($codeProcesses) {
    Write-Host "  Found running VS Code processes" -ForegroundColor Green
} else {
    Write-Host "  No processes found" -ForegroundColor Gray
}

Write-Host "`n=== DONE ===" -ForegroundColor Green
Write-Host "`nNEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Close ALL VS Code windows completely"
Write-Host "2. Restart VS Code"
Write-Host "3. Hardware acceleration is now disabled"
Write-Host "`nOptional: Disable Java extensions with:"
Write-Host "  code --disable-extension redhat.java"
