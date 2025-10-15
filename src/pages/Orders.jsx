import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../components/OrderContext';

export default function Orders() {
  const { orders } = useOrders();
  const [filterStatus, setFilterStatus] = useState('all');

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

  const getStatusIcon = (status) => {
    const icons = {
      pending: '🕐',
      processing: '⚙️',
      shipped: '🚚',
      delivered: '✅',
      cancelled: '❌'
    };
    return icons[status] || '📦';
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  if (orders.length === 0) {
    return (
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📦</div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#222' }}>
          No Orders Yet
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Start shopping to see your orders here!
        </p>
        <Link
          to="/shop"
          style={{
            display: 'inline-block',
            backgroundColor: '#FFD700',
            color: '#222',
            padding: '1rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC700'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FFD700'}
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '3px solid #FFD700'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#222', margin: 0, marginBottom: '0.5rem' }}>
          📦 My Orders
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
          Track and manage your orders
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '12px'
      }}>
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              padding: '0.75rem 1.5rem',
              border: filterStatus === status ? '2px solid #FFD700' : '2px solid transparent',
              backgroundColor: filterStatus === status ? '#FFD700' : '#fff',
              color: filterStatus === status ? '#222' : '#666',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: filterStatus === status ? 'bold' : 'normal',
              fontSize: '0.95rem',
              transition: 'all 0.3s',
              textTransform: 'capitalize'
            }}
            onMouseEnter={(e) => {
              if (filterStatus !== status) {
                e.target.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (filterStatus !== status) {
                e.target.style.backgroundColor = '#fff';
              }
            }}
          >
            {status === 'all' ? `All Orders (${orders.length})` : `${status} (${orders.filter(o => o.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            No {filterStatus} orders found
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredOrders.map(order => (
            <div
              key={order.id}
              style={{
                backgroundColor: '#fff',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#FFD700';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e0e0e0';
              }}
            >
              {/* Order Header */}
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#222' }}>
                      Order {order.orderNumber}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                      {new Date(order.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: getStatusColor(order.status),
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  <span>{getStatusIcon(order.status)}</span>
                  <span style={{ textTransform: 'capitalize' }}>{order.status}</span>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ 
                  display: 'grid',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, marginBottom: '0.5rem', color: '#222' }}>
                          {item.name}
                        </h4>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                          {item.selectedSize && <span>Size: {item.selectedSize} • </span>}
                          {item.selectedColor && <span>Color: {item.selectedColor} • </span>}
                          <span>Qty: {item.quantity || 1}</span>
                        </div>
                        <div style={{ 
                          marginTop: '0.5rem', 
                          fontWeight: 'bold', 
                          color: '#FFD700',
                          fontSize: '1.1rem'
                        }}>
                          ₦{typeof item.price === 'number' ? (item.price * (item.quantity || 1)).toLocaleString() : item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div style={{
                  borderTop: '2px solid #e0e0e0',
                  paddingTop: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1rem'
                }}>
                  <div>
                    <h4 style={{ margin: 0, marginBottom: '0.5rem', color: '#222' }}>
                      Delivery Address
                    </h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {order.customerInfo.name}<br />
                      {order.customerInfo.address}<br />
                      {order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}
                    </p>
                  </div>

                  <div style={{ 
                    textAlign: 'right',
                    minWidth: '200px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      color: '#666'
                    }}>
                      <span>Subtotal:</span>
                      <span>₦{order.subtotal.toLocaleString()}</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem',
                      color: '#666'
                    }}>
                      <span>Shipping:</span>
                      <span>₦{order.shipping.toLocaleString()}</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      paddingTop: '0.75rem',
                      borderTop: '2px solid #FFD700',
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      color: '#222'
                    }}>
                      <span>Total:</span>
                      <span style={{ color: '#FFD700' }}>₦{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <Link
                    to={`/orders/${order.id}`}
                    style={{
                      flex: 1,
                      minWidth: '150px',
                      padding: '0.875rem',
                      backgroundColor: '#4169E1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#3a5bc7'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#4169E1'}
                  >
                    📋 View Details
                  </Link>

                  {order.status === 'pending' && (
                    <button
                      style={{
                        flex: 1,
                        minWidth: '150px',
                        padding: '0.875rem',
                        backgroundColor: 'transparent',
                        color: '#DC143C',
                        border: '2px solid #DC143C',
                        borderRadius: '8px',
                        fontWeight: 'bold',
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
                      Cancel Order
                    </button>
                  )}

                  <button
                    style={{
                      flex: 1,
                      minWidth: '150px',
                      padding: '0.875rem',
                      backgroundColor: 'transparent',
                      color: '#32CD32',
                      border: '2px solid #32CD32',
                      borderRadius: '8px',
                      fontWeight: 'bold',
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
                    ↻ Reorder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
