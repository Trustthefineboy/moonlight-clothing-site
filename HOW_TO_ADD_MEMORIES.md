# 📸 How to Add Memories (Photos & Videos)

## Adding Photos

1. **Place your images** in the `public/images/` folder
2. **Open** `src/data/memoriesData.js`
3. **Add a new entry** like this:

```javascript
{
  id: 14, // Increment the ID
  type: 'image',
  src: '/images/your-photo-name.jpg',
  title: 'Your Photo Title',
  date: 'Month Year',
  description: 'Describe this memory'
},
```

## Adding Videos

1. **Place your videos** in the `public/videos/` folder
2. **Open** `src/data/memoriesData.js`
3. **Add a new entry** like this:

```javascript
{
  id: 15, // Increment the ID
  type: 'video',
  src: '/videos/your-video-name.mp4',
  title: 'Your Video Title',
  date: 'Month Year',
  description: 'Describe this video memory'
},
```

## Supported Formats

### Images
- ✅ JPG/JPEG
- ✅ PNG
- ✅ WebP
- ✅ GIF

### Videos
- ✅ MP4 (recommended)
- ✅ WebM
- ✅ MOV

## Tips

- Keep image sizes reasonable (under 5MB for web)
- For videos, under 50MB works best for web
- Use descriptive filenames (e.g., `photoshoot-2025-oct.jpg`)
- The website will automatically show filters for "All", "Photos", and "Videos"
- Click any memory to view it in fullscreen mode

## Example Structure

```
public/
├── images/
│   ├── photoshoot-jan-2025.jpg
│   ├── behind-the-scenes.png
│   └── launch-event.jpg
└── videos/
    ├── fashion-show-2025.mp4
    └── studio-tour.mp4
```

## Need Help?

The memories page is located at: `http://localhost:5173/memories`

All your memories are stored in: `src/data/memoriesData.js`
