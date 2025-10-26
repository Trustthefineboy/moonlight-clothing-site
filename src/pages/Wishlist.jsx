import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../components/WishlistContext';
import { useCart } from '../components/CartContext';
import { useToast } from '../components/ToastContext';
import { assetSrc } from '../utils/paths';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    addToast(`${product.name} moved to cart! 🛒`, 'success');
  };

  const handleClearAll = () => {
    clearWishlist();
    addToast('Wishlist cleared', 'info');
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    addToast(`${product.name} removed from wishlist`, 'info');
  };

  if (wishlist.length === 0) {
    return (
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem'
        }}>
          💝
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#222' }}>
          Your Wishlist is Empty
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Save your favorite items to your wishlist and shop them later!
        </p>
        <Link
          to="/shop"
          style={{
            display: 'inline-block',
            backgroundColor: '#FFD700',
            color: '#222',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC700'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FFD700'}
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #FFD700'
      }}>
        <h1 style={{ fontSize: '2rem', color: '#222', margin: 0 }}>
          💝 My Wishlist ({wishlist.length})
        </h1>
        {wishlist.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              background: 'transparent',
              border: '2px solid #ff4444',
              color: '#ff4444',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ff4444';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#ff4444';
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Wishlist Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {wishlist.map(item => (
          <div
            key={item.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              transition: 'all 0.3s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Remove Button */}
            <button
              onClick={() => handleRemove(item)}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(255, 68, 68, 0.9)',
                border: 'none',
                color: 'white',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              title="Remove from wishlist"
            >
              ×
            </button>

            {/* Product Image */}
            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                width: '100%',
                height: '280px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5'
              }}>
                <img
                  src={assetSrc(item.image)}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
            </Link>

            {/* Product Info */}
            <div style={{ padding: '1.25rem' }}>
              <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  color: '#222',
                  fontWeight: 'bold'
                }}>
                  {item.name}
                </h3>
              </Link>

              <p style={{
                color: '#666',
                fontSize: '0.9rem',
                marginBottom: '1rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {item.story}
              </p>

              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#FFD700',
                marginBottom: '1rem'
              }}>
                ₦{typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleMoveToCart(item)}
                  style={{
                    flex: 1,
                    backgroundColor: '#FFD700',
                    color: '#222',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC700'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FFD700'}
                >
                  Move to Cart
                </button>

                <Link
                  to={`/product/${item.id}`}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    color: '#222',
                    border: '2px solid #222',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#222';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#222';
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
