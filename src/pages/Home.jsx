import React from 'react';
import { Link } from 'react-router-dom';

// Featured collections for the homepage
const featuredCollections = [
  {
    id: 1,
    name: 'The Sacred Fabrics',
    image: '/images/sacred-fabrics-featured.jpg',
    description: 'Our premium handcrafted fabrics with deep cultural significance',
    link: '/fabric'
  },
  {
    id: 2,
    name: 'The Ready-to-Wear Realm',
    image: '/images/ready-to-wear-featured.jpg',
    description: 'Elegant, practical designs for your everyday moments',
    link: '/shop'
  },
  {
    id: 3,
    name: 'Limited Drop Series',
    image: '/images/limited-drop-featured.jpg',
    description: 'Exclusive designs available for a limited time only',
    link: '/shop'
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sarah J.',
    location: 'Lagos',
    image: 'https://via.placeholder.com/80x80?text=SJ',
    text: 'The quality of Moonlight Clothings is exceptional. My dashiki has gotten so many compliments!'
  },
  {
    id: 2,
    name: 'Michael T.',
    location: 'New York',
    image: 'https://via.placeholder.com/80x80?text=MT',
    text: 'I love how these pieces connect me to my heritage while being perfectly modern.'
  },
  {
    id: 3,
    name: 'Amara O.',
    location: 'London',
    image: 'https://via.placeholder.com/80x80?text=AO',
    text: 'The customer service is as beautiful as the clothing. I\'ll be a customer for life!'
  }
];

export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://via.placeholder.com/1920x1080?text=African+Fabric+Background)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem'
        }}
      >
        <div style={{ maxWidth: '800px', zIndex: 1 }}>
          <img
            src="/images/moonlight-logo.png"
            alt="Moonlight Clothings Logo"
            style={{
              width: 'min(280px, 80vw)',
              marginBottom: 24,
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          />
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Welcome to Moonlight Clothings
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              textShadow: '0 2px 5px rgba(0,0,0,0.3)',
              lineHeight: 1.6
            }}
          >
            Discover the beauty of African luxury and soulful designs. Let the moon guide your style journey.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/shop"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                backgroundColor: '#4f8cff',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'transform 0.3s, background-color 0.3s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#3a78e0';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#4f8cff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Shop Now
            </Link>
            <Link 
              to="/about"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: '50px',
                cursor: 'pointer',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'transform 0.3s, background-color 0.3s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Our Story
            </Link>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div 
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite',
            cursor: 'pointer'
          }}
          onClick={() => window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          })}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
          <style>{`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
          `}</style>
        </div>
      </section>

      {/* Featured Collections */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '3rem',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#333'
          }}>
            Our Featured Collections
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {featuredCollections.map(collection => (
              <Link 
                key={collection.id} 
                to={collection.link}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                }}>
                  <div style={{ height: '250px', overflow: 'hidden' }}>
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  <div style={{ padding: '1.5rem', backgroundColor: '#fff', flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1.4rem',
                      marginBottom: '0.8rem',
                      color: '#4f8cff'
                    }}>{collection.name}</h3>
                    <p style={{ 
                      color: '#666',
                      marginBottom: '1.5rem',
                      flex: 1
                    }}>{collection.description}</p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#4f8cff',
                      fontWeight: 'bold'
                    }}>
                      <span>Explore Collection</span>
                      <svg 
                        style={{ marginLeft: '0.5rem', transition: 'transform 0.2s' }}
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="arrow-icon"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                      <style>{`
                        .arrow-icon:hover {
                          transform: translateX(5px);
                        }
                      `}</style>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ 
        padding: '5rem 2rem', 
        backgroundColor: '#f8f9fa',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundImage: 'url(https://via.placeholder.com/100x100?text=Pattern)',
            opacity: 0.05,
            zIndex: 0
          }} 
        />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '1rem',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#333'
          }}>
            Trending Now
          </h2>
          <p style={{ 
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            color: '#666'
          }}>
            Discover our latest and most popular designs that our customers love
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Sample Products */}
            {[1, 2, 3, 4].map(i => (
              <Link 
                key={i}
                to="/shop"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.05)';
                }}>
                  <div style={{ height: '250px', position: 'relative' }}>
                    <img 
                      src={`https://via.placeholder.com/250x350?text=Product+${i}`} 
                      alt={`Featured Product ${i}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover'
                      }}
                    />
                    {i === 2 && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#ff4040',
                        color: 'white',
                        padding: '5px 10px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        borderRadius: '4px'
                      }}>
                        BESTSELLER
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>
                      {i === 1 && 'African Print Dress'}
                      {i === 2 && 'Men\'s Dashiki'}
                      {i === 3 && 'Ankara Headwrap'}
                      {i === 4 && 'Unisex Jacket'}
                    </h3>
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: '#4f8cff',
                      marginBottom: '0.8rem'
                    }}>
                      ${(49.99 + (i * 10)).toFixed(2)}
                    </div>
                    <button
                      style={{
                        width: '100%',
                        padding: '0.6rem',
                        border: 'none',
                        backgroundColor: '#4f8cff',
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#3a78e0';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#4f8cff';
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link 
              to="/shop"
              style={{
                display: 'inline-block',
                padding: '0.8rem 2rem',
                backgroundColor: 'transparent',
                border: '2px solid #4f8cff',
                color: '#4f8cff',
                borderRadius: '50px',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'background-color 0.3s, color 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#4f8cff';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#4f8cff';
              }}
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '1rem',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#333'
          }}>
            What Our Customers Say
          </h2>
          <p style={{ 
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            color: '#666'
          }}>
            Hear from customers who have experienced the quality and beauty of our designs
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                position: 'relative',
                paddingTop: '3rem'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-25px',
                  left: '25px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid white',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
                }}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{
                  fontSize: '4rem',
                  position: 'absolute',
                  top: '-5px',
                  right: '20px',
                  opacity: 0.1,
                  fontFamily: 'serif',
                  color: '#4f8cff'
                }}>
                  "
                </div>
                <p style={{ 
                  fontSize: '0.95rem', 
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  color: '#444',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </p>
                <div style={{ fontWeight: 'bold' }}>{testimonial.name}</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ 
        padding: '5rem 2rem',
        backgroundColor: '#4f8cff',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ 
            marginBottom: '1rem',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)'
          }}>
            Join Our Newsletter
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            Subscribe to get updates on new collections, special offers and styling tips.
          </p>
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{
                flex: '1 0 200px',
                padding: '0.8rem 1rem',
                borderRadius: '4px',
                border: 'none',
                fontSize: '1rem'
              }}
            />
            <button style={{
              padding: '0.8rem 1.5rem',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#222';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
