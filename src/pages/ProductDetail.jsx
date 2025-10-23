import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';
import ImageZoomModal from '../components/ImageZoomModal';
import QRCodeDisplay from '../components/QRCodeDisplay';
import { productsData } from '../data/productsData';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showZoom, setShowZoom] = useState(false);

  // Get sizes and colors from product data (will be set after product loads)
  const sizes = product?.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = product?.colors || ['Black', 'White', 'Blue'];

  useEffect(() => {
    // Find product from static data
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    setProduct(foundProduct || null);
    setLoading(false);
    
    // Get related products
    if (foundProduct) {
      const related = productsData
        .filter(p => p.id !== parseInt(id))
        .filter(p => 
          (p.categories && foundProduct.categories && 
           p.categories.some(cat => foundProduct.categories.includes(cat))) ||
          p.gender === foundProduct.gender
        )
        .slice(0, 4); // Show only 4 related products
      setRelatedProducts(related);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }

    const cartItem = {
      ...product,
      cartId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
      selectedSize,
      selectedColor,
      quantity
    };

    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
        <h2>Product Not Found</h2>
        <Link to="/shop" style={{ color: '#4f8cff', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '2rem', color: '#666', fontSize: '0.9rem' }}>
        <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
        {' > '}
        <Link to="/shop" style={{ color: '#666', textDecoration: 'none' }}>Shop</Link>
        {' > '}
        <span style={{ color: '#222' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
        {/* Product Image */}
        <div>
          <div 
            style={{
              width: '100%',
              height: '600px',
              backgroundColor: '#f5f5f5',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e0e0e0',
              cursor: 'zoom-in',
              position: 'relative'
            }}
            onClick={() => setShowZoom(true)}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
            {/* Zoom hint */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🔍 Click to zoom
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#222' }}>
            {product.name}
          </h1>

          {/* Proverb */}
          {product.proverb && (
            <div style={{
              fontSize: '1rem',
              fontStyle: 'italic',
              color: '#888',
              marginBottom: '1.5rem',
              paddingLeft: '1rem',
              borderLeft: '4px solid #FFD700',
              lineHeight: 1.6
            }}>
              {product.proverb}
            </div>
          )}

          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#FFD700',
            marginBottom: '2rem',
            padding: '1rem 0',
            borderTop: '1px solid #eee',
            borderBottom: '1px solid #eee'
          }}>
            ₦{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#444' }}>Description</h3>
            <p style={{ color: '#666', lineHeight: '1.8' }}>{product.story}</p>
          </div>

          {/* Gender */}
          {product.gender && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 'bold', color: '#444' }}>Gender: </span>
              <span style={{ color: '#666' }}>{product.gender}</span>
            </div>
          )}

          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontWeight: 'bold', color: '#444', marginRight: '0.5rem' }}>Categories:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {product.categories.slice(0, 3).map((cat, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      color: '#555'
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem', color: '#444' }}>
              Select Size *
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    border: selectedSize === size ? '2px solid #FFD700' : '1px solid #ddd',
                    backgroundColor: selectedSize === size ? '#FFF9E6' : '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: selectedSize === size ? 'bold' : 'normal',
                    color: '#222',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem', color: '#444' }}>
              Select Color *
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    border: selectedColor === color ? '2px solid #FFD700' : '1px solid #ddd',
                    backgroundColor: selectedColor === color ? '#FFF9E6' : '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: selectedColor === color ? 'bold' : 'normal',
                    color: '#222',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.75rem', color: '#444' }}>
              Quantity
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #ddd',
                  backgroundColor: quantity <= 1 ? '#f5f5f5' : '#fff',
                  borderRadius: '8px',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  fontSize: '1.2rem',
                  color: quantity <= 1 ? '#999' : '#222',
                  fontWeight: 'bold'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: '#222',
                  fontWeight: 'bold'
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 2,
                padding: '1rem',
                backgroundColor: addedToCart ? '#28a745' : '#FFD700',
                color: addedToCart ? '#fff' : '#111',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            
            <button
              onClick={() => {
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id);
                } else {
                  addToWishlist(product);
                }
              }}
              style={{
                flex: 1,
                padding: '1rem',
                backgroundColor: isInWishlist(product.id) ? '#ff4444' : 'transparent',
                color: isInWishlist(product.id) ? '#fff' : '#ff4444',
                border: '2px solid #ff4444',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isInWishlist(product.id)) {
                  e.target.style.backgroundColor = '#ff4444';
                  e.target.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isInWishlist(product.id)) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ff4444';
                }
              }}
              title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isInWishlist(product.id) ? '❤️ In Wishlist' : '🤍 Wishlist'}
            </button>
            
            <button
              onClick={() => navigate('/cart')}
              style={{
                padding: '1rem 1.5rem',
                backgroundColor: '#fff',
                color: '#4f8cff',
                border: '2px solid #4f8cff',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              View Cart
            </button>
          </div>

          {/* WhatsApp Order */}
          <a
            href={`https://wa.me/${product.whatsapp}?text=${encodeURIComponent(`Hello! I'm interested in ${product.name} (₦${typeof product.price === 'number' ? product.price.toLocaleString() : product.price})`)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#25D366',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}
          >
            📱 Order/Enquire on WhatsApp
          </a>

          {/* QR Code for Easy Sharing */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#444' }}>
              📱 Share this product
            </h3>
            <QRCodeDisplay url={window.location.href} />
            <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.5rem' }}>
              Scan to share with friends
            </p>
          </div>

          <Link
            to="/shop"
            style={{
              display: 'block',
              textAlign: 'center',
              color: '#4f8cff',
              textDecoration: 'none',
              padding: '0.5rem'
            }}
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '2px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: '#222', textAlign: 'center' }}>
            You May Also Like
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {relatedProducts.map(relatedProduct => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => window.scrollTo(0, 0)}
              >
                <div style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}>
                  <div style={{
                    width: '100%',
                    height: '280px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      marginBottom: '0.75rem',
                      color: '#222',
                      fontWeight: 'bold'
                    }}>
                      {relatedProduct.name}
                    </h3>
                    <p style={{
                      color: '#666',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {relatedProduct.story}
                    </p>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#FFD700',
                      marginTop: 'auto'
                    }}>
                      ₦{typeof relatedProduct.price === 'number' ? relatedProduct.price.toLocaleString() : relatedProduct.price}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Image Zoom Modal */}
      {showZoom && (
        <ImageZoomModal
          imageUrl={product.image}
          imageName={product.name}
          onClose={() => setShowZoom(false)}
        />
      )}
    </div>
  );
}
