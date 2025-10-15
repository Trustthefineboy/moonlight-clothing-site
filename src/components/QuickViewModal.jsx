import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { useToast } from './ToastContext';

export default function QuickViewModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Blue', 'Brown', 'Green', 'Yellow', 'Multi-color'];

  if (!product) return null;

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    addToCart(cartItem);
    addToast(`${product.name} added to cart! 🛒`, 'success');
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      addToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      addToast(`${product.name} added to wishlist! 💝`, 'success');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'fadeIn 0.3s ease-in-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          animation: 'slideUp 0.3s ease-in-out',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            color: '#222',
            fontSize: '2rem',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            zIndex: 10,
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.2)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.1)'}
        >
          ×
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {/* Product Image */}
          <div style={{ 
            backgroundColor: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Product Info */}
          <div style={{ padding: '2rem' }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              marginBottom: '1rem', 
              color: '#222',
              paddingRight: '2rem'
            }}>
              {product.name}
            </h2>

            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#FFD700',
              marginBottom: '1.5rem',
              padding: '0.75rem 0',
              borderTop: '2px solid #eee',
              borderBottom: '2px solid #eee'
            }}>
              ₦{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
            </div>

            <p style={{ 
              color: '#666', 
              lineHeight: '1.8', 
              marginBottom: '1.5rem',
              maxHeight: '100px',
              overflow: 'auto'
            }}>
              {product.story}
            </p>

            {/* Size Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                color: '#444'
              }}>
                Size
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: selectedSize === size ? '2px solid #FFD700' : '1px solid #ddd',
                      backgroundColor: selectedSize === size ? '#FFD700' : '#fff',
                      color: selectedSize === size ? '#222' : '#666',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: selectedSize === size ? 'bold' : 'normal',
                      transition: 'all 0.2s',
                      fontSize: '0.9rem'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                color: '#444'
              }}>
                Color
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      border: selectedColor === color ? '2px solid #FFD700' : '1px solid #ddd',
                      backgroundColor: selectedColor === color ? '#FFD700' : '#fff',
                      color: selectedColor === color ? '#222' : '#666',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: selectedColor === color ? 'bold' : 'normal',
                      transition: 'all 0.2s',
                      fontSize: '0.85rem'
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                color: '#444'
              }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 2,
                  padding: '0.875rem',
                  backgroundColor: addedToCart ? '#28a745' : '#FFD700',
                  color: addedToCart ? '#fff' : '#222',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {addedToCart ? '✓ Added!' : '🛒 Add to Cart'}
              </button>

              <button
                onClick={handleWishlist}
                style={{
                  flex: 1,
                  padding: '0.875rem',
                  backgroundColor: isInWishlist(product.id) ? '#ff4444' : 'transparent',
                  color: isInWishlist(product.id) ? '#fff' : '#ff4444',
                  border: '2px solid #ff4444',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {isInWishlist(product.id) ? '❤️' : '🤍'}
              </button>
            </div>

            {/* View Full Details Link */}
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              style={{
                display: 'block',
                textAlign: 'center',
                color: '#1976d2',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                padding: '0.75rem',
                border: '2px solid #1976d2',
                borderRadius: '8px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1976d2';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#1976d2';
              }}
            >
              View Full Details →
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from {
              transform: translateY(50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
