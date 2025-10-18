# VS Code Performance Optimization Script
# Run this if VS Code starts hanging again

Write-Host " Optimizing VS Code Performance..." -ForegroundColor Cyan

# 1. Clear VS Code cache
$cachePaths = @(
    "$env:APPDATA\Code\Cache",
    "$env:APPDATA\Code\CachedData",
    "$env:APPDATA\Code\CachedExtensions",
    "$env:APPDATA\Code\logs"
)

foreach ($path in $cachePaths) {
    if (Test-Path $path) {
        Write-Host "Clearing: $path" -ForegroundColor Yellow
        Remove-Item "$path\*" -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# 2. Show current memory usage
Write-Host "
Current VS Code Memory Usage:" -ForegroundColor Green
Get-Process | Where-Object {$_.ProcessName -eq "Code"} | 
    Measure-Object WorkingSet64 -Sum | 
    Select-Object @{Name="TotalMemoryMB";Expression={[math]::Round($_.Sum/1MB, 2)}}

Write-Host "
 Optimization Complete!" -ForegroundColor Green
Write-Host "Please reload VS Code window (Ctrl+Shift+P > Reload Window)" -ForegroundColor Yellow
