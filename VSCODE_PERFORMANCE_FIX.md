# VS Code Performance Fix for Moonlight Clothing Site

## Problem Fixed
VS Code was freezing/becoming unresponsive when opening this project due to:
- Large number of image files being indexed
- File watchers monitoring too many files
- Lack of proper exclusions in VS Code settings

## Solution Applied

### 1. VS Code Settings Optimization
Created `.vscode/settings.json` with:
- Excluded image files from file watchers
- Disabled auto-imports for better performance
- Optimized search exclusions
- Disabled unnecessary git scanning

### 2. Workspace File
Created `moonlight-clothing.code-workspace` for better project management:
- **Use this file instead of opening the folder directly**
- Optimized settings specifically for this project
- Better performance and stability

### 3. Enhanced .gitignore
Added exclusions for:
- All image file types
- Large media files
- Temporary folders

## How to Use (IMPORTANT)

### Option 1: Use Workspace File (Recommended)
1. Close VS Code completely
2. Double-click `moonlight-clothing.code-workspace`
3. VS Code will open with optimized settings

### Option 2: Open via VS Code
1. Open VS Code
2. File → Open Workspace from File
3. Select `moonlight-clothing.code-workspace`

### DON'T: Open the folder directly
- Avoid using "Open Folder" on the main directory
- This bypasses the performance optimizations

## Maintenance

### Regular Cleanup
Run the cleanup script occasionally:
```powershell
.\cleanup-vscode.ps1
```

### If Issues Return
1. Close VS Code completely
2. Run the cleanup script
3. Reopen using the workspace file

## File Structure
```
moonlight-clothing-site/
├── .vscode/
│   └── settings.json          # VS Code optimizations
├── moonlight-clothing.code-workspace  # USE THIS TO OPEN PROJECT
├── cleanup-vscode.ps1         # Performance cleanup script
├── cleanup-vscode.sh          # Unix cleanup script
└── [rest of your project files]
```

## Tips for Better Performance
1. Keep large images in cloud storage or CDN
2. Use smaller/compressed images for development
3. Regularly clean up temporary files
4. Use the workspace file instead of folder opening

---
*This fix ensures VS Code runs smoothly with your clothing brand project!*