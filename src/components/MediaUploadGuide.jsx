import React, { useState } from 'react';

export default function MediaUploadGuide() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const imageTemplate = `{
  id: X, // Next available number
  type: 'image',
  src: '/images/YOUR_FILENAME.jpg',
  title: 'Your Title Here',
  description: 'Your description',
  category: 'products' // branding, designs, products, or videos
}`;

  const videoTemplate = `{
  id: X, // Next available number
  type: 'video',
  src: '/videos/YOUR_FILENAME.mp4',
  thumbnail: '/images/thumbnail.jpg', // Optional
  title: 'Your Title Here',
  description: 'Your description',
  category: 'videos'
}`;

  return (
    <div style={{
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      border: '2px solid #e0e0e0'
    }}>
      <h2 style={{
        color: '#4f8cff',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        📱 WhatsApp Media Upload Guide
      </h2>

      {/* Step by Step */}
      <div style={{
        display: 'grid',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {[
          {
            step: '1',
            title: 'Save from WhatsApp',
            description: 'Download images/videos from WhatsApp to your computer',
            icon: '💾'
          },
          {
            step: '2',
            title: 'Move to Folders',
            description: 'Images → public/images/ | Videos → public/videos/',
            icon: '📁'
          },
          {
            step: '3',
            title: 'Update Gallery.jsx',
            description: 'Add media items to the mediaItems array',
            icon: '✏️'
          },
          {
            step: '4',
            title: 'Refresh & View',
            description: 'Visit /gallery to see your new media',
            icon: '🎉'
          }
        ].map((item, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '2rem',
              minWidth: '50px',
              textAlign: 'center'
            }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontWeight: 'bold',
                color: '#4f8cff',
                marginBottom: '0.25rem'
              }}>
                Step {item.step}: {item.title}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#666'
              }}>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Code Templates */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Image Template */}
        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1rem', color: '#333' }}>
              📷 Image Template
            </h3>
            <button
              onClick={() => copyToClipboard(imageTemplate, 0)}
              style={{
                padding: '0.4rem 0.8rem',
                backgroundColor: copiedIndex === 0 ? '#4caf50' : '#4f8cff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'background-color 0.3s'
              }}
            >
              {copiedIndex === 0 ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '0.75rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            overflow: 'auto',
            margin: 0,
            border: '1px solid #e0e0e0'
          }}>
            {imageTemplate}
          </pre>
        </div>

        {/* Video Template */}
        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}>
            <h3 style={{ margin: 0, fontSize: '1rem', color: '#333' }}>
              🎥 Video Template
            </h3>
            <button
              onClick={() => copyToClipboard(videoTemplate, 1)}
              style={{
                padding: '0.4rem 0.8rem',
                backgroundColor: copiedIndex === 1 ? '#4caf50' : '#4f8cff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'background-color 0.3s'
              }}
            >
              {copiedIndex === 1 ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '0.75rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            overflow: 'auto',
            margin: 0,
            border: '1px solid #e0e0e0'
          }}>
            {videoTemplate}
          </pre>
        </div>
      </div>

      {/* Quick Tips */}
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #ffc107'
      }}>
        <h4 style={{
          margin: '0 0 0.75rem 0',
          color: '#856404',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💡 Quick Tips
        </h4>
        <ul style={{
          margin: 0,
          paddingLeft: '1.5rem',
          color: '#856404',
          lineHeight: '1.8'
        }}>
          <li>Keep image files under 2MB for faster loading</li>
          <li>Use .jpg for photos, .png for graphics</li>
          <li>Videos should be in .mp4 format</li>
          <li>Create thumbnails for videos (screenshot a frame)</li>
          <li>Use descriptive filenames: design-1.jpg instead of IMG_001.jpg</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div style={{
        marginTop: '1.5rem',
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center'
      }}>
        <a
          href="/gallery"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4f8cff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a78e0'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f8cff'}
        >
          View Gallery
        </a>
        <button
          onClick={() => window.open('MEDIA_GUIDE.md', '_blank')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#4f8cff',
            border: '2px solid #4f8cff',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f7ff'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Full Guide
        </button>
      </div>
    </div>
  );
}
