import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import ScrollToTop from './ScrollToTop';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/nft-gallery', label: '✨ NFT Vault' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/memories', label: '📸 Memories' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
          background: '#fff',
          borderBottom: '1px solid #e0eafc',
          padding: 'clamp(0.5rem, 1vw, 1rem) clamp(0.75rem, 2vw, 1.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          gap: 'clamp(0.5rem, 1vw, 1rem)',
          overflowX: 'auto'
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img 
            src="/images/moonlight-logo.png" 
            alt="Moonlight Clothings" 
            style={{ 
              height: 'clamp(32px, 5vw, 50px)', 
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Link>
        
        {/* All Navigation - Always visible, scrollable on small screens */}
        <div style={{ 
          display: 'flex', 
          gap: 'clamp(0.5rem, 1.5vw, 1.5rem)', 
          alignItems: 'center',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <style>{`
            nav > div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: '#1976d2',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'color 0.3s',
                fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.target.style.color = '#4169E1'}
              onMouseLeave={(e) => e.target.style.color = '#1976d2'}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Orders Link */}
          <Link
            to="/orders"
            style={{
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 'bold',
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
            📦 Orders
          </Link>
          
          {/* Profile Link */}
          <Link
            to="/profile"
            style={{
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 'bold',
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
            👤 Account
          </Link>
          
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
