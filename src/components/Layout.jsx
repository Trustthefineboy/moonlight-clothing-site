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
  const [isMobile, setIsMobile] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cart } = useCart();

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
          padding: isMobile ? '0.5rem 1rem' : '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          minHeight: isMobile ? '50px' : '70px'
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="/images/moonlight-logo.png" 
            alt="Moonlight Clothings" 
            style={{ 
              height: isMobile ? '28px' : '50px', 
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Link>
        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '1rem', alignItems: 'center' }}>
          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'color 0.3s'
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
                  transition: 'color 0.3s'
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
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#4169E1'}
                onMouseLeave={(e) => e.target.style.color = '#1976d2'}
              >
                👤 Account
              </Link>
            </div>
          )}
          
          {/* Search Icon - Mobile */}
          {isMobile && (
            <Link
              to="/shop"
              style={{
                color: '#1976d2',
                textDecoration: 'none',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem'
              }}
            >
              🔍
            </Link>
          )}
          
          {/* Wishlist Link with Badge - Always visible */}
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
              fontSize: isMobile ? '1.2rem' : '1rem',
              padding: isMobile ? '0.5rem' : '0'
            }}
            onMouseEnter={(e) => e.target.style.color = '#4169E1'}
            onMouseLeave={(e) => e.target.style.color = '#1976d2'}
          >
            💝 {!isMobile && 'Wishlist'}
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: isMobile ? '-2px' : '-8px',
                right: isMobile ? '-2px' : '-10px',
                background: '#ff4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}>
                {wishlistCount}
              </span>
            )}
          </Link>
          
          {/* Cart Link with Badge - Always visible */}
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
              fontSize: isMobile ? '1.2rem' : '1rem',
              padding: isMobile ? '0.5rem' : '0'
            }}
            onMouseEnter={(e) => e.target.style.color = '#4169E1'}
            onMouseLeave={(e) => e.target.style.color = '#1976d2'}
          >
            🛒 {!isMobile && 'Cart'}
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: isMobile ? '-2px' : '-8px',
                right: isMobile ? '-2px' : '-10px',
                background: '#FFD700',
                color: '#222',
                borderRadius: '50%',
                width: isMobile ? '16px' : '20px',
                height: isMobile ? '16px' : '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>
                {cart.length}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.3rem',
                color: '#4f8cff',
                padding: '0.5rem'
              }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobile && menuOpen && (
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            left: '0',
            backgroundColor: 'white',
            borderBottom: '2px solid #e0eafc',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 1000
          }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.875rem 1rem',
                  color: '#1976d2',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: '0.95rem'
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.875rem 1rem',
                color: '#1976d2',
                textDecoration: 'none',
                fontWeight: 'bold',
                borderBottom: '1px solid #f0f0f0',
                fontSize: '0.95rem'
              }}
            >
              📦 Orders
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.875rem 1rem',
                color: '#1976d2',
                textDecoration: 'none',
                fontWeight: 'bold',
                borderBottom: '1px solid #f0f0f0',
                fontSize: '0.95rem'
              }}
            >
              👤 Account
            </Link>
          </div>
        )}
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
