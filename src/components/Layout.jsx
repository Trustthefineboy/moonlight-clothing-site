import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import ScrollToTop from './ScrollToTop';
import { getAssetPath } from '../utils/paths';

// Primary navigation links (always visible)
const primaryLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/nft-gallery', label: '✨ NFT Vault' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/profile', label: '👤 Account' },
];

// Secondary links (hidden in "More" dropdown)
const secondaryLinks = [
  { to: '/memories', label: '📸 Memories' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
  { to: '/orders', label: '📦 Orders' },
];

export default function Layout({ children }) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cart } = useCart();
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.hamburger-btn')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

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
          maxWidth: isMobile ? '100%' : '1400px',
          margin: '0 auto',
          background: '#fff',
          borderBottom: '1px solid #e0eafc',
          padding: isMobile ? '0.75rem 1rem' : 'clamp(0.75rem, 1.5vw, 1.25rem) clamp(1rem, 3vw, 2.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          gap: isMobile ? '0.75rem' : 'clamp(1rem, 2vw, 2rem)',
          flexWrap: 'nowrap'
        }}
      >
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none', 
          flexShrink: 0,
          marginRight: isMobile ? '0' : 'clamp(1rem, 2vw, 2rem)'
        }}>
          <img 
            src={getAssetPath('/images/moonlight-logo.png')}
            alt="Moonlight Clothings" 
            style={{ 
              height: isMobile ? '48px' : 'clamp(45px, 7vw, 65px)', 
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              padding: '4px'
            }}
          />
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <>
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
            </div>
          </>
        )}
        
        {/* Mobile: Hamburger Menu Button + Icons */}
        {isMobile && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginLeft: 'auto'
            }}>
              {/* Wishlist Icon */}
              <Link to="/wishlist" style={{
                color: '#1976d2',
                textDecoration: 'none',
                fontSize: '1.5rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem'
              }}>
                💝
                {wishlistCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '0',
                    background: '#ff4444',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 'bold'
                  }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* Cart Icon */}
              <Link to="/cart" style={{
                color: '#1976d2',
                textDecoration: 'none',
                fontSize: '1.5rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem'
              }}>
                �
                {cart.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '0',
                    background: '#FFD700',
                    color: '#222',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: 'bold'
                  }}>
                    {cart.length}
                  </span>
                )}
              </Link>
              
              {/* Hamburger Menu Button */}
              <button
                className="hamburger-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  width: '30px'
                }}
              >
                <span style={{
                  width: '100%',
                  height: '3px',
                  background: '#1976d2',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  transform: mobileMenuOpen ? 'rotate(45deg) translateY(10px)' : 'none'
                }}></span>
                <span style={{
                  width: '100%',
                  height: '3px',
                  background: '#1976d2',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  opacity: mobileMenuOpen ? 0 : 1
                }}></span>
                <span style={{
                  width: '100%',
                  height: '3px',
                  background: '#1976d2',
                  borderRadius: '2px',
                  transition: 'all 0.3s',
                  transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-10px)' : 'none'
                }}></span>
              </button>
            </div>
            
            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
              <>
                {/* Backdrop */}
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 999,
                  animation: 'fadeIn 0.3s ease-in-out'
                }} onClick={() => setMobileMenuOpen(false)} />
                
                {/* Drawer */}
                <div className="mobile-menu" style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '80%',
                  maxWidth: '320px',
                  background: 'white',
                  zIndex: 1000,
                  boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
                  overflowY: 'auto',
                  animation: 'slideIn 0.3s ease-out',
                  padding: '2rem 0'
                }}>
                  <style>{`
                    @keyframes slideIn {
                      from {
                        transform: translateX(100%);
                      }
                      to {
                        transform: translateX(0);
                      }
                    }
                    @keyframes fadeIn {
                      from {
                        opacity: 0;
                      }
                      to {
                        opacity: 1;
                      }
                    }
                  `}</style>
                  
                  {/* Menu Header */}
                  <div style={{
                    padding: '0 1.5rem 1.5rem',
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <h2 style={{
                      margin: 0,
                      fontSize: '1.5rem',
                      color: '#1976d2',
                      fontWeight: 'bold'
                    }}>Menu</h2>
                  </div>
                  
                  {/* Primary Links */}
                  <div style={{ padding: '1rem 0' }}>
                    {primaryLinks.map(link => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '1rem 1.5rem',
                          color: '#222',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          borderBottom: '1px solid #f5f5f5',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#f5f7fa';
                          e.target.style.color = '#1976d2';
                          e.target.style.paddingLeft = '2rem';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.color = '#222';
                          e.target.style.paddingLeft = '1.5rem';
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Divider */}
                  <div style={{
                    height: '8px',
                    background: '#f5f7fa',
                    margin: '0.5rem 0'
                  }}></div>
                  
                  {/* Secondary Links */}
                  <div style={{ padding: '1rem 0' }}>
                    {secondaryLinks.map(link => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: 'block',
                          padding: '1rem 1.5rem',
                          color: '#666',
                          textDecoration: 'none',
                          fontWeight: '500',
                          fontSize: '1rem',
                          borderBottom: '1px solid #f5f5f5',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#f5f7fa';
                          e.target.style.color = '#1976d2';
                          e.target.style.paddingLeft = '2rem';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'white';
                          e.target.style.color = '#666';
                          e.target.style.paddingLeft = '1.5rem';
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
          
          {/* Desktop Wishlist and Cart Links */}
          {!isMobile && (
            <>
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
            </>
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
