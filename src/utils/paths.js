// Helper function to get correct asset paths for both local and GitHub Pages
export const getAssetPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Use Vite's BASE_URL which handles the base path automatically
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
