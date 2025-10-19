# Quick VS Code Cache Cleanup Script
Write-Host "Cleaning VS Code cache..." -ForegroundColor Cyan
Write-Host ""

# Close VS Code if running
$vscode = Get-Process -Name "Code" -ErrorAction SilentlyContinue
if ($vscode) {
    Write-Host "Closing VS Code..." -ForegroundColor Yellow
    Stop-Process -Name "Code" -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 3
}

# Clean cache directories
$totalCleaned = 0

Write-Host "Cleaning cache directories..." -ForegroundColor Yellow

$paths = @(
    "$env:APPDATA\Code\Cache",
    "$env:APPDATA\Code\CachedData",
    "$env:APPDATA\Code\CachedExtensions",
    "$env:APPDATA\Code\logs",
    "$env:LOCALAPPDATA\Microsoft\TypeScript"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        try {
            $size = (Get-ChildItem -Path $path -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
            Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
            $totalCleaned += $size
            Write-Host "✓ Cleaned: $path" -ForegroundColor Green
        } catch {
            Write-Host "⚠ Could not clean: $path" -ForegroundColor Yellow
        }
    }
}

# Clean workspace storage
$workspaceStorage = "$env:APPDATA\Code\User\workspaceStorage"
if (Test-Path $workspaceStorage) {
    try {
        Remove-Item -Path "$workspaceStorage\*" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "✓ Cleaned workspace storage" -ForegroundColor Green
    } catch {
        Write-Host "⚠ Could not clean workspace storage" -ForegroundColor Yellow
    }
}

# Clean Vite cache
$viteCache = "c:\Users\USER\Desktop\moonlight-clothing-site\node_modules\.vite"
if (Test-Path $viteCache) {
    Remove-Item -Path $viteCache -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✓ Cleaned Vite cache" -ForegroundColor Green
}

Write-Host ""
Write-Host "Cleanup complete! Space freed: $([math]::Round($totalCleaned, 2)) MB" -ForegroundColor Green
Write-Host ""
Write-Host "Now you can:" -ForegroundColor Cyan
Write-Host "1. Open VS Code fresh" -ForegroundColor White
Write-Host "2. Open the moonlight-clothing-site folder" -ForegroundColor White
Write-Host "3. Run npm run dev in terminal" -ForegroundColor White
Write-Host ""
