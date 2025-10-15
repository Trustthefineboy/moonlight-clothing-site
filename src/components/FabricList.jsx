import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import ProductSkeleton from './ProductSkeleton';

export default function FabricList({ filter = {} }) {
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetch('http://localhost:5000/api/fabrics')
      .then(res => res.json())
      .then(data => {
        setFabrics(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load fabrics');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        padding: '2rem 0'
      }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (error) return <div>{error}</div>;

  // Filtering logic
  let filtered = fabrics;
  
  // Search filter
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filtered = filtered.filter(f => 
      f.name.toLowerCase().includes(searchLower) ||
      (f.story && f.story.toLowerCase().includes(searchLower)) ||
      (f.categories && f.categories.some(cat => cat.toLowerCase().includes(searchLower)))
    );
  }
  
  if (filter.category) {
    filtered = filtered.filter(f => f.categories && f.categories.includes(filter.category));
  }
  if (filter.gender) {
    filtered = filtered.filter(f => f.gender === filter.gender);
  }
  if (filter.type) {
    filtered = filtered.filter(f => f.products && f.products.includes(filter.type));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0, color: '#222' }}>Available Products</h2>
        <div style={{ fontSize: '1rem', color: '#666', fontWeight: 'normal' }}>
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </div>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {filtered.map(fabric => (
          <div
            key={fabric.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            {/* Wishlist Heart Button */}
            <button
              onClick={() => {
                if (isInWishlist(fabric.id)) {
                  removeFromWishlist(fabric.id);
                } else {
                  addToWishlist(fabric);
                }
              }}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.5rem',
                zIndex: 2,
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.background = isInWishlist(fabric.id) ? '#ff4444' : '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              }}
              title={isInWishlist(fabric.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isInWishlist(fabric.id) ? '❤️' : '🤍'}
            </button>
            
            <div style={{
              width: '100%',
              height: 280,
              overflow: 'hidden',
              backgroundColor: '#f5f5f5'
            }}>
              <img
                src={fabric.image}
                alt={fabric.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ 
                fontSize: '1.15rem',
                marginBottom: '0.75rem',
                color: '#222',
                fontWeight: 'bold',
                lineHeight: 1.3
              }}>{fabric.name}</h3>
              <p style={{ 
                color: '#666',
                fontSize: '0.9rem',
                marginBottom: '1rem',
                flex: 1,
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>{fabric.story}</p>
              <div style={{ 
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#FFD700',
                marginBottom: '1rem',
                borderTop: '1px solid #eee',
                paddingTop: '0.75rem'
              }}>
                {fabric.price}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <Link
                  to={`/product/${fabric.id}`}
                  style={{
                    flex: 1,
                    textDecoration: 'none',
                    color: '#4f8cff',
                    fontWeight: 'bold',
                    padding: '0.75rem',
                    border: '2px solid #4f8cff',
                    borderRadius: 8,
                    textAlign: 'center',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4f8cff';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#4f8cff';
                  }}
                >
                  View Details
                </Link>
                <button 
                  onClick={() => addToCart(fabric)} 
                  style={{ 
                    flex: 1,
                    background: '#FFD700',
                    color: '#111',
                    fontWeight: 'bold',
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '0.95rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#222';
                    e.currentTarget.style.color = '#FFD700';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#FFD700';
                    e.currentTarget.style.color = '#111';
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: '#666',
          fontSize: '1.1rem'
        }}>
          No products found matching your filters.
        </div>
      )}
    </div>
  );
}


