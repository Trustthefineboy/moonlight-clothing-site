import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import { useOrders } from '../components/OrderContext';
import { useWishlist } from '../components/WishlistContext';

export default function Profile() {
  const { user, signOut, updateProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const { wishlist } = useWishlist();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  });

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  const handleUpdate = () => {
    try {
      updateProfile({ name, email, phone, address });
      showToast('Profile updated successfully! 🌙', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  };

  const handleSignOut = () => {
    signOut();
    showToast('Signed out successfully', 'success');
    navigate('/');
  };

  if (!user) return null;

  const userOrders = orders.filter(order => order.customerEmail === user?.email);
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#222',
              marginBottom: '0.5rem'
            }}>
              Welcome, {user.name}! 👋
            </h1>
            <p style={{ color: '#666', fontSize: '1rem' }}>
              Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#cc0000'}
            onMouseLeave={(e) => e.target.style.background = '#ff4444'}
          >
            Sign Out
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            padding: '1.5rem',
            color: 'white',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {userOrders.length}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Total Orders</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '12px',
            padding: '1.5rem',
            color: 'white',
            boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ₦{totalSpent.toLocaleString()}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Total Spent</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '12px',
            padding: '1.5rem',
            color: 'white',
            boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {wishlist.length}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Wishlist Items</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {['overview', 'orders', 'wishlist', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeTab === tab ? '#1976d2' : 'transparent',
                color: activeTab === tab ? 'white' : '#666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.3s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#222' }}>
              Account Overview
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1976d2' }}>
                  Personal Information
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Full Name</p>
                  <p style={{ color: '#222', fontSize: '1.1rem', fontWeight: '500' }}>{user.name}</p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email</p>
                  <p style={{ color: '#222', fontSize: '1.1rem', fontWeight: '500' }}>{user.email}</p>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Phone</p>
                  <p style={{ color: '#222', fontSize: '1.1rem', fontWeight: '500' }}>{user.phone || 'Not set'}</p>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1976d2' }}>
                  Shipping Address
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: '#222', fontSize: '1rem' }}>
                    {user.address?.street || 'No address set'}
                  </p>
                  {user.address?.city && (
                    <p style={{ color: '#666', fontSize: '0.95rem' }}>
                      {user.address.city}, {user.address.state} {user.address.zipCode}
                    </p>
                  )}
                  {user.address?.country && (
                    <p style={{ color: '#666', fontSize: '0.95rem' }}>{user.address.country}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 2rem',
                background: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#222' }}>
              Order History ({userOrders.length})
            </h2>
            
            {userOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ fontSize: '1.2rem', color: '#999', marginBottom: '1rem' }}>
                  No orders yet
                </p>
                <Link
                  to="/shop"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 2rem',
                    background: '#1976d2',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map(order => (
                  <Link
                    key={order.orderNumber}
                    to={`/orders/${order.orderNumber}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      padding: '1.5rem',
                      border: '2px solid #e0eafc',
                      borderRadius: '12px',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#1976d2';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e0eafc';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#222', marginBottom: '0.5rem' }}>
                          Order #{order.orderNumber}
                        </h3>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          {new Date(order.orderDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p style={{ color: '#999', fontSize: '0.875rem' }}>
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          background: order.status === 'Delivered' ? '#10b981' : order.status === 'Processing' ? '#f59e0b' : '#3b82f6',
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          marginBottom: '0.5rem'
                        }}>
                          {order.status}
                        </div>
                        <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#1976d2' }}>
                          ₦{order.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#222' }}>
              My Wishlist ({wishlist.length})
            </h2>
            
            {wishlist.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ fontSize: '1.2rem', color: '#999', marginBottom: '1rem' }}>
                  Your wishlist is empty
                </p>
                <Link
                  to="/shop"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 2rem',
                    background: '#1976d2',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '1.5rem'
              }}>
                {wishlist.map(item => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      border: '2px solid #e0eafc',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '1.2rem', color: '#1976d2', fontWeight: 'bold' }}>
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: '#222' }}>
              Account Settings
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
              gap: '2rem'
            }}>
              {/* Personal Information */}
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1976d2' }}>
                  Personal Information
                </h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    color: '#666',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0eafc',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                    onBlur={(e) => e.target.style.borderColor = '#e0eafc'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    color: '#666',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0eafc',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                    onBlur={(e) => e.target.style.borderColor = '#e0eafc'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    color: '#666',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 XXX XXX XXXX"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0eafc',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                    onBlur={(e) => e.target.style.borderColor = '#e0eafc'}
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1976d2' }}>
                  Shipping Address
                </h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    color: '#666',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="123 Main Street"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0eafc',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                    onBlur={(e) => e.target.style.borderColor = '#e0eafc'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#666',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="Lagos"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0eafc',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                      onBlur={(e) => e.target.style.borderColor = '#e0eafc'}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#666',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      State
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="Lagos State"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0eafc',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                      onBlur={(e) => e.target.style.borderColor = '#e0eafc'}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#666',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      placeholder="100001"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0eafc',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                      onBlur={(e) => e.target.style.borderColor = '#e0eafc'}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#666',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      Country
                    </label>
                    <select
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0eafc',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                      onBlur={(e) => e.target.style.borderColor = '#e0eafc'}
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleUpdate}
                style={{
                  padding: '0.875rem 2.5rem',
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#1565c0'}
                onMouseLeave={(e) => e.target.style.background = '#1976d2'}
              >
                Save Changes
              </button>
              
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  padding: '0.875rem 2.5rem',
                  background: '#e0e0e0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#d0d0d0'}
                onMouseLeave={(e) => e.target.style.background = '#e0e0e0'}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
