import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { nftCollectibles, rarityLevels } from '../data/nftCollectibles';
import { useToast } from '../components/ToastContext';

export default function NFTDetail() {
  const { nftId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const nft = nftCollectibles.find(n => n.id === nftId);

  const [quantity, setQuantity] = useState(1);

  if (!nft) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#9ca3af' }}>NFT Not Found</h2>
        <Link to="/nft-gallery" style={{
          padding: '1rem 2rem',
          background: '#f59e0b',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  const rarityColor = rarityLevels[nft.rarity.toLowerCase()]?.color || '#gray';

  const handleMintNFT = () => {
    // Placeholder for blockchain minting logic
    showToast('🚀 Minting feature coming soon! Connect your wallet to mint this sacred NFT.', 'info');
  };

  const handleAddToCart = () => {
    showToast('🛒 NFT Marketplace cart coming soon!', 'info');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
      padding: '2rem 1rem',
      color: '#f5f5f5'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
          color: '#9ca3af'
        }}>
          <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/nft-gallery" style={{ color: '#9ca3af', textDecoration: 'none' }}>Digital Vault</Link>
          <span>›</span>
          <span style={{ color: '#f5f5f5' }}>{nft.name}</span>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1fr 1fr',
          gap: '3rem'
        }}>
          {/* Left: Image & Gallery */}
          <div>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: `2px solid ${rarityColor}`,
              boxShadow: `0 20px 60px ${rarityColor}40`,
              marginBottom: '1.5rem'
            }}>
              <img src={nft.imageUrl} alt={nft.name} style={{ width: '100%', height: window.innerWidth < 768 ? '300px' : '500px', objectFit: 'cover' }} />
              {/* Replace with: <img src={nft.imageUrl} alt={nft.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
            </div>

            {/* Attributes Grid */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#f59e0b' }}>
                Sacred Attributes
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem'
              }}>
                <AttributeBox label="Era" value={nft.attributes.era} />
                <AttributeBox label="Culture" value={nft.attributes.culture} />
                <AttributeBox label="Significance" value={nft.attributes.significance} />
                <AttributeBox label="Garment Type" value={nft.attributes.garmentType} />
              </div>
              
              {/* Colors */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                  Sacred Colors
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {nft.attributes.colors.map(color => (
                    <span key={color} style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      color: '#f59e0b'
                    }}>
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details & Actions */}
          <div>
            {/* Collection Badge */}
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '20px',
              fontSize: '0.875rem',
              color: '#f59e0b',
              marginBottom: '1rem'
            }}>
              {nft.collection}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: window.innerWidth < 768 ? '2rem' : '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {nft.name}
            </h1>

            {/* Rarity & Edition */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                padding: '0.75rem 1.5rem',
                background: rarityColor + '20',
                border: `2px solid ${rarityColor}`,
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Rarity</div>
                <div style={{ fontSize: '1rem', color: rarityColor, fontWeight: 'bold' }}>
                  {nft.rarity}
                </div>
              </div>
              <div style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Edition</div>
                <div style={{ fontSize: '1rem', color: '#f5f5f5', fontWeight: 'bold' }}>
                  {nft.edition}
                </div>
              </div>
            </div>

            {/* Sacred Story */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                marginBottom: '1rem',
                color: '#f59e0b'
              }}>
                📜 Sacred Story
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#d1d5db'
              }}>
                {nft.story}
              </p>
            </div>

            {/* Symbolism */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                marginBottom: '1rem',
                color: '#f59e0b'
              }}>
                ✨ Divine Symbolism
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: '#d1d5db',
                fontStyle: 'italic'
              }}>
                {nft.symbolism}
              </p>
            </div>

            {/* Blockchain Info */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                marginBottom: '1rem',
                color: '#f59e0b'
              }}>
                ⛓️ Blockchain Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <BlockchainRow label="Network" value={nft.blockchain} />
                <BlockchainRow label="Status" value={nft.status === 'available' ? 'Ready to Mint' : 'Minted'} />
                <BlockchainRow label="Smart Contract" value="Coming Soon" />
                <BlockchainRow label="Mint Date" value={nft.mintDate || 'Not Yet Minted'} />
              </div>
            </div>

            {/* Price & Actions */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.05)',
              borderRadius: '12px',
              padding: '2rem',
              border: '2px solid rgba(245, 158, 11, 0.3)',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Current Price</div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#f59e0b'
                  }}>
                    {nft.price} ETH
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    ≈ ${(nft.price * 2000).toLocaleString()} USD
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  onClick={handleMintNFT}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  🚀 Mint NFT
                </button>

                <button
                  onClick={handleAddToCart}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'transparent',
                    color: '#f59e0b',
                    border: '2px solid #f59e0b',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(245, 158, 11, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  🛒 Add to Cart
                </button>
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                marginTop: '1rem',
                textAlign: 'center'
              }}>
                Connect your Web3 wallet to mint this NFT
              </p>
            </div>

            {/* Back Button */}
            <Link
              to="/nft-gallery"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#f5f5f5',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              ← Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttributeBox({ label, value }) {
  return (
    <div style={{
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '0.9rem', color: '#f5f5f5', fontWeight: '500' }}>
        {value}
      </div>
    </div>
  );
}

function BlockchainRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{label}:</span>
      <span style={{ color: '#f5f5f5', fontSize: '0.9rem', fontWeight: '500' }}>{value}</span>
    </div>
  );
}
