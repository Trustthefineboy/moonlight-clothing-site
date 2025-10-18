import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { useToast } from './ToastContext';
import ProductSkeleton from './ProductSkeleton';
import QuickViewModal from './QuickViewModal';

export default function FabricList({ filter = {} }) {
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    // Using actual Moonlight Clothing product data
    const staticFabrics = [
      {
        id: 1,
        name: 'Adinkra White Shirt',
        price: 25000,
        story: 'Premium Adinkra design white shirt featuring traditional African symbols. Perfect for cultural events and elegant occasions.',
        image: '/images/adinkra-white-shirt.jpg',
        gender: 'Unisex',
        products: ['Shirts'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'The Ready-to-Wear Realm', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 2,
        name: 'Covenant Black Jacket',
        price: 35000,
        story: 'Stylish black jacket with covenant symbols. Premium quality fabric for modern sophistication.',
        image: '/images/covenant-black-jacket.jpg',
        gender: 'Unisex',
        products: ['Shirts'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits', 'Limited Drop Series'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 3,
        name: 'Covenant Black Kaftan',
        price: 30000,
        story: 'Traditional black kaftan with covenant patterns. Elegant and comfortable for all occasions.',
        image: '/images/covenant-black-kaftan.jpg',
        gender: 'Unisex',
        products: ['Kaftan'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 4,
        name: 'Covenant Black Shirt',
        price: 22000,
        story: 'Classic black shirt with covenant design elements. Perfect for everyday wear.',
        image: '/images/covenant-black-shirt.jpg',
        gender: 'Men',
        products: ['Shirts'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Mens Collection'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 5,
        name: 'Covenant Blue Jeans',
        price: 28000,
        story: 'Premium blue denim with covenant styling. Durable and fashionable.',
        image: '/images/covenant-blue-jeans.jpg',
        gender: 'Unisex',
        products: ['Palazzo casual trousers'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 6,
        name: 'Covenant Blue Set',
        price: 45000,
        story: 'Complete blue two-piece set with covenant designs. Stylish and coordinated.',
        image: '/images/covenant-blue-set.jpg',
        gender: 'Unisex',
        products: ['Two pieces'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 7,
        name: 'Guardian Black Shirt',
        price: 24000,
        story: 'Guardian series black shirt with protective symbols. Strong and elegant design.',
        image: '/images/guardian-black-shirt.jpg',
        gender: 'Men',
        products: ['Shirts'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'Mens Collection'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 8,
        name: 'Guardian White Kaftan',
        price: 32000,
        story: 'Pure white kaftan from the Guardian collection. Spiritual and refined.',
        image: '/images/guardian-white-kaftan.jpg',
        gender: 'Unisex',
        products: ['Kaftan'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 9,
        name: 'Green Yellow Shirt',
        price: 26000,
        story: 'Vibrant green and yellow shirt with bold African prints. Stand out in style.',
        image: '/images/green-yellow-shirt.jpg',
        gender: 'Unisex',
        products: ['Shirts'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Limited Drop Series'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 10,
        name: 'Green Yellow Two Piece',
        price: 48000,
        story: 'Complete green and yellow two-piece set. Bold colors with traditional patterns.',
        image: '/images/green-yellow-two-piece.jpg',
        gender: 'Unisex',
        products: ['Two pieces'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Limited Drop Series'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 11,
        name: 'White Three Piece Set',
        price: 55000,
        story: 'Premium white three-piece set. Complete elegance for special occasions.',
        image: '/images/white-three-piece-set.jpg',
        gender: 'Unisex',
        products: ['Two pieces'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'The Capsule Editions', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 12,
        name: 'Brown Adinkra Kaftan',
        price: 34000,
        story: 'Rich brown kaftan with intricate Adinkra symbols. Traditional craftsmanship meets modern style.',
        image: '/images/brown-adinkra-kaftan.jpg',
        gender: 'Unisex',
        products: ['Kaftan'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 13,
        name: 'Covenant Black Joggers',
        price: 26000,
        story: 'Comfortable black joggers with covenant styling. Perfect for casual comfort and streetwear.',
        image: '/images/covenant-black-joggers.jpg',
        gender: 'Unisex',
        products: ['Palazzo casual trousers'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 14,
        name: 'Covenant Black Pants',
        price: 27000,
        story: 'Sleek black pants with covenant details. Versatile for both formal and casual occasions.',
        image: '/images/covenant-black-pants.jpg',
        gender: 'Unisex',
        products: ['Palazzo casual trousers'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 15,
        name: 'Covenant White Shirt',
        price: 23000,
        story: 'Crisp white shirt from the Covenant collection. Clean lines with symbolic detailing.',
        image: '/images/covenant-white-shirt.jpg',
        gender: 'Unisex',
        products: ['Shirts'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 16,
        name: 'Gangan Denim',
        price: 29000,
        story: 'Unique denim piece from the Gangan collection. Contemporary African fashion with durability.',
        image: '/images/gangan-denim.jpg',
        gender: 'Unisex',
        products: ['Palazzo casual trousers'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Limited Drop Series'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 17,
        name: 'Guardian Blue Shorts',
        price: 20000,
        story: 'Comfortable blue shorts from the Guardian series. Perfect for warm weather and casual outings.',
        image: '/images/guardian-blue-shorts.jpg',
        gender: 'Unisex',
        products: ['Palazzo casual trousers'],
        whatsapp: '+2348168279958',
        categories: ['The Ready-to-Wear Realm', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 18,
        name: 'Indigo Path Black Shirt',
        price: 25000,
        story: 'Mystical black shirt from the Indigo Path collection. Journey-inspired design for the modern explorer.',
        image: '/images/indigo-path-black-shirt.jpg',
        gender: 'Unisex',
        products: ['Shirts'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 19,
        name: 'Indigo Path White Kaftan',
        price: 31000,
        story: 'Elegant white kaftan from the Indigo Path series. Spiritual journey meets timeless elegance.',
        image: '/images/indigo-path-white-kaftan.jpg',
        gender: 'Unisex',
        products: ['Kaftan'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'Unisex Divine Fits'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 20,
        name: 'Covenant Symbols Collection',
        price: 38000,
        story: 'Special piece featuring the complete Covenant symbols. A collector\'s item and statement piece.',
        image: '/images/covenant-symbols.jpg',
        gender: 'Unisex',
        products: ['Shirts'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'Limited Drop Series', 'The Archive Pieces'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 21,
        name: 'Guardian Blue Fabric',
        price: 42000,
        story: 'Premium blue fabric piece from the Guardian collection. Exclusive material with protective symbolism.',
        image: '/images/guardian-blue-fabric.jpg',
        gender: 'Unisex',
        products: ['Kaftan'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'Limited Drop Series'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 22,
        name: 'Bridge Between Worlds',
        price: 58000,
        story: 'Exclusive design connecting traditional and contemporary. A bridge between heritage and modern fashion.',
        image: '/images/bridge-between-worlds.jpg',
        gender: 'Unisex',
        products: ['Kaftan'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'The Archive Pieces', 'Limited Drop Series'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 23,
        name: 'Guardian of Earth',
        price: 52000,
        story: 'Majestic piece celebrating our connection to earth. Guardian collection\'s signature design.',
        image: '/images/guardian-of-earth.jpg',
        gender: 'Unisex',
        products: ['Kaftan'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'The Archive Pieces', 'Limited Drop Series'],
        type: 'Fabric',
        inStock: true
      },
      {
        id: 24,
        name: 'The Covenant of Symbols',
        price: 60000,
        story: 'Ultimate piece from the Covenant collection. Complete symbolic representation in premium fabric.',
        image: '/images/the-convenant-of-symbols.jpg',
        gender: 'Unisex',
        products: ['Kaftan'],
        whatsapp: '+2348168279958',
        categories: ['The Sacred Fabrics', 'The Archive Pieces', 'The Capsule Editions'],
        type: 'Fabric',
        inStock: true
      }
    ];
    
    setFabrics(staticFabrics);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        padding: '2rem 0'
      }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (error) return <div>{error}</div>;

  // Filtering logic
  let filtered = fabrics;
  
  // Search filter
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filtered = filtered.filter(f => 
      f.name.toLowerCase().includes(searchLower) ||
      (f.story && f.story.toLowerCase().includes(searchLower)) ||
      (f.categories && f.categories.some(cat => cat.toLowerCase().includes(searchLower)))
    );
  }
  
  if (filter.category) {
    filtered = filtered.filter(f => f.categories && f.categories.includes(filter.category));
  }
  if (filter.gender) {
    filtered = filtered.filter(f => f.gender === filter.gender);
  }
  if (filter.type) {
    filtered = filtered.filter(f => f.products && f.products.includes(filter.type));
  }

  // Sorting logic
  if (filter.sortBy) {
    filtered = [...filtered]; // Create a copy to avoid mutating original array
    
    switch (filter.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.-]+/g, '')) : a.price;
          const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.-]+/g, '')) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.-]+/g, '')) : a.price;
          const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.-]+/g, '')) : b.price;
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id); // Assuming higher ID = newer
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0, color: '#222' }}>
          {filter.search ? `Search Results for "${filter.search}"` : 'Available Products'}
        </h2>
        <div style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          fontWeight: 'bold',
          backgroundColor: '#FFD700',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          color: '#222'
        }}>
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </div>
      </div>

      {/* No Results Message */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '2px dashed #ddd'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontSize: '1.5rem', color: '#222', marginBottom: '0.5rem' }}>
            No Products Found
          </h3>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Try adjusting your filters or search terms
          </p>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>
            {filter.search && <div>Search: "{filter.search}"</div>}
            {filter.category && <div>Category: {filter.category}</div>}
            {filter.gender && <div>Gender: {filter.gender}</div>}
            {filter.type && <div>Type: {filter.type}</div>}
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filtered.map(fabric => (
          <div
            key={fabric.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}
          >
            {/* Wishlist Heart Button */}
            <button
              onClick={() => {
                if (isInWishlist(fabric.id)) {
                  removeFromWishlist(fabric.id);
                  addToast('Removed from wishlist', 'info');
                } else {
                  addToWishlist(fabric);
                  addToast(`${fabric.name} added to wishlist! 💝`, 'success');
                }
              }}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.5rem',
                zIndex: 2,
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.background = isInWishlist(fabric.id) ? '#ff4444' : '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              }}
              title={isInWishlist(fabric.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isInWishlist(fabric.id) ? '❤️' : '🤍'}
            </button>
            
            <div style={{
              width: '100%',
              height: 280,
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
              position: 'relative'
            }}>
              <img
                src={fabric.image}
                alt={fabric.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/f5f5f5/666?text=' + encodeURIComponent(fabric.name);
                  console.error('Failed to load image:', fabric.image);
                }}
              />
            </div>
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ 
                fontSize: '1.15rem',
                marginBottom: '0.75rem',
                color: '#222',
                fontWeight: 'bold',
                lineHeight: 1.3
              }}>{fabric.name}</h3>
              <p style={{ 
                color: '#666',
                fontSize: '0.9rem',
                marginBottom: '1rem',
                flex: 1,
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>{fabric.story}</p>
              <div style={{ 
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#FFD700',
                marginBottom: '1rem',
                borderTop: '1px solid #eee',
                paddingTop: '0.75rem'
              }}>
                ₦{typeof fabric.price === 'number' ? fabric.price.toLocaleString() : fabric.price}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                {/* Quick View and Add to Cart */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setQuickViewProduct(fabric)}
                    style={{
                      flex: 1,
                      backgroundColor: '#4f8cff',
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '0.75rem',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontSize: '0.95rem'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#3a7bd5';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#4f8cff';
                    }}
                  >
                    👁️ Quick View
                  </button>
                  <button
                    onClick={() => {
                      addToCart(fabric);
                      addToast(`${fabric.name} added to cart! 🛒`, 'success');
                    }}
                    style={{
                      flex: 1,
                      background: '#FFD700',
                      color: '#111',
                      fontWeight: 'bold',
                      padding: '0.75rem',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontSize: '0.95rem'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#222';
                      e.currentTarget.style.color = '#FFD700';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#FFD700';
                      e.currentTarget.style.color = '#111';
                    }}
                  >
                    🛒 Add
                  </button>
                </div>
                
                {/* View Full Details Link */}
                <Link
                  to={`/product/${fabric.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#666',
                    fontWeight: 'bold',
                    padding: '0.75rem',
                    border: '2px solid #ddd',
                    borderRadius: 8,
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.borderColor = '#222';
                    e.currentTarget.style.color = '#222';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#ddd';
                    e.currentTarget.style.color = '#666';
                  }}
                >
                  Full Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
      
      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
