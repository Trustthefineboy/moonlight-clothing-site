import React, { useState } from 'react';
import { memoriesData } from '../data/memoriesData';
import { assetSrc } from '../utils/paths';

export default function Memories() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState('all'); // all, image, video

  // Use memories from data file
  const memories = memoriesData;

  const filteredMemories = filter === 'all' 
    ? memories 
    : memories.filter(m => m.type === filter);

  const openMedia = (memory) => {
    setSelectedMedia(memory);
  };

  const closeMedia = () => {
    setSelectedMedia(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
      padding: '2rem 1rem',
      color: '#f5f5f5'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          paddingTop: '2rem'
        }}>
          <h1 style={{
            fontSize: window.innerWidth < 768 ? '2.5rem' : '3.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            📸 Moonlight Memories
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto 0.5rem',
            lineHeight: '1.6'
          }}>
            Moments That Made Us | Behind The Fabrics
          </p>
          <p style={{
            fontSize: '0.95rem',
            color: '#9ca3af',
            fontStyle: 'italic'
          }}>
            Every thread tells a story, every moment a memory
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {['all', 'image', 'video'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                padding: '0.75rem 2rem',
                background: filter === type 
                  ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: filter === type 
                  ? 'none'
                  : '2px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '50px',
                color: filter === type ? '#000' : '#f5f5f5',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textTransform: 'capitalize'
              }}
              onMouseEnter={(e) => {
                if (filter !== type) {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.background = 'rgba(245, 158, 11, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== type) {
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }
              }}
            >
              {type === 'all' ? '✨ All' : type === 'image' ? '📷 Photos' : '🎥 Videos'} ({type === 'all' ? memories.length : memories.filter(m => m.type === type).length})
            </button>
          ))}
        </div>

        {/* Memories Grid */}
        {filteredMemories.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            border: '2px dashed rgba(245, 158, 11, 0.3)'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📸</div>
            <h3 style={{ fontSize: '1.5rem', color: '#f5f5f5', marginBottom: '0.5rem' }}>
              No {filter} Yet
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '1rem' }}>
              More memories coming soon...
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 640 
              ? '1fr' 
              : window.innerWidth < 1024 
                ? 'repeat(2, 1fr)' 
                : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {filteredMemories.map(memory => (
              <div
                key={memory.id}
                onClick={() => openMedia(memory)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.3)';
                  e.currentTarget.style.borderColor = '#f59e0b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.2)';
                }}
              >
                {/* Media Preview */}
                <div style={{
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  background: '#1a1a2e',
                  position: 'relative'
                }}>
                  {memory.type === 'image' ? (
                    <img
                      src={assetSrc(memory.src)}
                      alt={memory.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/1a1a2e/f59e0b?text=Memory+Image';
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative'
                    }}>
                      <video
                        src={assetSrc(memory.src)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '4rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        pointerEvents: 'none'
                      }}>
                        ▶️
                      </div>
                    </div>
                  )}
                  
                  {/* Type Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: '#f59e0b',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}>
                    {memory.type === 'image' ? '📷 Photo' : '🎥 Video'}
                  </div>
                </div>

                {/* Memory Info */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#f5f5f5',
                    marginBottom: '0.5rem'
                  }}>
                    {memory.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#f59e0b',
                    marginBottom: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {memory.date}
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#9ca3af',
                    lineHeight: '1.5'
                  }}>
                    {memory.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Media Modal */}
      {selectedMedia && (
        <div
          onClick={closeMedia}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeMedia}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'rgba(245, 158, 11, 0.2)',
              border: '2px solid #f59e0b',
              color: '#f59e0b',
              fontSize: '2rem',
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f59e0b';
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(245, 158, 11, 0.2)';
              e.target.style.color = '#f59e0b';
            }}
          >
            ×
          </button>

          {/* Media Content */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            {selectedMedia.type === 'image' ? (
              <img
                src={assetSrc(selectedMedia.src)}
                alt={selectedMedia.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
              />
            ) : (
              <video
                src={assetSrc(selectedMedia.src)}
                controls
                autoPlay
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
              />
            )}

            {/* Media Info */}
            <div style={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1.5rem 2rem',
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: '#f5f5f5',
                marginBottom: '0.5rem'
              }}>
                {selectedMedia.title}
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#f59e0b',
                marginBottom: '0.5rem'
              }}>
                {selectedMedia.date}
              </p>
              <p style={{
                fontSize: '1rem',
                color: '#9ca3af'
              }}>
                {selectedMedia.description}
              </p>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
