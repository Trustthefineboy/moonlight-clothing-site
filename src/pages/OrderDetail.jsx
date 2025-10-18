import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../components/OrderContext';

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, cancelOrder } = useOrders();
  
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>❓</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#222' }}>
          Order Not Found
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          The order you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/orders"
          style={{
            display: 'inline-block',
            backgroundColor: '#4169E1',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          View All Orders
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA500',
      processing: '#4169E1',
      shipped: '#9370DB',
      delivered: '#32CD32',
      cancelled: '#DC143C'
    };
    return colors[status] || '#666';
  };

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
      navigate('/orders');
    }
  };

  return (
    <div style={{
      maxWidth: 1000,
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '2rem', fontSize: '0.95rem', color: '#666' }}>
        <Link to="/orders" style={{ color: '#4169E1', textDecoration: 'none' }}>Orders</Link>
        {' > '}
        <span style={{ color: '#222' }}>Order {order.orderNumber}</span>
      </div>

      {/* Order Header */}
      <div style={{
        backgroundColor: '#fff',
        border: '2px solid #FFD700',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h1 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '2rem', color: '#222' }}>
              Order {order.orderNumber}
            </h1>
            <div style={{ fontSize: '1rem', color: '#666' }}>
              Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          <div style={{
            padding: '1rem 1.5rem',
            backgroundColor: getStatusColor(order.status),
            color: 'white',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textTransform: 'capitalize'
          }}>
            {order.status}
          </div>
        </div>

        {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>📅</span>
            <div>
              <div style={{ fontWeight: 'bold', color: '#222', marginBottom: '0.25rem' }}>
                Estimated Delivery
              </div>
              <div style={{ color: '#666' }}>
                {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Tracking Timeline */}
      <div style={{
        backgroundColor: '#fff',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ margin: 0, marginBottom: '2rem', fontSize: '1.5rem', color: '#222' }}>
          📍 Order Tracking
        </h2>

        <div style={{ position: 'relative' }}>
          {order.statusHistory.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: index < order.statusHistory.length - 1 ? '2rem' : 0,
                position: 'relative'
              }}
            >
              {/* Timeline Line */}
              {index < order.statusHistory.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '19px',
                  top: '40px',
                  bottom: '-20px',
                  width: '2px',
                  backgroundColor: '#e0e0e0'
                }} />
              )}

              {/* Status Dot */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(item.status),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                flexShrink: 0,
                zIndex: 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                {index === 0 ? '✓' : '•'}
              </div>

              {/* Status Info */}
              <div style={{ flex: 1, paddingTop: '0.25rem' }}>
                <div style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: '#222',
                  marginBottom: '0.25rem',
                  textTransform: 'capitalize'
                }}>
                  {item.status.replace('-', ' ')}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                  {item.message}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#999' }}>
                  {new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Items */}
      <div style={{
        backgroundColor: '#fff',
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.5rem', color: '#222' }}>
          🛍️ Order Items ({order.items.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {order.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '1.5rem',
                padding: '1.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, marginBottom: '0.75rem', fontSize: '1.2rem', color: '#222' }}>
                  {item.name}
                </h3>
                <div style={{ fontSize: '0.95rem', color: '#666', marginBottom: '0.5rem' }}>
                  {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                  {item.selectedColor && <div>Color: {item.selectedColor}</div>}
                  <div>Quantity: {item.quantity || 1}</div>
                </div>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: '#FFD700',
                  fontSize: '1.3rem',
                  marginTop: '0.75rem'
                }}>
                  ₦{typeof item.price === 'number' ? (item.price * (item.quantity || 1)).toLocaleString() : item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Proof (if available) */}
      {order.paymentProof && (
        <div style={{
          backgroundColor: '#fff',
          border: '2px solid #4169E1',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ margin: 0, marginBottom: '1.5rem', fontSize: '1.5rem', color: '#222' }}>
            💳 Payment Proof
          </h2>
          <div style={{ textAlign: 'center' }}>
            <img
              src={order.paymentProof}
              alt="Payment Proof"
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                borderRadius: '8px',
                border: '2px solid #e0e0e0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#f0f7ff',
              borderRadius: '6px',
              fontSize: '0.9rem',
              color: '#4169E1'
            }}>
              ✓ Payment proof uploaded and awaiting verification
            </div>
          </div>
        </div>
      )}

      {/* Customer & Payment Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Delivery Address */}
        <div style={{
          backgroundColor: '#fff',
          border: '2px solid #e0e0e0',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h3 style={{ margin: 0, marginBottom: '1rem', fontSize: '1.2rem', color: '#222' }}>
            📍 Delivery Address
          </h3>
          <div style={{ color: '#666', lineHeight: 1.8 }}>
            <div style={{ fontWeight: 'bold', color: '#222', marginBottom: '0.5rem' }}>
              {order.customerInfo.name}
            </div>
            <div>{order.customerInfo.address}</div>
            <div>{order.customerInfo.city}, {order.customerInfo.state}</div>
            {order.customerInfo.zipCode && <div>{order.customerInfo.zipCode}</div>}
            <div style={{ marginTop: '0.75rem' }}>
              <div>📧 {order.customerInfo.email}</div>
              <div>📞 {order.customerInfo.phone}</div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{
          backgroundColor: '#fff',
          border: '2px solid #e0e0e0',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h3 style={{ margin: 0, marginBottom: '1rem', fontSize: '1.2rem', color: '#222' }}>
            💰 Order Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
              <span>Subtotal:</span>
              <span>₦{order.subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
              <span>Shipping:</span>
              <span>₦{order.shipping.toLocaleString()}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '2px solid #FFD700',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: '#222'
            }}>
              <span>Total:</span>
              <span style={{ color: '#FFD700' }}>₦{order.total.toLocaleString()}</span>
            </div>
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              fontSize: '0.9rem',
              color: '#666'
            }}>
              Payment Method: <strong>{order.paymentMethod}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <Link
          to="/orders"
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '1rem',
            backgroundColor: '#4169E1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#3a5bc7'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4169E1'}
        >
          ← Back to Orders
        </Link>

        {order.status === 'pending' && (
          <button
            onClick={handleCancelOrder}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '1rem',
              backgroundColor: 'transparent',
              color: '#DC143C',
              border: '2px solid #DC143C',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#DC143C';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#DC143C';
            }}
          >
            ✕ Cancel Order
          </button>
        )}

        <button
          onClick={() => window.open('https://wa.me/2348168279958?text=Hello, I need support with my order ' + order.orderNumber, '_blank')}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '1rem',
            backgroundColor: 'transparent',
            color: '#32CD32',
            border: '2px solid #32CD32',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#32CD32';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#32CD32';
          }}
        >
          📞 Contact Support
        </button>
      </div>
    </div>
  );
}
