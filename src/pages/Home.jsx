import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/ToastContext';
import { assetSrc } from '../utils/paths';

export default function Home() {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <div style={{ background: '#fff' }}>
      {/* Hero Section - LSKD Style */}
      <section style={{
        position: 'relative',
        height: isMobile ? '70vh' : '85vh',
        minHeight: '500px',
        width: '100%',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${assetSrc('/images/moonlight-logo.png')})`,
          backgroundSize: isMobile ? 'cover' : 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3
        }}></div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: '#fff',
          maxWidth: '1200px',
          padding: isMobile ? '0 1.5rem' : '0 2rem'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : 'clamp(3rem, 6vw, 5rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            letterSpacing: '-1px',
            lineHeight: 1.1
          }}>
            COMMUNICATING LOVE<br/>THROUGH FASHION
          </h1>
          
          <p style={{
            fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 2vw, 1.4rem)',
            fontWeight: '300',
            marginBottom: '2.5rem',
            letterSpacing: '0.5px',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Connecting Tribes Through Fabrics
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/shop"
              style={{
                display: 'inline-block',
                padding: isMobile ? '0.875rem 2rem' : '1rem 2.5rem',
                background: '#fff',
                color: '#000',
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s',
                border: '2px solid #fff'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#fff';
                e.target.style.color = '#000';
              }}
            >
              SHOP NOW
            </Link>
            
            <Link
              to="/nft-gallery"
              style={{
                display: 'inline-block',
                padding: isMobile ? '0.875rem 2rem' : '1rem 2.5rem',
                background: 'transparent',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s',
                border: '2px solid #fff'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#fff';
                e.target.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#fff';
              }}
            >
              NFT VAULT
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: '#fff'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '600',
            marginBottom: '1.5rem',
            letterSpacing: '-0.5px',
            color: '#000'
          }}>
            MOONLIGHT CLOTHINGS
          </h2>
          
          <p style={{
            fontSize: isMobile ? '1rem' : '1.125rem',
            lineHeight: 1.8,
            color: '#666',
            marginBottom: '1.5rem',
            fontWeight: '300'
          }}>
            More than fashion — it is light woven into culture, a divine bridge between tradition and creation.
          </p>
          
          <p style={{
            fontSize: isMobile ? '1.125rem' : '1.25rem',
            fontStyle: 'italic',
            color: '#000',
            fontWeight: '400',
            lineHeight: 1.6
          }}>
            "We are Moonlight — born of God, built by culture, walking in eternal legacy."
          </p>
        </div>
      </section>

      {/* Featured Collections */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: '#f8f8f8'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.5rem',
            fontWeight: '600',
            marginBottom: '3rem',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            color: '#000'
          }}>
            FEATURED COLLECTIONS
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '2rem' : '2.5rem'
          }}>
            {[
              { name: 'THE SACRED FABRICS', link: '/fabric', desc: 'Premium handcrafted fabrics with deep cultural significance', image: 'sacred-fabrics-featured.jpg' },
              { name: 'READY-TO-WEAR', link: '/shop', desc: 'Elegant, practical designs for your everyday moments', image: 'ready-to-wear-featured.jpg' },
              { name: 'LIMITED DROPS', link: '/shop', desc: 'Exclusive designs available for a limited time only', image: 'limited-drop-featured.jpg' }
            ].map((collection, index) => (
              <Link
                key={index}
                to={collection.link}
                style={{
                  textDecoration: 'none',
                  color: '#000'
                }}
              >
                <div style={{
                  background: '#fff',
                  height: '100%',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    height: isMobile ? '250px' : '350px',
                    backgroundImage: `url(${assetSrc(`/images/${collection.image}`)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: '1.5rem'
                  }}></div>
                  
                  <div style={{ padding: '0 1.5rem 2rem' }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      letterSpacing: '0.5px'
                    }}>
                      {collection.name}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#666',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                      fontWeight: '300'
                    }}>
                      {collection.desc}
                    </p>
                    
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid #000',
                      paddingBottom: '2px'
                    }}>
                      EXPLORE →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - LSKD Style */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.5rem',
            fontWeight: '600',
            marginBottom: '3rem',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            color: '#000'
          }}>
            CUSTOMER REVIEWS
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem'
          }}>
            {[
              { name: 'Chidinma A.', location: 'Lagos', text: 'The quality of Moonlight Clothings is exceptional! My Covenant Black Kaftan has gotten so many compliments.' },
              { name: 'Emmanuel O.', location: 'Abuja', text: 'Fast delivery and excellent customer service. The Guardian White Kaftan fits perfectly and the fabric quality is top-notch.' },
              { name: 'Aisha M.', location: 'Port Harcourt', text: 'I love how these pieces connect me to my heritage while being perfectly modern. The designs are unique and stylish!' }
            ].map((review, index) => (
              <div key={index} style={{
                padding: '2rem',
                background: '#f8f8f8',
                borderLeft: '3px solid #000'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '0.25rem',
                  marginBottom: '1rem',
                  color: '#000'
                }}>
                  {'★★★★★'}
                </div>
                
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: '#444',
                  marginBottom: '1.5rem',
                  fontWeight: '300'
                }}>
                  "{review.text}"
                </p>
                
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.25rem',
                    color: '#000',
                    letterSpacing: '0.3px'
                  }}>
                    {review.name}
                  </div>
                  <div style={{
                    fontSize: '0.8125rem',
                    color: '#888',
                    fontWeight: '300'
                  }}>
                    {review.location}, Nigeria
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - LSKD Style */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
        background: '#000',
        color: '#fff'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '1.75rem' : '2.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            letterSpacing: '-0.5px'
          }}>
            JOIN THE TRIBE
          </h2>
          
          <p style={{
            fontSize: '1rem',
            marginBottom: '2rem',
            fontWeight: '300',
            lineHeight: 1.6
          }}>
            Subscribe to receive updates, events, and revelations from Moonlight Clothings.
          </p>
          
          <form
            onSubmit={handleNewsletterSubscribe}
            style={{
              display: 'flex',
              gap: '0.5rem',
              maxWidth: '500px',
              margin: '0 auto',
              flexDirection: isMobile ? 'column' : 'row'
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              disabled={isSubscribing}
              required
              style={{
                flex: 1,
                padding: '1rem 1.25rem',
                border: '1px solid #333',
                background: 'transparent',
                color: '#fff',
                fontSize: '0.9375rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
            <button
              type="submit"
              disabled={isSubscribing}
              style={{
                padding: isMobile ? '1rem 1.25rem' : '1rem 2rem',
                background: '#fff',
                color: '#000',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                cursor: isSubscribing ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isSubscribing ? 0.5 : 1
              }}
            >
              {isSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
