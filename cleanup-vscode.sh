#!/bin/bash
# VS Code Performance Cleanup Script for Moonlight Clothing Site

echo "Cleaning up VS Code performance issues..."

# Remove VS Code workspace storage that might be corrupted
echo "Removing VS Code workspace storage..."
rm -rf .vscode/settings.json.bak 2>/dev/null
rm -rf .vscode/*.log 2>/dev/null

# Clear any file watcher caches
echo "Clearing file system caches..."
if command -v npx &> /dev/null; then
    npx --yes clear-npx-cache 2>/dev/null
fi

# Remove any large log files
echo "Removing large log files..."
find . -name "*.log" -size +10M -delete 2>/dev/null
find . -name "npm-debug.log*" -delete 2>/dev/null
find . -name "yarn-debug.log*" -delete 2>/dev/null

# Clean node_modules if it exists
if [ -d "node_modules" ]; then
    echo "Node modules found. Consider running 'npm ci' or 'yarn install --frozen-lockfile' for a clean install."
fi

echo "Cleanup complete! VS Code should now run more smoothly."
echo ""
echo "To prevent future issues:"
echo "1. Use the .code-workspace file instead of opening the folder directly"
echo "2. Keep large image files in separate repositories or cloud storage"
echo "3. Regularly clean your project with this script"