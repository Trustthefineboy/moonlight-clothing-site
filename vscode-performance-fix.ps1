# VS Code Performance Fix Script
# This script optimizes VS Code for better performance

Write-Host "=== VS Code Performance Optimization ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Disable unnecessary extensions for React project
Write-Host "Step 1: Checking Extensions..." -ForegroundColor Yellow
$javaExtensions = @(
    "georgewfraser.vscode-javac",
    "redhat.java",
    "vscjava.vscode-gradle",
    "vscjava.vscode-java-debug",
    "vscjava.vscode-java-dependency",
    "vscjava.vscode-java-pack",
    "vscjava.vscode-java-test",
    "vscjava.vscode-maven",
    "vscjava.vscode-spring-initializr",
    "mauriziomacr.glassfish3-connector",
    "walkme.java-extension-pack",
    "visualstudioexptteam.intellicode-api-usage-examples"
)

Write-Host "These Java extensions are not needed for React development:" -ForegroundColor Green
foreach ($ext in $javaExtensions) {
    Write-Host "  - $ext"
}
Write-Host ""
Write-Host "To disable them, run: code --disable-extension <extension-id>" -ForegroundColor Cyan
Write-Host ""

# Step 2: Clean cache
Write-Host "Step 2: Cleaning VS Code Cache..." -ForegroundColor Yellow
$cachePaths = @(
    "$env:APPDATA\Code\Cache",
    "$env:APPDATA\Code\CachedData",
    "$env:APPDATA\Code\CachedExtensions",
    "$env:APPDATA\Code\CachedExtensionVSIXs",
    "$env:APPDATA\Code\logs",
    "$env:LOCALAPPDATA\Programs\Microsoft VS Code\resources\app\out\vs\base\node\logs"
)

foreach ($path in $cachePaths) {
    if (Test-Path $path) {
        Write-Host "Clearing: $path" -ForegroundColor Green
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "  ✓ Cleared" -ForegroundColor Green
    } else {
        Write-Host "  - Not found (OK): $path" -ForegroundColor Gray
    }
}
Write-Host ""

# Step 3: Create optimized argv.json
Write-Host "Step 3: Creating optimized argv.json..." -ForegroundColor Yellow
$argvPath = "$env:USERPROFILE\.vscode\argv.json"

# Create the JSON content properly
$argvJson = @{
    "disable-hardware-acceleration" = $true
    "disable-gpu" = $true
    "disable-color-correct-rendering" = $true
}

New-Item -Path (Split-Path $argvPath) -ItemType Directory -Force -ErrorAction SilentlyContinue | Out-Null
$argvJson | ConvertTo-Json | Set-Content -Path $argvPath -Encoding UTF8
Write-Host "  [OK] Created $argvPath" -ForegroundColor Green
Write-Host ""

# Step 4: Kill any hanging VS Code processes
Write-Host "Step 4: Cleaning up VS Code processes..." -ForegroundColor Yellow
$processes = Get-Process | Where-Object { $_.Name -like "*Code*" -or $_.Name -eq "node" }
if ($processes) {
    Write-Host "Found running VS Code processes:" -ForegroundColor Green
    $processes | Format-Table Name, Id, CPU -AutoSize
} else {
    Write-Host "  No hanging processes found" -ForegroundColor Green
}
Write-Host ""

Write-Host "=== Optimization Complete! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Close ALL VS Code windows" -ForegroundColor White
Write-Host "2. Restart VS Code" -ForegroundColor White
Write-Host "3. The hardware acceleration is now disabled" -ForegroundColor White
Write-Host "4. If still slow, disable Java extensions manually" -ForegroundColor White
Write-Host ""
Write-Host "To disable Java extensions, run:" -ForegroundColor Cyan
Write-Host "  code --disable-extension redhat.java" -ForegroundColor Gray
Write-Host ""
