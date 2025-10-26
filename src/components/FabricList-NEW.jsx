import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { useToast } from './ToastContext';
import ProductSkeleton from './ProductSkeleton';
import QuickViewModal from './QuickViewModal';
import { productsData } from '../data/productsData';
import { assetSrc } from '../utils/paths';

export default function FabricList({ filter = {} }) {
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setFabrics(productsData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: isMobile ? '1.5rem' : '2rem'
      }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>{error}</div>;

  // Filtering logic
  let filtered = fabrics;
  
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filtered = filtered.filter(f => 
      f.name.toLowerCase().includes(searchLower) ||
      (f.story && f.story.toLowerCase().includes(searchLower)) ||
      (f.categories && f.categories.some(cat => cat.toLowerCase().includes(searchLower)))
    );
  }
  
  if (filter.category) filtered = filtered.filter(f => f.categories && f.categories.includes(filter.category));
  if (filter.gender) filtered = filtered.filter(f => f.gender === filter.gender);
  if (filter.type) filtered = filtered.filter(f => f.products && f.products.includes(filter.type));
  if (filter.culture) filtered = filtered.filter(f => f.culture === filter.culture);
  if (filter.colorTheme) filtered = filtered.filter(f => f.colorTheme === filter.colorTheme);
  if (filter.storyTheme) filtered = filtered.filter(f => f.storyTheme === filter.storyTheme);

  // Sorting logic
  if (filter.sortBy) {
    filtered = [...filtered];
    
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
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {/* Results Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: isMobile ? '1.5rem' : '2rem',
        padding: isMobile ? '1rem 0' : '1.5rem 0',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <h2 style={{
          fontSize: isMobile ? '1rem' : '1.125rem',
          margin: 0,
          color: '#000',
          fontWeight: '500',
          letterSpacing: '0.3px'
        }}>
          {filter.search ? `RESULTS FOR "${filter.search.toUpperCase()}"` : 'ALL PRODUCTS'}
        </h2>
        <div style={{
          fontSize: isMobile ? '0.875rem' : '1rem',
          color: '#666',
          fontWeight: '400'
        }}>
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* No Results */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '3rem 1rem' : '5rem 2rem',
          background: '#f8f8f8',
          borderTop: '2px solid #e5e5e5'
        }}>
          <h3 style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            color: '#000',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            NO PRODUCTS FOUND
          </h3>
          <p style={{
            color: '#666',
            fontSize: isMobile ? '0.9375rem' : '1rem',
            marginBottom: '1.5rem',
            fontWeight: '300'
          }}>
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: isMobile ? '2rem' : '2.5rem'
        }}>
          {filtered.map(fabric => (
            <div
              key={fabric.id}
              style={{
                background: '#fff',
                position: 'relative',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Wishlist Button */}
              <button
                onClick={() => {
                  if (isInWishlist(fabric.id)) {
                    removeFromWishlist(fabric.id);
                    addToast('Removed from wishlist', 'info');
                  } else {
                    addToWishlist(fabric);
                    addToast(`${fabric.name} added to wishlist!`, 'success');
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e5e5',
                  borderRadius: '50%',
                  width: isMobile ? '44px' : '40px',
                  height: isMobile ? '44px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: isMobile ? '1.25rem' : '1.125rem',
                  zIndex: 2,
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#000';
                  e.target.style.borderColor = '#000';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.target.style.borderColor = '#e5e5e5';
                  e.target.style.color = '#000';
                }}
              >
                {isInWishlist(fabric.id) ? '♥' : '♡'}
              </button>

              {/* Product Image */}
              <Link to={`/product/${fabric.id}`} style={{ display: 'block' }}>
                <div style={{
                  width: '100%',
                  height: isMobile ? '350px' : '400px',
                  overflow: 'hidden',
                  background: '#f8f8f8',
                  position: 'relative'
                }}>
                  <img
                    src={assetSrc(fabric.image)}
                    alt={fabric.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) e.target.style.transform = 'scale(1)';
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400/f8f8f8/666?text=' + encodeURIComponent(fabric.name);
                    }}
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div style={{ padding: isMobile ? '1.25rem 0' : '1.5rem 0' }}>
                <Link to={`/product/${fabric.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{
                    fontSize: isMobile ? '1rem' : '1.0625rem',
                    marginBottom: '0.5rem',
                    color: '#000',
                    fontWeight: '500',
                    letterSpacing: '0.3px',
                    lineHeight: 1.4
                  }}>
                    {fabric.name}
                  </h3>
                </Link>

                {/* Price */}
                <div style={{
                  fontSize: isMobile ? '0.9375rem' : '1rem',
                  fontWeight: '600',
                  color: '#000',
                  marginBottom: '1rem',
                  letterSpacing: '0.3px'
                }}>
                  ₦{typeof fabric.price === 'number' ? fabric.price.toLocaleString() : fabric.price}
                </div>

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  flexDirection: 'column'
                }}>
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      addToCart(fabric);
                      addToast(`${fabric.name} added to cart!`, 'success');
                    }}
                    style={{
                      padding: isMobile ? '0.875rem' : '0.75rem',
                      background: '#000',
                      color: '#fff',
                      border: 'none',
                      fontSize: '0.8125rem',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      minHeight: isMobile ? '48px' : 'auto'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#333'}
                    onMouseLeave={(e) => e.target.style.background = '#000'}
                  >
                    ADD TO CART
                  </button>

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewProduct(fabric)}
                    style={{
                      padding: isMobile ? '0.875rem' : '0.75rem',
                      background: 'transparent',
                      color: '#000',
                      border: '1px solid #000',
                      fontSize: '0.8125rem',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      minHeight: isMobile ? '48px' : 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#000';
                      e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#000';
                    }}
                  >
                    QUICK VIEW
                  </button>

                  {/* WhatsApp Button */}
                  {fabric.whatsapp && (
                    <a
                      href={`https://wa.me/${fabric.whatsapp.replace(/[^0-9]/g, '')}?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(fabric.name)}%20-%20₦${encodeURIComponent(typeof fabric.price === 'number' ? fabric.price.toLocaleString() : fabric.price)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        padding: isMobile ? '0.875rem' : '0.75rem',
                        background: '#25D366',
                        color: '#fff',
                        border: 'none',
                        fontSize: '0.8125rem',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        textAlign: 'center',
                        transition: 'background 0.2s',
                        minHeight: isMobile ? '48px' : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#128C7E'}
                      onMouseLeave={(e) => e.target.style.background = '#25D366'}
                    >
                      📱 ORDER VIA WHATSAPP
                    </a>
                  )}
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
