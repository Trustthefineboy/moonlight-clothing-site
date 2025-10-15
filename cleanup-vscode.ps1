# VS Code Performance Cleanup Script for Moonlight Clothing Site
# PowerShell version for Windows

Write-Host "Cleaning up VS Code performance issues..." -ForegroundColor Green

# Remove VS Code workspace storage that might be corrupted
Write-Host "Removing VS Code workspace storage..." -ForegroundColor Yellow
Remove-Item ".vscode\settings.json.bak" -ErrorAction SilentlyContinue
Remove-Item ".vscode\*.log" -ErrorAction SilentlyContinue

# Clear any file watcher caches
Write-Host "Clearing file system caches..." -ForegroundColor Yellow
if (Get-Command npx -ErrorAction SilentlyContinue) {
    npx --yes clear-npx-cache 2>$null
}

# Remove any large log files
Write-Host "Removing large log files..." -ForegroundColor Yellow
Get-ChildItem -Recurse -Filter "*.log" | Where-Object { $_.Length -gt 10MB } | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Recurse -Filter "npm-debug.log*" | Remove-Item -Force -ErrorAction SilentlyContinue
Get-ChildItem -Recurse -Filter "yarn-debug.log*" | Remove-Item -Force -ErrorAction SilentlyContinue

# Check node_modules
if (Test-Path "node_modules") {
    Write-Host "Node modules found. Consider running 'npm ci' or 'yarn install --frozen-lockfile' for a clean install." -ForegroundColor Cyan
}

Write-Host "Cleanup complete! VS Code should now run more smoothly." -ForegroundColor Green
Write-Host ""
Write-Host "To prevent future issues:" -ForegroundColor Yellow
Write-Host "1. Use the .code-workspace file instead of opening the folder directly"
Write-Host "2. Keep large image files in separate repositories or cloud storage"
Write-Host "3. Regularly clean your project with this script"