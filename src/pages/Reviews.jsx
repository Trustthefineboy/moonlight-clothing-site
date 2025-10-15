import React, { useState } from 'react';
import { useToast } from '../components/ToastContext';

export default function Reviews() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('moonlight-reviews');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    rating: 5,
    reviewText: '',
    productName: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.reviewText) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (formData.reviewText.length < 20) {
      showToast('Review must be at least 20 characters long', 'error');
      return;
    }

    // Create new review
    const newReview = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString(),
      status: 'pending' // pending, approved, rejected
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('moonlight-reviews', JSON.stringify(updatedReviews));

    showToast('Thank you for your review! It will be published after moderation.', 'success');

    // Reset form
    setFormData({
      name: '',
      email: '',
      location: '',
      rating: 5,
      reviewText: '',
      productName: ''
    });
  };

  const approvedReviews = reviews.filter(r => r.status === 'approved');

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '1rem',
        fontSize: '2.5rem',
        color: '#222'
      }}>
        Customer Reviews
      </h1>
      <p style={{
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto 3rem',
        color: '#666',
        fontSize: '1.1rem'
      }}>
        Share your experience with Moonlight Clothings. Your feedback helps us improve and helps others make informed decisions.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 968 ? '1fr 400px' : '1fr',
        gap: '2rem'
      }}>
        {/* Reviews List */}
        <div>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '2rem',
            color: '#222'
          }}>
            ⭐ All Reviews ({approvedReviews.length})
          </h2>

          {approvedReviews.length === 0 ? (
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '3rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#222' }}>
                No Reviews Yet
              </h3>
              <p style={{ color: '#666' }}>
                Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {approvedReviews.map(review => (
                <div
                  key={review.id}
                  style={{
                    backgroundColor: '#fff',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4169E1';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Rating Stars */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '0.25rem',
                      color: '#FFD700',
                      fontSize: '1.2rem'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < review.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#666'
                    }}>
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Product Name */}
                  {review.productName && (
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: '#f0f7ff',
                      color: '#4169E1',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      fontWeight: 'bold'
                    }}>
                      📦 {review.productName}
                    </div>
                  )}

                  {/* Review Text */}
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.7',
                    color: '#444',
                    marginBottom: '1rem'
                  }}>
                    {review.reviewText}
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
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      backgroundColor: '#4169E1',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold'
                    }}>
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: 'bold',
                        color: '#222',
                        marginBottom: '0.25rem'
                      }}>
                        {review.name}
                      </div>
                      {review.location && (
                        <div style={{
                          fontSize: '0.85rem',
                          color: '#666'
                        }}>
                          📍 {review.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div style={{
          position: 'sticky',
          top: '2rem',
          height: 'fit-content'
        }}>
          <div style={{
            backgroundColor: '#fff',
            border: '2px solid #4169E1',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#222'
            }}>
              ✍️ Write a Review
            </h3>
            <p style={{
              color: '#666',
              marginBottom: '2rem',
              fontSize: '0.95rem'
            }}>
              Share your experience with our products and services
            </p>

            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Name */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                  placeholder="john@example.com"
                />
              </div>

              {/* Location */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Location (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                  placeholder="Lagos, Nigeria"
                />
              </div>

              {/* Product Name */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Product Name (Optional)
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                  placeholder="e.g., Covenant Black Kaftan"
                />
              </div>

              {/* Rating */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Rating *
                </label>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  fontSize: '2rem'
                }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{
                        cursor: 'pointer',
                        color: star <= formData.rating ? '#FFD700' : '#ddd',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Your Review * (minimum 20 characters)
                </label>
                <textarea
                  name="reviewText"
                  value={formData.reviewText}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontFamily: 'Arial, sans-serif',
                    resize: 'vertical'
                  }}
                  placeholder="Share your experience with us..."
                />
                <div style={{
                  fontSize: '0.85rem',
                  color: formData.reviewText.length < 20 ? '#DC143C' : '#32CD32',
                  marginTop: '0.5rem'
                }}>
                  {formData.reviewText.length} / 20 characters
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#4169E1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#3a5bc7'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4169E1'}
              >
                Submit Review
              </button>

              <p style={{
                fontSize: '0.85rem',
                color: '#666',
                textAlign: 'center',
                margin: 0
              }}>
                Your review will be moderated before being published
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
