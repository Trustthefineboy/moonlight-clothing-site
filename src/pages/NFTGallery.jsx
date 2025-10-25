import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { nftCollectibles, nftCollections, rarityLevels } from '../data/nftCollectibles';

export default function NFTGallery() {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter NFTs
  const filteredNFTs = nftCollectibles.filter(nft => {
    const matchesCollection = selectedCollection === 'all' || nft.collection === selectedCollection;
    const matchesRarity = selectedRarity === 'all' || nft.rarity.toLowerCase() === selectedRarity;
    const matchesSearch = searchQuery === '' || 
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.story.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCollection && matchesRarity && matchesSearch;
  });

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
            fontSize: window.innerWidth < 768 ? '2rem' : '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            ✨ Moonlight Digital Vault
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto 0.5rem',
            lineHeight: '1.6'
          }}>
            Where Sacred Fabrics Meet Eternal Blockchain
          </p>
          <p style={{
            fontSize: '0.9rem',
            color: '#9ca3af',
            fontStyle: 'italic'
          }}>
            Preserving African heritage, one divine design at a time
          </p>
        </div>

        {/* Search Bar */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <input
            type="text"
            placeholder="🔍 Search collectibles by name or story..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '1rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '50px',
              color: '#f5f5f5',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(245, 158, 11, 0.3)'}
          />
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {/* Collection Filter */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#9ca3af',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Collection
            </label>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                color: '#f5f5f5',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Collections</option>
              {nftCollections.map(collection => (
                <option key={collection.id} value={collection.name}>
                  {collection.name} ({collection.count})
                </option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#9ca3af',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Rarity
            </label>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                color: '#f5f5f5',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Rarities</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>

          {/* Stats */}
          <div style={{
            flex: 1,
            minWidth: '250px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '1rem'
          }}>
            <div style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '8px',
              textAlign: 'center',
              flex: 1
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {filteredNFTs.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                Collectibles
              </div>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        {filteredNFTs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#9ca3af'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontSize: '1.2rem' }}>No collectibles found matching your filters</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {filteredNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NFTCard({ nft }) {
  const [isHovered, setIsHovered] = useState(false);
  const rarityColor = rarityLevels[nft.rarity.toLowerCase()]?.color || '#gray';

  return (
    <Link
      to={`/nft/${nft.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: `2px solid ${isHovered ? rarityColor : 'rgba(255, 255, 255, 0.1)'}`,
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered ? `0 20px 40px ${rarityColor}40` : '0 4px 12px rgba(0,0,0,0.3)',
          cursor: 'pointer'
        }}
      >
        {/* Image Placeholder */}
        <div style={{
          width: '100%',
          height: '300px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Rarity Badge */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: rarityColor,
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}>
            {nft.rarity}
          </div>

          {/* Status Badge */}
          {nft.status === 'available' && (
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: '#10b981',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              ✓ Available
            </div>
          )}

          <img src={nft.imageUrl} alt={nft.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* <img src={nft.thumbnailUrl} alt={nft.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#f5f5f5'
          }}>
            {nft.name}
          </h3>

          <p style={{
            fontSize: '0.875rem',
            color: '#9ca3af',
            marginBottom: '1rem'
          }}>
            {nft.collection}
          </p>

          <p style={{
            fontSize: '0.9rem',
            color: '#d1d5db',
            marginBottom: '1rem',
            lineHeight: '1.5',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {nft.story}
          </p>

          {/* Edition */}
          <div style={{
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Edition</div>
            <div style={{ fontSize: '0.9rem', color: '#f5f5f5', fontWeight: 'bold' }}>
              {nft.edition}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

