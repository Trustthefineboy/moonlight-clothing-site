# 🚀 Dev Server Tips - Keep Your Website Running

## Why Does the Server Stop?

The dev server stops when:
1. ❌ You close the terminal/PowerShell window
2. ❌ You press `Ctrl+C` in the terminal
3. ❌ There's a code error that crashes it
4. ❌ You press `q + Enter` (quit command)

## ✅ How to Keep It Running

### Method 1: Keep the Terminal Open (Recommended)
```powershell
npm run dev
```
- **Do NOT close the terminal window**
- You can minimize it, but don't close it
- The terminal will show live updates when you edit files

### Method 2: Run in Background (Windows)
```powershell
Start-Process powershell -ArgumentList "cd 'c:\Users\USER\Desktop\moonlight-clothing-site'; npm run dev" -WindowStyle Minimized
```
- This starts the server in a minimized window
- Find the window in taskbar if you need to stop it

### Method 3: Use VS Code Terminal
1. Open VS Code terminal (`Ctrl+` ` or View > Terminal)
2. Run: `npm run dev`
3. Click the **Split Terminal** button to open a second terminal for git commands
4. Now you have one terminal for server, one for commands!

## 🔄 If Server Stops

### Quick Restart:
```powershell
npm run dev
```

### Check if Server is Running:
Open browser to: `http://localhost:5173/`
- ✅ If page loads → Server is running
- ❌ If "Can't reach page" → Server stopped

## 🛠️ Useful Server Commands

While server is running, you can press:
- `r + Enter` → Restart server
- `u + Enter` → Show server URL
- `o + Enter` → Open in browser
- `c + Enter` → Clear console
- `h + Enter` → Show help menu

## ⚠️ Common Issues

### Port Already in Use
If you see "Port 5173 is already in use":
```powershell
# Kill all node processes
taskkill /F /IM node.exe

# Then restart
npm run dev
```

### Server Crashes on Save
- Check the terminal for error messages
- Fix the error in your code
- Server will auto-restart when you save the fix

## 💡 Best Practice

**Workflow:**
1. Open terminal, run `npm run dev`
2. Keep that terminal open (minimize if needed)
3. Open a **second terminal** for git commands
4. Edit your code - server auto-reloads on save
5. Only close the dev server terminal when you're completely done

## 📱 Access from Phone (Same Network)

```powershell
npm run dev -- --host
```
Then visit: `http://YOUR-COMPUTER-IP:5173` from your phone

---

**Current Server Status:**
- URL: http://localhost:5173/
- Memories Page: http://localhost:5173/memories
- Shop Page: http://localhost:5173/shop
- NFT Vault: http://localhost:5173/nft-gallery
