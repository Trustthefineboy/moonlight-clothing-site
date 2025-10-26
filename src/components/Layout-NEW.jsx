import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import ScrollToTop from './ScrollToTop';
import { getAssetPath } from '../utils/paths';

// Primary navigation links
const primaryLinks = [
  { to: '/', label: 'HOME' },
  { to: '/shop', label: 'SHOP' },
  { to: '/nft-gallery', label: 'NFT VAULT' },
  { to: '/gallery', label: 'GALLERY' },
  { to: '/memories', label: 'MEMORIES' },
  { to: '/about', label: 'ABOUT' },
];

// Secondary links
const secondaryLinks = [
  { to: '/reviews', label: 'REVIEWS' },
  { to: '/orders', label: 'MY ORDERS' },
];

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cart } = useCart();

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [children]);

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      background: '#ffffff',
      color: '#000',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* LSKD-Style Navigation */}
      <nav style={{
        width: '100%',
        background: '#ffffff',
        borderBottom: '1px solid #e5e5e5',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: isMobile ? '60px' : '70px'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            zIndex: 1001
          }}>
            <img
              src={getAssetPath('/images/moonlight-logo.png')}
              alt="Moonlight Clothings"
              style={{
                height: isMobile ? '40px' : '50px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flex: 1,
              justifyContent: 'center',
              marginLeft: '3rem'
            }}>
              {primaryLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    transition: 'opacity 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '1rem' : '1.5rem'
          }}>
            {/* Account Link - Desktop */}
            {!isMobile && (
              <Link
                to="/profile"
                style={{
                  color: '#000',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.6'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                ACCOUNT
              </Link>
            )}

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              style={{
                color: '#000',
                textDecoration: 'none',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.25rem',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              ♡
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-8px',
                  background: '#000',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.625rem',
                  fontWeight: 'bold'
                }}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              style={{
                color: '#000',
                textDecoration: 'none',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.25rem',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              🛒
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-8px',
                  background: '#000',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.625rem',
                  fontWeight: 'bold'
                }}>
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 1001
                }}
              >
                <span style={{
                  width: '24px',
                  height: '2px',
                  background: '#000',
                  transition: 'all 0.3s',
                  transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
                }}></span>
                <span style={{
                  width: '24px',
                  height: '2px',
                  background: '#000',
                  transition: 'all 0.3s',
                  opacity: mobileMenuOpen ? 0 : 1
                }}></span>
                <span style={{
                  width: '24px',
                  height: '2px',
                  background: '#000',
                  transition: 'all 0.3s',
                  transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
                }}></span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.3)',
              zIndex: 999,
              animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Drawer */}
          <div style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            background: '#fff',
            zIndex: 1000,
            maxHeight: 'calc(100vh - 60px)',
            overflowY: 'auto',
            animation: 'slideDown 0.3s ease-out',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <style>{`
              @keyframes slideDown {
                from {
                  transform: translateY(-20px);
                  opacity: 0;
                }
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            `}</style>

            {/* Primary Links */}
            {primaryLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '1.25rem 1.5rem',
                  color: '#000',
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  borderBottom: index < primaryLinks.length - 1 ? '1px solid #f0f0f0' : 'none',
                  transition: 'background 0.2s'
                }}
                onTouchStart={(e) => e.target.style.background = '#f9f9f9'}
                onTouchEnd={(e) => e.target.style.background = '#fff'}
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div style={{
              height: '8px',
              background: '#f5f5f5',
              margin: '0.5rem 0'
            }}></div>

            {/* Secondary Links */}
            {secondaryLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '1.25rem 1.5rem',
                  color: '#666',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  borderBottom: index < secondaryLinks.length - 1 ? '1px solid #f0f0f0' : 'none',
                  transition: 'background 0.2s'
                }}
                onTouchStart={(e) => e.target.style.background = '#f9f9f9'}
                onTouchEnd={(e) => e.target.style.background = '#fff'}
              >
                {link.label}
              </Link>
            ))}

            {/* Account Link */}
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '1.25rem 1.5rem',
                color: '#000',
                textDecoration: 'none',
                fontSize: '0.9375rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                background: '#f5f5f5',
                transition: 'background 0.2s'
              }}
              onTouchStart={(e) => e.target.style.background = '#ebebeb'}
              onTouchEnd={(e) => e.target.style.background = '#f5f5f5'}
            >
              MY ACCOUNT
            </Link>
          </div>
        </>
      )}

      {/* Main Content */}
      <main style={{
        flex: 1,
        width: '100%',
        background: '#ffffff'
      }}>
        {children}
      </main>

      <ScrollToTop />

      {/* LSKD-Style Footer */}
      <footer style={{
        width: '100%',
        background: '#000',
        color: '#fff',
        padding: isMobile ? '3rem 1.5rem 2rem' : '4rem 2rem 2rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{
            fontStyle: 'italic',
            marginBottom: '1rem',
            fontSize: isMobile ? '1rem' : '1.125rem',
            fontWeight: '300',
            lineHeight: 1.6
          }}>
            "We are Moonlight — born of God, built by culture, walking in eternal legacy."
          </p>
          <p style={{
            fontSize: '0.875rem',
            opacity: 0.7,
            fontWeight: '300',
            margin: 0
          }}>
            &copy; {new Date().getFullYear()} Moonlight Clothings. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
