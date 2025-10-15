# 📸 Adding WhatsApp Images and Videos to Your Gallery

## Quick Start Guide

### Step 1: Save Media from WhatsApp
1. Open WhatsApp on your phone
2. Find the images/videos you want to add
3. Tap on the media to open it
4. Tap the share/download icon
5. Save to your computer (you can use WhatsApp Web or transfer via USB/cloud)

### Step 2: Organize Your Files

#### For Images:
- Place your image files in: `public/images/`
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Example: `public/images/WhatsApp Image 2025-10-14 at 10.30.45.jpg`

#### For Videos:
- Place your video files in: `public/videos/`
- Supported formats: `.mp4`, `.webm`, `.ogg`
- Example: `public/videos/WhatsApp Video 2025-10-14 at 10.30.45.mp4`

**💡 Tip:** You can rename files to make them easier to reference, like:
- `design-1.jpg`
- `fabric-showcase.mp4`
- `behind-the-scenes.mp4`

### Step 3: Update the Gallery Code

Open `src/pages/Gallery.jsx` and find the `mediaItems` array (around line 4-25).

Add your new media items following this format:

#### For Images:
```javascript
{
  id: 4, // Unique number (increment from last item)
  type: 'image',
  src: '/images/your-image-name.jpg', // Path to your image
  title: 'Design Showcase', // Title for the image
  description: 'Beautiful African print design', // Description
  category: 'products' // Category: branding, designs, products, or videos
}
```

#### For Videos:
```javascript
{
  id: 5,
  type: 'video',
  src: '/videos/your-video-name.mp4', // Path to your video
  thumbnail: '/images/video-thumbnail.jpg', // Optional thumbnail image
  title: 'Behind the Scenes',
  description: 'Creating our latest collection',
  category: 'videos'
}
```

### Step 4: Categories

Choose from these categories:
- `branding` - Logos, brand materials
- `designs` - Fabric patterns, design concepts
- `products` - Finished products, clothing items
- `videos` - Video content

### Complete Example

Here's how your `mediaItems` array should look:

```javascript
const mediaItems = [
  {
    id: 1,
    type: 'image',
    src: '/WhatsApp Image 2025-10-13 at 00.57.42_5d9f798d.jpg',
    title: 'Moonlight Logo',
    description: 'Our signature brand logo',
    category: 'branding'
  },
  {
    id: 2,
    type: 'image',
    src: '/images/design-1.jpg',
    title: 'African Print Design',
    description: 'Vibrant ankara fabric pattern',
    category: 'designs'
  },
  {
    id: 3,
    type: 'image',
    src: '/images/product-showcase.jpg',
    title: 'Men\'s Dashiki Collection',
    description: 'Traditional meets modern',
    category: 'products'
  },
  {
    id: 4,
    type: 'video',
    src: '/videos/fashion-show.mp4',
    thumbnail: '/images/fashion-show-thumb.jpg',
    title: 'Fashion Show 2025',
    description: 'Our latest runway collection',
    category: 'videos'
  }
];
```

### Step 5: Save and View

1. Save the `Gallery.jsx` file
2. Your development server should automatically refresh
3. Navigate to `/gallery` in your browser to see your media!

## 🎨 Tips for Best Results

### Image Optimization
- **Recommended size:** 1200x800px for images
- **File size:** Keep under 2MB for faster loading
- **Format:** Use `.jpg` for photos, `.png` for graphics with transparency

### Video Optimization
- **Recommended size:** 1920x1080px (Full HD)
- **File size:** Keep under 50MB for web performance
- **Format:** Use `.mp4` for best browser compatibility
- **Thumbnail:** Create a thumbnail image from a frame of the video

### File Naming
- Use descriptive names: `african-print-dress.jpg` instead of `IMG_001.jpg`
- Avoid spaces: use hyphens or underscores
- Use lowercase for consistency

## 📱 Accessing Your Gallery

Visit: `http://localhost:5173/gallery` (or your production URL)

## 🔄 Quick Reference Commands

From your project root:

```bash
# View gallery in browser
# Navigate to: http://localhost:5173/gallery

# Create new folders if needed
mkdir public/images/collections
mkdir public/videos/tutorials
```

## ❓ Troubleshooting

### Image Not Showing?
1. Check the file path is correct
2. Ensure the file is in the `public` folder
3. Refresh the page (Ctrl+F5 or Cmd+Shift+R)

### Video Not Playing?
1. Ensure it's in `.mp4` format
2. Check browser console for errors (F12)
3. Try converting to web-compatible format

### Need Help?
Check that:
- File names match exactly (case-sensitive)
- Files are in the correct folders
- The `mediaItems` array syntax is correct (commas, brackets, etc.)

---

Made with ❤️ for Moonlight Clothings
