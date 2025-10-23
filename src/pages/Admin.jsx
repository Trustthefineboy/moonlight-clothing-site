import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastContext';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  // Admin emails - only these users can access admin panel
  const ADMIN_EMAILS = ['uzoigwetrust5@gmail.com', 'admin@moonlightclothings.com'];
  
  const [activeTab, setActiveTab] = useState('products');
  
  // Check if user is admin
  useEffect(() => {
    if (!user) {
      showToast('Please login to access admin panel', 'error');
      navigate('/signin');
      return;
    }
    
    if (!ADMIN_EMAILS.includes(user.email)) {
      showToast('Access denied. Admin only.', 'error');
      navigate('/');
      return;
    }
  }, [user, navigate]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    story: '',
    image: '',
    gender: 'Unisex',
    products: '',
    categories: '',
    whatsapp: '+2348168279958'
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const res = await fetch('http://localhost:3001/api/fabrics');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } else if (activeTab === 'reviews') {
        const res = await fetch('http://localhost:3001/api/reviews/all');
        const data = await res.json();
        setReviews(data.reviews || []);
      } else if (activeTab === 'orders') {
        const saved = localStorage.getItem('moonlight-orders');
        setOrders(saved ? JSON.parse(saved) : []);
      } else if (activeTab === 'newsletter') {
        const res = await fetch('http://localhost:3001/api/newsletter/subscribers');
        const data = await res.json();
        setNewsletters(data.subscribers || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to localStorage
      if (activeTab === 'reviews') {
        const saved = localStorage.getItem('moonlight-reviews');
        setReviews(saved ? JSON.parse(saved) : []);
      } else if (activeTab === 'newsletter') {
        const saved = localStorage.getItem('newsletter-subscribers');
        setNewsletters(saved ? JSON.parse(saved).map(email => ({ email })) : []);
      }
    }
    setLoading(false);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/fabrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          products: productForm.products.split(',').map(p => p.trim()),
          categories: productForm.categories.split(',').map(c => c.trim()),
        })
      });
      if (res.ok) {
        showToast('Product added successfully!', 'success');
        setProductForm({
          name: '',
          price: '',
          story: '',
          image: '',
          gender: 'Unisex',
          products: '',
          categories: '',
          whatsapp: '+2348168279958'
        });
        fetchData();
      }
    } catch (error) {
      showToast('Error adding product', 'error');
    }
  };

  const handleReviewAction = async (reviewId, status) => {
    try {
      const res = await fetch(`http://localhost:3001/api/reviews/${reviewId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast(`Review ${status}!`, 'success');
        fetchData();
      }
    } catch (error) {
      showToast('Error updating review', 'error');
    }
  };

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    },
    header: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    tabs: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    },
    tab: (active) => ({
      padding: '0.8rem 1.5rem',
      backgroundColor: active ? '#4169E1' : '#fff',
      color: active ? '#fff' : '#333',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s',
      boxShadow: active ? '0 4px 12px rgba(65,105,225,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
    }),
    card: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem'
    },
    input: {
      padding: '0.8rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem'
    },
    button: {
      padding: '1rem 2rem',
      backgroundColor: '#4169E1',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '1rem',
      transition: 'all 0.3s'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem'
    },
    th: {
      backgroundColor: '#4169E1',
      color: '#fff',
      padding: '1rem',
      textAlign: 'left'
    },
    td: {
      padding: '1rem',
      borderBottom: '1px solid #e0e0e0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ margin: '0 0 1rem 0', color: '#222', fontSize: '2.5rem' }}>
          🎨 Admin Control Panel
        </h1>
        <p style={{ margin: 0, color: '#666' }}>
          Manage your Moonlight Clothings store
        </p>
      </div>

      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === 'products')} onClick={() => setActiveTab('products')}>
          📦 Products
        </button>
        <button style={styles.tab(activeTab === 'reviews')} onClick={() => setActiveTab('reviews')}>
          ⭐ Reviews
        </button>
        <button style={styles.tab(activeTab === 'orders')} onClick={() => setActiveTab('orders')}>
          🛍️ Orders
        </button>
        <button style={styles.tab(activeTab === 'newsletter')} onClick={() => setActiveTab('newsletter')}>
          📧 Newsletter
        </button>
      </div>

      {activeTab === 'products' && (
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Add New Product</h2>
          <form onSubmit={handleProductSubmit} style={styles.form}>
            <input
              style={styles.input}
              name="name"
              placeholder="Product Name"
              value={productForm.name}
              onChange={(e) => setProductForm({...productForm, name: e.target.value})}
              required
            />
            <input
              style={styles.input}
              name="price"
              type="number"
              placeholder="Price (₦)"
              value={productForm.price}
              onChange={(e) => setProductForm({...productForm, price: e.target.value})}
              required
            />
            <input
              style={styles.input}
              name="image"
              placeholder="Image filename (e.g., product.jpg)"
              value={productForm.image}
              onChange={(e) => setProductForm({...productForm, image: e.target.value})}
              required
            />
            <select
              style={styles.input}
              value={productForm.gender}
              onChange={(e) => setProductForm({...productForm, gender: e.target.value})}
            >
              <option>Unisex</option>
              <option>Men</option>
              <option>Women</option>
            </select>
            <textarea
              style={{...styles.input, gridColumn: '1 / -1'}}
              name="story"
              placeholder="Product Story/Description"
              value={productForm.story}
              onChange={(e) => setProductForm({...productForm, story: e.target.value})}
              rows={4}
              required
            />
            <input
              style={styles.input}
              name="products"
              placeholder="Product Types (comma separated)"
              value={productForm.products}
              onChange={(e) => setProductForm({...productForm, products: e.target.value})}
            />
            <input
              style={styles.input}
              name="categories"
              placeholder="Categories (comma separated)"
              value={productForm.categories}
              onChange={(e) => setProductForm({...productForm, categories: e.target.value})}
            />
            <button type="submit" style={{...styles.button, gridColumn: '1 / -1'}}>
              ➕ Add Product
            </button>
          </form>

          <h3 style={{ marginTop: '3rem' }}>All Products ({products.length})</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Categories</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td style={styles.td}>{product.id}</td>
                    <td style={styles.td}>{product.name}</td>
                    <td style={styles.td}>₦{product.price?.toLocaleString()}</td>
                    <td style={styles.td}>{product.gender}</td>
                    <td style={styles.td}>{product.categories?.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Manage Reviews ({reviews.length})</h2>
          {reviews.map(review => (
            <div key={review.id || review._id} style={{
              padding: '1.5rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {review.name} - {'⭐'.repeat(review.rating)}
                  </div>
                  <p style={{ margin: '0.5rem 0' }}>{review.reviewText}</p>
                  {review.productName && (
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      Product: {review.productName}
                    </div>
                  )}
                  <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>
                    Status: <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: review.status === 'approved' ? '#d4edda' : review.status === 'rejected' ? '#f8d7da' : '#fff3cd',
                      color: review.status === 'approved' ? '#155724' : review.status === 'rejected' ? '#721c24' : '#856404'
                    }}>
                      {review.status}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleReviewAction(review.id || review._id, 'approved')}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReviewAction(review.id || review._id, 'rejected')}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'orders' && (
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Orders ({orders.length})</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order #</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.orderNumber}>
                    <td style={styles.td}>{order.orderNumber}</td>
                    <td style={styles.td}>{order.customerInfo?.name}</td>
                    <td style={styles.td}>₦{order.total?.toLocaleString()}</td>
                    <td style={styles.td}>{order.orderStatus || 'pending'}</td>
                    <td style={styles.td}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'newsletter' && (
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Newsletter Subscribers ({newsletters.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {newsletters.map((sub, idx) => (
              <div key={idx} style={{
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>📧</span>
                <span style={{ flex: 1 }}>{sub.email}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
