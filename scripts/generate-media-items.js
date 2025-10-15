// Media Manager Helper
// This file helps you quickly generate media item entries for Gallery.jsx

/**
 * HOW TO USE:
 * 1. Place your WhatsApp images in public/images/
 * 2. Place your WhatsApp videos in public/videos/
 * 3. Update the files array below with your file names
 * 4. Run: node scripts/generate-media-items.js
 * 5. Copy the output to Gallery.jsx
 */

const imageFiles = [
  // Add your image filenames here
  'WhatsApp Image 2025-10-13 at 00.57.42_5d9f798d.jpg',
  'covenant-symbols.jpg',
  'WhatsApp Image 2025-10-14 at 06.35.33_8a1fde76.jpg',
  // 'your-image-1.jpg',
  // 'your-image-2.jpg',
];

const videoFiles = [
  // Add your video filenames here
  // { name: 'your-video.mp4', thumbnail: 'video-thumb.jpg' },
];

// Generate media items
function generateMediaItems() {
  let output = 'const mediaItems = [\n';
  let id = 1;

  // Process images
  imageFiles.forEach((filename) => {
    const title = filename
      .replace(/WhatsApp (Image|Video) \d{4}-\d{2}-\d{2} at [\d.]+_[\w]+\.(jpg|png|jpeg)/i, '')
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .trim() || 'Untitled Image';

    output += `  {
    id: ${id++},
    type: 'image',
    src: '/images/${filename}',
    title: '${title.charAt(0).toUpperCase() + title.slice(1)}',
    description: 'Add description here',
    category: 'products' // Change to: branding, designs, products, or videos
  },\n`;
  });

  // Process videos
  videoFiles.forEach((video) => {
    const title = video.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .trim();

    output += `  {
    id: ${id++},
    type: 'video',
    src: '/videos/${video.name}',
    thumbnail: '${video.thumbnail ? `/images/${video.thumbnail}` : ''}',
    title: '${title.charAt(0).toUpperCase() + title.slice(1)}',
    description: 'Add description here',
    category: 'videos'
  },\n`;
  });

  output += '];\n';
  return output;
}

// Run the generator
console.log('\n=== Generated Media Items for Gallery.jsx ===\n');
console.log(generateMediaItems());
console.log('\n=== Copy the above code to Gallery.jsx ===\n');

// Export for use in other scripts
export { imageFiles, videoFiles, generateMediaItems };
