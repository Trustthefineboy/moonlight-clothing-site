import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/admin', label: 'Admin' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
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
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="/images/moonlight-logo.png" 
            alt="Moonlight Clothings" 
            style={{ height: '50px', width: 'auto' }}
          />
        </Link>
        {isMobile ? (
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: '#4f8cff',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: '#1976d2',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                {link.label}
              </Link>
            ))}
            
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
                gap: '0.3rem'
              }}
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
                gap: '0.3rem'
              }}
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
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        )}
      </nav>
      <main style={{ flex: 1, width: '100%' }}>{children}</main>
      <footer
        style={{
          width: '100%',
          background: '#f5f7fa',
          color: '#222',
          textAlign: 'center',
          padding: '1rem',
          borderTop: '1px solid #e0eafc',
        }}
      >
        <p>&copy; {new Date().getFullYear()} Moonlight Clothings. All rights reserved.</p>
      </footer>
    </div>
  );
}
