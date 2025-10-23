import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/ToastContext';

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
    name: 'Chidinma A.',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'The quality of Moonlight Clothings is exceptional! My Covenant Black Kaftan has gotten so many compliments. Will definitely order again!'
  },
  {
    id: 2,
    name: 'Emmanuel O.',
    location: 'Abuja, Nigeria',
    rating: 5,
    text: 'Fast delivery and excellent customer service. The Guardian White Kaftan fits perfectly and the fabric quality is top-notch.'
  },
  {
    id: 3,
    name: 'Aisha M.',
    location: 'Port Harcourt, Nigeria',
    rating: 5,
    text: 'I love how these pieces connect me to my heritage while being perfectly modern. The designs are unique and stylish!'
  },
  {
    id: 4,
    name: 'Tunde B.',
    location: 'Ibadan, Nigeria',
    rating: 5,
    text: 'Amazing craftsmanship! The attention to detail on the Senator wear is incredible. Worth every naira!'
  },
  {
    id: 5,
    name: 'Blessing N.',
    location: 'Enugu, Nigeria',
    rating: 4,
    text: 'Beautiful designs and comfortable fabric. Delivery took a bit longer than expected but the quality made up for it.'
  },
  {
    id: 6,
    name: 'Oluwaseun K.',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'Best online clothing store in Nigeria! Professional service, quality products, and fair prices. Highly recommended!'
  }
];

export default function Home() {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubscribe = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch('http://localhost:3001/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newsletterEmail })
      });

      const data = await response.json();

      if (response.ok) {
        showToast(data.message || 'Successfully subscribed to newsletter!', 'success');
        setNewsletterEmail('');
      } else {
        showToast(data.error || 'Subscription failed', 'error');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      // Save to localStorage as fallback
      const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      if (!subscribers.includes(newsletterEmail)) {
        subscribers.push(newsletterEmail);
        localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
        showToast('Subscribed successfully! (Saved locally)', 'success');
        setNewsletterEmail('');
      } else {
        showToast('Email already subscribed', 'error');
      }
    } finally {
      setIsSubscribing(false);
    }
  };

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
        <div style={{ maxWidth: '800px', zIndex: 1, padding: '0 1rem' }}>
          <img
            src="/images/moonlight-logo.png"
            alt="Moonlight Clothings Logo"
            style={{
              width: 'min(180px, 50vw)',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          />
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              lineHeight: 1.2
            }}
          >
            Communicating Love Through Fashion
          </h1>
          <h2
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: '500',
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              lineHeight: 1.2,
              fontStyle: 'italic'
            }}
          >
            Connecting Tribes Through Fabrics
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              maxWidth: '700px',
              margin: '0 auto 1.5rem',
              textShadow: '0 2px 5px rgba(0,0,0,0.3)',
              lineHeight: 1.6,
              padding: '0 1rem',
              fontWeight: '300'
            }}
          >
            Moonlight Clothings is more than fashion — it is light woven into culture, a divine bridge between tradition and creation.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 1rem' }}>
            <Link 
              to="/shop"
              style={{
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
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
              Explore Collections
            </Link>
            <a 
              href="https://wa.me/2348168279958"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
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
              Join the Community
            </a>
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
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
                position: 'relative',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.05)';
              }}>
                {/* Star Rating */}
                <div style={{ 
                  marginBottom: '1rem',
                  display: 'flex',
                  gap: '0.25rem',
                  color: '#FFD700'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ fontSize: '1.2rem' }}>
                      {i < testimonial.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                
                {/* Quote Icon */}
                <div style={{
                  fontSize: '3rem',
                  position: 'absolute',
                  top: '10px',
                  right: '20px',
                  opacity: 0.1,
                  fontFamily: 'serif',
                  color: '#4f8cff'
                }}>
                  "
                </div>
                
                {/* Review Text */}
                <p style={{ 
                  fontSize: '0.95rem', 
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  color: '#444',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </p>
                
                {/* Customer Info */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#4169E1',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#222', marginBottom: '0.25rem' }}>
                      {testimonial.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      📍 {testimonial.location}
                    </div>
                  </div>
                </div>
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
            marginBottom: '0.5rem',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)'
          }}>
            Light Dispatch
          </h2>
          <p style={{ marginBottom: '2rem', fontStyle: 'italic' }}>
            Subscribe to receive sacred updates, events, and revelations from Moonlight Clothings.
          </p>
          <form 
            onSubmit={handleNewsletterSubscribe}
            style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            <input 
              type="email" 
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              disabled={isSubscribing}
              required
              style={{
                flex: '1 0 200px',
                padding: '0.8rem 1rem',
                borderRadius: '4px',
                border: 'none',
                fontSize: '1rem'
              }}
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              style={{
                padding: '0.8rem 1.5rem',
                backgroundColor: isSubscribing ? '#666' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: isSubscribing ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => {
                if (!isSubscribing) {
                  e.currentTarget.style.backgroundColor = '#222';
                }
              }}
              onMouseOut={(e) => {
                if (!isSubscribing) {
                  e.currentTarget.style.backgroundColor = '#333';
                }
              }}
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
