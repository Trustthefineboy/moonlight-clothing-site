# VS Code Cache Cleanup Script
# This script cleans VS Code cache and temporary files to resolve hanging issues

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VS Code Cache Cleanup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if VS Code is running
$vscodeProcesses = Get-Process -Name "Code" -ErrorAction SilentlyContinue
if ($vscodeProcesses) {
    Write-Host "⚠️  VS Code is currently running!" -ForegroundColor Yellow
    Write-Host "Please close all VS Code windows before continuing." -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Type 'Y' to force close VS Code and continue, or 'N' to exit"
    
    if ($continue -eq 'Y' -or $continue -eq 'y') {
        Write-Host "Closing VS Code..." -ForegroundColor Yellow
        Stop-Process -Name "Code" -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
        Write-Host "✓ VS Code closed" -ForegroundColor Green
    } else {
        Write-Host "Exiting. Please close VS Code manually and run this script again." -ForegroundColor Red
        exit
    }
}

Write-Host ""
Write-Host "Starting cleanup..." -ForegroundColor Cyan
Write-Host ""

# Define cache directories
$cachePaths = @(
    "$env:APPDATA\Code\Cache",
    "$env:APPDATA\Code\CachedData",
    "$env:APPDATA\Code\CachedExtensions",
    "$env:APPDATA\Code\CachedExtensionVSIXs",
    "$env:APPDATA\Code\logs",
    "$env:APPDATA\Code\Service Worker\CacheStorage",
    "$env:APPDATA\Code\Service Worker\ScriptCache",
    "$env:LOCALAPPDATA\Microsoft\TypeScript",
    "$env:TEMP\vscode-*"
)

$totalFreed = 0

foreach ($path in $cachePaths) {
    if (Test-Path $path) {
        try {
            $size = (Get-ChildItem -Path $path -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
            $sizeMB = [math]::Round($size / 1MB, 2)
            
            Write-Host "🗑️  Cleaning: $path" -ForegroundColor Yellow
            Write-Host "   Size: $sizeMB MB" -ForegroundColor Gray
            
            Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
            $totalFreed += $sizeMB
            
            Write-Host "   ✓ Cleaned" -ForegroundColor Green
            Write-Host ""
        } catch {
            Write-Host "   ⚠️  Could not clean (files may be in use)" -ForegroundColor Yellow
            Write-Host ""
        }
    }
}

# Clean workspace storage
$workspaceStorage = "$env:APPDATA\Code\User\workspaceStorage"
if (Test-Path $workspaceStorage) {
    Write-Host "🗑️  Cleaning workspace storage..." -ForegroundColor Yellow
    try {
        $size = (Get-ChildItem -Path $workspaceStorage -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        $sizeMB = [math]::Round($size / 1MB, 2)
        Write-Host "   Size: $sizeMB MB" -ForegroundColor Gray
        
        Remove-Item -Path "$workspaceStorage\*" -Recurse -Force -ErrorAction SilentlyContinue
        $totalFreed += $sizeMB
        
        Write-Host "   ✓ Cleaned" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host "   ⚠️  Could not clean workspace storage" -ForegroundColor Yellow
        Write-Host ""
    }
}

# Clean node_modules/.vite cache in project
$projectViteCache = "c:\Users\USER\Desktop\moonlight-clothing-site\node_modules\.vite"
if (Test-Path $projectViteCache) {
    Write-Host "🗑️  Cleaning Vite cache in project..." -ForegroundColor Yellow
    try {
        $size = (Get-ChildItem -Path $projectViteCache -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        $sizeMB = [math]::Round($size / 1MB, 2)
        Write-Host "   Size: $sizeMB MB" -ForegroundColor Gray
        
        Remove-Item -Path $projectViteCache -Recurse -Force -ErrorAction SilentlyContinue
        $totalFreed += $sizeMB
        
        Write-Host "   ✓ Cleaned" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host "   ⚠️  Could not clean Vite cache" -ForegroundColor Yellow
        Write-Host ""
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cleanup Complete!" -ForegroundColor Green
Write-Host "Total space freed: $totalFreed MB" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Open VS Code" -ForegroundColor White
Write-Host "2. Open folder: c:\Users\USER\Desktop\moonlight-clothing-site" -ForegroundColor White
Write-Host "3. VS Code will rebuild its cache (may take a moment)" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
