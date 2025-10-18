# 🌙 NFT Image URL Update Template

## After Uploading Your Images

Copy this template and fill in your actual image URLs from ImgBB, Cloudinary, or IPFS.

---

## 📸 Image URLs to Update in `src/data/nftCollectibles.js`

### NFT-001: King Menes
```javascript
imageUrl: 'YOUR_FULL_IMAGE_URL_HERE',
thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
```
**Example:**
```javascript
imageUrl: 'https://i.ibb.co/abc123/king-menes.jpg',
thumbnailUrl: 'https://i.ibb.co/def456/king-menes-thumb.jpg',
```

---

### NFT-002: Mansa Musa
```javascript
imageUrl: 'YOUR_FULL_IMAGE_URL_HERE',
thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
```

---

### NFT-003: Yoruba Kingdom
```javascript
imageUrl: 'YOUR_FULL_IMAGE_URL_HERE',
thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
```

---

### NFT-004: Osupa Ale (Night Moon)
```javascript
imageUrl: 'YOUR_FULL_IMAGE_URL_HERE',
thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
```

---

### NFT-005: Birds of Paradise
```javascript
imageUrl: 'YOUR_FULL_IMAGE_URL_HERE',
thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
```

---

### NFT-006: Adire Sacred Geometry
```javascript
imageUrl: 'YOUR_FULL_IMAGE_URL_HERE',
thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
```

---

### NFT-007: Cowrie Shell Elegance
```javascript
imageUrl: 'YOUR_FULL_IMAGE_URL_HERE',
thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
```

---

### NFT-008: South Africa - Unity in Diversity
```javascript
imageUrl: 'YOUR_FULL_IMAGE_URL_HERE',
thumbnailUrl: 'YOUR_THUMBNAIL_URL_HERE',
```

---

## 🔍 How to Get URLs

### Using ImgBB:
1. Go to https://imgbb.com
2. Click "Start uploading"
3. Upload your image
4. After upload, look for "Direct link" or copy the image URL
5. Paste it in the template above

### Using Cloudinary:
1. Sign in to Cloudinary dashboard
2. Upload image
3. Click on image → Get "Secure URL"
4. Copy and paste

### Using IPFS/Pinata:
1. Upload to Pinata
2. Get CID hash
3. Format as: `https://gateway.pinata.cloud/ipfs/{YOUR_CID}`

---

## 🚀 Quick Update Script

After filling in your URLs above, open VS Code terminal and run:

```powershell
code src\data\nftCollectibles.js
```

Then find and replace each placeholder URL with your actual URLs.

---

## ✅ Testing After Update

1. Save `nftCollectibles.js`
2. Check browser at http://localhost:5173/nft-gallery
3. Images should load properly
4. Click on NFT cards to test detail pages
5. Check mobile responsiveness

---

## 📝 Quick Find & Replace (Example)

If you uploaded to ImgBB with a pattern, you can do bulk replace:

**Find:** `https://placeholder-nft-images.moonlight.com/`
**Replace with:** `https://i.ibb.co/YOUR_ALBUM/`

(Then manually adjust individual filenames if needed)

---

**Need help updating the URLs? Let me know and I can help with the replacement!**
