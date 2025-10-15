import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { useToast } from './ToastContext';
import ProductSkeleton from './ProductSkeleton';
import QuickViewModal from './QuickViewModal';

export default function FabricList({ filter = {} }) {
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

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

  // Sorting logic
  if (filter.sortBy) {
    filtered = [...filtered]; // Create a copy to avoid mutating original array
    
    switch (filter.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.-]+/g, '')) : a.price;
          const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.-]+/g, '')) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.-]+/g, '')) : a.price;
          const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.-]+/g, '')) : b.price;
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id); // Assuming higher ID = newer
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0, color: '#222' }}>
          {filter.search ? `Search Results for "${filter.search}"` : 'Available Products'}
        </h2>
        <div style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          fontWeight: 'bold',
          backgroundColor: '#FFD700',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          color: '#222'
        }}>
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </div>
      </div>

      {/* No Results Message */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '2px dashed #ddd'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.5rem', color: '#222', marginBottom: '0.5rem' }}>
            No Products Found
          </h3>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Try adjusting your filters or search terms
          </p>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>
            {filter.search && <div>Search: "{filter.search}"</div>}
            {filter.category && <div>Category: {filter.category}</div>}
            {filter.gender && <div>Gender: {filter.gender}</div>}
            {filter.type && <div>Type: {filter.type}</div>}
          </div>
        </div>
      ) : (
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
                  addToast('Removed from wishlist', 'info');
                } else {
                  addToWishlist(fabric);
                  addToast(`${fabric.name} added to wishlist! 💝`, 'success');
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                {/* Quick View and Add to Cart */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setQuickViewProduct(fabric)}
                    style={{
                      flex: 1,
                      backgroundColor: '#4f8cff',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '0.75rem',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontSize: '0.95rem'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#3a7bd5';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#4f8cff';
                    }}
                  >
                    👁️ Quick View
                  </button>
                  <button
                    onClick={() => {
                      addToCart(fabric);
                      addToast(`${fabric.name} added to cart! 🛒`, 'success');
                    }}
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
                    🛒 Add
                  </button>
                </div>
                
                {/* View Full Details Link */}
                <Link
                  to={`/product/${fabric.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#666',
                    fontWeight: 'bold',
                    padding: '0.75rem',
                    border: '2px solid #ddd',
                    borderRadius: 8,
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.borderColor = '#222';
                    e.currentTarget.style.color = '#222';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.color = '#666';
                  }}
                >
                  Full Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
