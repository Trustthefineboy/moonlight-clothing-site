import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './components/CartContext';

// Sample product data (replace with API call in production)
const products = [
  {
    id: 1,
    name: 'African Print Dress',
    price: 89.99,
    image: '/images/dress1.jpg',
    description: 'Beautiful handcrafted African print dress with modern style.',
    category: 'women',
    colors: ['red', 'blue', 'green'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 2,
    name: 'Men\'s Dashiki',
    price: 69.99,
    image: '/images/dashiki1.jpg',
    description: 'Traditional dashiki shirt with contemporary design elements.',
    category: 'men',
    colors: ['gold', 'black', 'white'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    inStock: true
  },
  {
    id: 3,
    name: 'Ankara Headwrap',
    price: 24.99,
    image: '/images/headwrap1.jpg',
    description: 'Stylish ankara headwrap for any occasion.',
    category: 'accessories',
    colors: ['multicolor', 'blue pattern', 'red pattern'],
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 4,
    name: 'Kente Cloth Bag',
    price: 45.99,
    image: '/images/bag1.jpg',
    description: 'Handmade bag featuring traditional kente cloth patterns.',
    category: 'accessories',
    colors: ['traditional', 'modern'],
    sizes: ['One Size'],
    inStock: false
  }
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { cart, addToCart } = useCart();
  
  // Filter products based on category and search query
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);
  
  // Handle adding product to cart
  const handleAddToCart = (product) => {
    // Create a copy of the product with a unique cart ID
    const productWithCartId = {
      ...product,
      cartId: `${product.id}-${Date.now()}`,
      quantity: 1, // Default quantity
      selectedColor: product.colors[0], // Default color
      selectedSize: product.sizes[0], // Default size
    };
    
    addToCart(productWithCartId);
    alert(`${product.name} added to your cart!`);
  };
  
  return (
    <div className="shop-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#4f8cff' }}>Shop Our Collection</h1>
      
      {/* Search and filter section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <label htmlFor="category" style={{ marginRight: '0.5rem' }}>Filter by: </label>
          <select 
            id="category" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="all">All Products</option>
            <option value="women">Women's Clothing</option>
            <option value="men">Men's Clothing</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        
        <div>
          <input 
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', width: '250px' }}
          />
        </div>
      </div>
      
      {/* Products grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
        gap: '2rem' 
      }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div 
              key={product.id} 
              style={{ 
                border: '1px solid #eaeaea', 
                borderRadius: '8px', 
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={product.image || 'https://via.placeholder.com/300x200?text=Product+Image'} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                {!product.inStock && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#ff4040',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    Out of Stock
                  </div>
                )}
              </div>
              
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{product.name}</h3>
                <p style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem', flex: 1 }}>
                  {product.description.length > 80 
                    ? `${product.description.substring(0, 80)}...` 
                    : product.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontWeight: 'bold', color: '#4f8cff', fontSize: '1.1rem' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: product.inStock ? '#4f8cff' : '#cccccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: product.inStock ? 'pointer' : 'not-allowed',
                      fontSize: '0.9rem'
                    }}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
            <p>No products found matching your criteria. Try a different search.</p>
          </div>
        )}
      </div>
      
      {/* Cart indicator */}
      <div 
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#4f8cff',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 100
        }}
      >
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
          <div>
            <span style={{ fontSize: '1.5rem', position: 'relative' }}>
              🛒
              <span style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: 'red',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}>
                {cart.length}
              </span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}