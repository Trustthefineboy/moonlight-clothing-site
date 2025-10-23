import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import ScrollToTop from './ScrollToTop';

// Primary navigation links (always visible)
const primaryLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/nft-gallery', label: '✨ NFT Vault' },
  { to: '/gallery', label: 'Gallery' },
];

// Secondary links (hidden in "More" dropdown)
const secondaryLinks = [
  { to: '/memories', label: '📸 Memories' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
  { to: '/orders', label: '📦 Orders' },
  { to: '/profile', label: '👤 Account' },
];

export default function Layout({ children }) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cart } = useCart();

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        color: '#222',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <nav
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          background: '#fff',
          borderBottom: '1px solid #e0eafc',
          padding: 'clamp(0.75rem, 1.5vw, 1.25rem) clamp(1rem, 3vw, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          gap: 'clamp(1rem, 2vw, 2rem)'
        }}
      >
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none', 
          flexShrink: 0,
          marginRight: 'clamp(1rem, 2vw, 2rem)'
        }}>
          <img 
            src="/images/moonlight-logo.png" 
            alt="Moonlight Clothings" 
            style={{ 
              height: 'clamp(45px, 7vw, 65px)', 
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              padding: '4px'
            }}
          />
        </Link>
        
        {/* Primary Navigation Links */}
        <div style={{ 
          display: 'flex', 
          gap: 'clamp(1rem, 2vw, 2rem)', 
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        }}>
          {primaryLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: '#1976d2',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'color 0.3s',
                fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.target.style.color = '#4169E1'}
              onMouseLeave={(e) => e.target.style.color = '#1976d2'}
            >
              {link.label}
            </Link>
          ))}
          
          {/* More Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              style={{
                color: '#1976d2',
                background: 'none',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.5rem',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#4169E1'}
              onMouseLeave={(e) => e.target.style.color = '#1976d2'}
            >
              ⋯ More
            </button>
            
            {moreMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '180px',
                overflow: 'hidden',
                zIndex: 2000
              }}>
                {secondaryLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMoreMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.875rem 1.25rem',
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: '600',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.2s',
                      fontSize: '0.95rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f5f7fa';
                      e.target.style.color = '#4169E1';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.color = '#1976d2';
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Wishlist Link with Badge */}
          <Link
            to="/wishlist"
            style={{
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 'bold',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'color 0.3s',
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.target.style.color = '#4169E1'}
            onMouseLeave={(e) => e.target.style.color = '#1976d2'}
          >
            💝 Wishlist
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: '#ff4444',
                color: 'white',
                borderRadius: '50%',
                width: 'clamp(16px, 2vw, 20px)',
                height: 'clamp(16px, 2vw, 20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                fontWeight: 'bold'
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>
          
          {/* Cart Link with Badge */}
          <Link
            to="/cart"
            style={{
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 'bold',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'color 0.3s',
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.target.style.color = '#4169E1'}
            onMouseLeave={(e) => e.target.style.color = '#1976d2'}
          >
            🛒 Cart
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                background: '#FFD700',
                color: '#222',
                borderRadius: '50%',
                width: 'clamp(16px, 2vw, 20px)',
                height: 'clamp(16px, 2vw, 20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                fontWeight: 'bold'
              }}>
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
      <main style={{ flex: 1, width: '100%' }}>{children}</main>
      <ScrollToTop />
      <footer
        style={{
          width: '100%',
          background: '#f5f7fa',
          color: '#222',
          textAlign: 'center',
          padding: '2rem 1rem',
          borderTop: '1px solid #e0eafc',
        }}
      >
        <p style={{ fontStyle: 'italic', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
          "We are Moonlight — born of God, built by culture, walking in eternal legacy."
        </p>
        <p>&copy; {new Date().getFullYear()} Moonlight Clothings. All rights reserved.</p>
      </footer>
    </div>
  );
}
