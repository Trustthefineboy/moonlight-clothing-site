import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  // Calculate subtotal for an item
  const getItemSubtotal = (item) => {
    return item.price * (item.quantity || 1);
  };

  // Handle WhatsApp checkout
  const handleCheckout = () => {
    const formattedItems = cart.map(item => {
      const quantity = item.quantity || 1;
      const size = item.selectedSize || 'Not specified';
      const color = item.selectedColor || 'Not specified';
      const price = typeof item.price === 'number' ? item.price : 0;
      return `${item.name} (Qty: ${quantity}, Size: ${size}, Color: ${color}) - ₦${(price * quantity).toLocaleString()}`;
    }).join('\n');

    const total = `Total: ₦${getCartTotal().toLocaleString()}`;

    const message = encodeURIComponent(
      `Hello! I would like to place an order:\n\n${formattedItems}\n\n${total}\n\nPlease let me know how to proceed with payment and delivery.`
    );

    window.open(`https://wa.me/2348168279958?text=${message}`, '_blank');
  };  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem', 
      minHeight: '80vh'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: '#4f8cff',
        fontSize: '2rem'
      }}>Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h2 style={{ marginBottom: '1rem' }}>Your cart is empty</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop" style={{ 
            textDecoration: 'none',
            backgroundColor: '#4f8cff',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}>Continue Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Desktop header - hidden on mobile */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'minmax(100px, 1fr) 2fr 1fr 1fr 1fr',
            gap: '1rem',
            padding: '1rem 0',
            borderBottom: '1px solid #eaeaea',
            fontWeight: 'bold',
            color: '#333',
            '@media (max-width: 768px)': { display: 'none' }
          }}>
            <div>Product</div>
            <div>Description</div>
            <div style={{ textAlign: 'center' }}>Price</div>
            <div style={{ textAlign: 'center' }}>Quantity</div>
            <div style={{ textAlign: 'right' }}>Subtotal</div>
          </div>

          {/* Cart items */}
          {cart.map((item) => (
            <div key={item.cartId} style={{ 
              display: 'grid',
              gridTemplateColumns: 'minmax(100px, 1fr) 2fr 1fr 1fr 1fr',
              gap: '1rem',
              padding: '1rem 0',
              borderBottom: '1px solid #eaeaea',
              alignItems: 'center',
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
                textAlign: 'center',
                gap: '0.5rem'
              }
            }}>
              {/* Product image */}
              <div>
                <img 
                  src={item.image || 'https://via.placeholder.com/100x120?text=No+Image'} 
                  alt={item.name}
                  style={{ 
                    width: '100%', 
                    maxWidth: '100px', 
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #eaeaea'
                  }}
                />
              </div>

              {/* Product details */}
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.name}</h3>
                <div style={{ fontSize: '0.9rem', color: '#666', margin: '0.25rem 0' }}>
                  Size: {item.selectedSize || 'Not specified'}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666', margin: '0.25rem 0' }}>
                  Color: {item.selectedColor || 'Not specified'}
                </div>
                <button 
                  onClick={() => removeFromCart(item.cartId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff4040',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    padding: 0,
                    marginTop: '0.5rem',
                    textDecoration: 'underline'
                  }}
                >
                  Remove
                </button>
              </div>

              {/* Price */}
              <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                ₦{typeof item.price === 'number' ? item.price.toLocaleString() : '0'}
              </div>

              {/* Quantity */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <button
                    onClick={() => updateQuantity(item.cartId, (item.quantity || 1) - 1)}
                    disabled={(item.quantity || 1) <= 1}
                    style={{
                      width: '28px',
                      height: '28px',
                      border: '1px solid #ddd',
                      background: (item.quantity || 1) <= 1 ? '#f5f5f5' : '#fff',
                      borderRadius: '4px',
                      cursor: (item.quantity || 1) <= 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => updateQuantity(item.cartId, parseInt(e.target.value) || 1)}
                    style={{
                      width: '40px',
                      textAlign: 'center',
                      border: '1px solid #ddd',
                      padding: '0.25rem',
                      borderRadius: '4px'
                    }}
                  />
                  <button
                    onClick={() => updateQuantity(item.cartId, (item.quantity || 1) + 1)}
                    style={{
                      width: '28px',
                      height: '28px',
                      border: '1px solid #ddd',
                      background: '#fff',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div style={{ textAlign: 'right', fontWeight: 'bold', color: '#4f8cff' }}>
                ₦{getItemSubtotal(item).toLocaleString()}
              </div>
            </div>
          ))}

          {/* Cart summary */}
          <div style={{ 
            marginLeft: 'auto', 
            marginTop: '2rem',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.5rem' }}>Order Summary</h2>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span>Items ({cart.length}):</span>
              <span>₦{getCartTotal().toLocaleString()}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              color: '#666'
            }}>
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #ddd',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}>
              <span>Total:</span>
              <span>₦{getCartTotal().toLocaleString()}</span>
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={handleCheckout}
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#4f8cff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#3a78e0';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#4f8cff';
                }}
              >
                Order via WhatsApp
              </button>
              
              <button 
                onClick={clearCart}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Clear Cart
              </button>
              
              <Link 
                to="/shop" 
                style={{
                  textDecoration: 'none',
                  color: '#4f8cff',
                  textAlign: 'center',
                  display: 'block',
                  marginTop: '0.5rem'
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
