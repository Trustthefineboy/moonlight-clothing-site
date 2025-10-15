import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

// This will be updated with your images and descriptions
const designsData = [
  {
    id: 1,
    name: "Design Collection 1",
    description: "Premium African fabric with vibrant colors and traditional patterns. Perfect for special occasions and elegant outfits.",
    image: "/images/design1.svg",
    products: ["Shirts", "Two pieces", "Kaftan"],
    price: "₦15,000 - ₦25,000"
  },
  {
    id: 2,
    name: "Design Collection 2",
    description: "Luxurious texture with modern African motifs, combining tradition with contemporary fashion trends.",
    image: "/images/design2.svg",
    products: ["Palazzo casual trousers", "Shirts"],
    price: "₦18,000 - ₦30,000"
  },
  {
    id: 3,
    name: "Premium Collection",
    description: "Our signature collection featuring hand-crafted designs that tell stories of heritage and culture.",
    image: "/images/design3.svg",
    products: ["Complete outfits", "Ceremonial wear"],
    price: "₦25,000 - ₦45,000"
  }
];

export default function Designs() {
  const [selectedDesign, setSelectedDesign] = useState(null);
  
  const openDesignDetail = (design) => {
    setSelectedDesign(design);
  };
  
  const closeDesignDetail = () => {
    setSelectedDesign(null);
  };
  
  return (
    <div style={{ 
      padding: '2rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        textAlign: 'center',
        color: '#222',
        marginBottom: '2rem'
      }}>
        Explore Our Designs
      </h1>
      
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center'
      }}>
        {designsData.map(design => (
          <div 
            key={design.id} 
            style={{ 
              width: '300px',
              background: '#fff',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => openDesignDetail(design)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img 
              src={design.image} 
              alt={design.name}
              style={{ 
                width: '100%', 
                height: '200px',
                objectFit: 'cover'
              }} 
            />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{design.name}</h3>
              <p>{design.description.substring(0, 100)}...</p>
              <div style={{ 
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 'bold' }}>{design.price}</span>
                <button 
                  style={{ 
                    background: '#4f8cff',
                    color: '#fff',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Design Detail Modal */}
      {selectedDesign && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            padding: '2rem'
          }}>
            <button 
              onClick={closeDesignDetail}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <h2>{selectedDesign.name}</h2>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <img 
                  src={selectedDesign.image} 
                  alt={selectedDesign.name}
                  style={{ 
                    width: '300px', 
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }} 
                />
                
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{selectedDesign.description}</p>
                  
                  <h4>Available Products:</h4>
                  <ul>
                    {selectedDesign.products.map((product, idx) => (
                      <li key={idx}>{product}</li>
                    ))}
                  </ul>
                  
                  <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '1rem' }}>
                    Price Range: {selectedDesign.price}
                  </p>
                  
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <a 
                      href={`https://wa.me/2348168279958?text=Hello! I'm interested in the ${selectedDesign.name} from Moonlight Clothings.`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#25D366',
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}
                    >
                      Order via WhatsApp
                    </a>
                    
                    <Link 
                      to="/cart" 
                      style={{
                        background: '#4f8cff',
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem' }}>
                <h3>Scan QR Code for this Design</h3>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    borderRadius: '8px'
                  }}>
                    <QRCode 
                      value={`http://localhost:5173/designs/${selectedDesign.id}`}
                      size={120}
                      level="H"
                    />
                  </div>
                  <div>
                    <p>Scan this code to view more details or share with others.</p>
                    <p>You can also download this QR code to include on physical products.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}