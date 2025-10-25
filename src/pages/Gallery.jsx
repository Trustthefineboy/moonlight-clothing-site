import React, { useState } from 'react';

// Moonlight Clothings Fabric Collection
const mediaItems = [
  {
    id: 1,
    type: 'image',
    src: getAssetPath('/images/the-convenant-of-symbols.jpg',
    title: 'The Covenant of Symbols – Fabric Design',
    description: 'Every symbol on this sacred Moonlight fabric tells a silent story — one written long before ink, drawn by divine geometry, and reborn through the hands of a modern craftsman. Dyed in deep indigo with sacred ivory lines and golden inscriptions, this piece stands as a covenant between ancestry and creation.',
    category: 'designs'
  },
  {
    id: 2,
    type: 'image',
    src: getAssetPath('/images/covenant-white-shirt.jpg',
    title: 'Covenant Symbols – White Long Sleeve Shirt',
    description: 'The sacred symbols crafted into an elegant white long-sleeve shirt with contrasting golden covenant patterns on black panels. Perfect blend of tradition and contemporary fashion.',
    category: 'products'
  },
  {
    id: 3,
    type: 'image',
    src: getAssetPath('/images/covenant-black-shirt.jpg',
    title: 'Covenant Symbols – Black Short Sleeve Shirt',
    description: 'Bold statement piece featuring the covenant symbols in golden embroidery on deep black fabric. Modern fit with traditional spiritual significance.',
    category: 'products'
  },
  {
    id: 4,
    type: 'image',
    src: getAssetPath('/images/covenant-black-pants.jpg',
    title: 'Covenant Symbols – Black Trousers',
    description: 'Sophisticated black trousers adorned with covenant symbols along the legs. Where ceremony meets everyday style.',
    category: 'products'
  },
  {
    id: 5,
    type: 'image',
    src: getAssetPath('/images/covenant-black-jacket.jpg',
    title: 'Covenant Symbols – Black Jacket',
    description: 'Premium black jacket featuring sacred symbols strategically placed across the design. Modern tailoring with ancestral wisdom.',
    category: 'products'
  },
  {
    id: 6,
    type: 'image',
    src: getAssetPath('/images/covenant-blue-jeans.jpg',
    title: 'Covenant Symbols – Denim Collection',
    description: 'Sacred symbols meet street style. Premium denim featuring golden covenant patterns with chains and modern detailing.',
    category: 'products'
  },
  {
    id: 7,
    type: 'image',
    src: getAssetPath('/images/covenant-blue-set.jpg',
    title: 'Covenant Symbols – Denim Two-Piece Set',
    description: 'Complete denim outfit featuring jacket and shorts with covenant symbols. Urban fashion rooted in spiritual heritage.',
    category: 'products'
  },
  {
    id: 8,
    type: 'image',
    src: getAssetPath('/images/covenant-black-kaftan.jpg',
    title: 'Covenant Symbols – Traditional Kaftan',
    description: 'Majestic black kaftan with golden covenant symbols on the shoulders and neckline. Traditional African wear elevated with divine geometry.',
    category: 'products'
  },
  {
    id: 9,
    type: 'image',
    src: getAssetPath('/images/covenant-black-joggers.jpg',
    title: 'Covenant Symbols – Joggers Set',
    description: 'Contemporary streetwear featuring covenant symbols. Comfortable joggers with matching details that carry spiritual meaning.',
    category: 'products'
  },
  {
    id: 10,
    type: 'image',
    src: getAssetPath('/images/gangan-denim.jpg',
    title: 'GANGAN DENIM – The Drum That Speaks',
    description: 'Every tribe has a voice. Every culture has a rhythm. And in the spirit of Moonlight, this fabric sings that rhythm into being. Inspired by the ancient talking drum — "Gangan", the Yoruba drum that communicates emotion, wisdom, and community.',
    category: 'designs'
  },
  {
    id: 11,
    type: 'image',
    src: getAssetPath('/images/bridge-between-worlds.jpg',
    title: 'The Bridge Between Worlds – Fabric of Balance',
    description: 'In the language of the ancestors, every line is a journey and every wave is a whisper. This fabric, dyed in deep indigo and sacred ochre, represents the bridge between two worlds — the seen and the unseen. The crossed paths symbolize earthly order while flowing waves remind us of divine rhythm.',
    category: 'designs'
  },
  {
    id: 12,
    type: 'image',
    src: getAssetPath('/images/guardian-of-earth.jpg',
    title: 'The Guardian of the Earth',
    description: 'This fabric is a spiritual homage to the ancient guardians of African wisdom — the keepers of balance between earth and spirit. The central face represents the ancestral watcher, whose eyes are closed not in blindness but in deep knowing. Around it are coded Adinkra-style symbols: Waves and spirals – the flow of divine knowledge and endless evolution.',
    category: 'designs'
  }
];

const categories = ['all', 'branding', 'designs', 'products', 'videos'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Filter media by category
  const filteredMedia = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);

  // Open lightbox with selected media
  const openLightbox = (media) => {
    setSelectedMedia(media);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedMedia(null);
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1400px', 
      margin: '0 auto',
      minHeight: '80vh'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem' 
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#222',
          marginBottom: '0.5rem'
        }}>
          Moments of Light
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666',
          maxWidth: '700px',
          margin: '0 auto 2rem'
        }}>
          Showcase of fashion events, fabrics, and sacred highlights
        </p>
        <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#4f8cff', margin: '1rem 0' }}>Walk of Legacy</h2>
          <h2 style={{ fontSize: '1.6rem', color: '#4f8cff', margin: '1rem 0' }}>Sacred Fabrics Unveiled</h2>
          <h2 style={{ fontSize: '1.6rem', color: '#4f8cff', margin: '1rem 0' }}>When God Walked the Runway</h2>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '0.6rem 1.5rem',
              backgroundColor: selectedCategory === category ? '#4f8cff' : 'transparent',
              color: selectedCategory === category ? 'white' : '#4f8cff',
              border: `2px solid #4f8cff`,
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'all 0.3s',
              textTransform: 'capitalize'
            }}
            onMouseOver={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.backgroundColor = '#f0f7ff';
              }
            }}
            onMouseOut={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {filteredMedia.length > 0 ? (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filteredMedia.map(media => (
            <div
              key={media.id}
              onClick={() => openLightbox(media)}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                backgroundColor: '#fff'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              {/* Media Container */}
              <div style={{ 
                height: '300px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0'
              }}>
                {media.type === 'image' ? (
                  <img
                    src={media.src}
                    alt={media.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                    }}
                  />
                ) : (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src={media.thumbnail || 'https://via.placeholder.com/400x300?text=Video+Thumbnail'}
                      alt={media.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {/* Play button overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'rgba(79, 140, 255, 0.9)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem'
                    }}>
                      ▶
                    </div>
                  </div>
                )}
              </div>

              {/* Info Overlay */}
              <div style={{
                padding: '1rem',
                backgroundColor: 'white'
              }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.1rem',
                  color: '#333'
                }}>
                  {media.title}
                </h3>
                <p style={{ 
                  margin: 0,
                  fontSize: '0.9rem',
                  color: '#666',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {media.description}
                </p>
                <div style={{
                  marginTop: '0.5rem',
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: '#f0f7ff',
                  color: '#4f8cff',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {media.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📸</div>
          <h3 style={{ marginBottom: '0.5rem' }}>No media found</h3>
          <p style={{ color: '#666' }}>Try selecting a different category</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && selectedMedia && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            cursor: 'pointer'
          }}
        >
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001
            }}
          >
            ×
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '90vh',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'default'
            }}
          >
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  display: 'block'
                }}
              />
            ) : (
              <video
                controls
                autoPlay
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  display: 'block'
                }}
              >
                <source src={selectedMedia.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            
            <div style={{ padding: '1.5rem', backgroundColor: 'white' }}>
              <h2 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                {selectedMedia.title}
              </h2>
              <p style={{ margin: 0, color: '#666' }}>
                {selectedMedia.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

