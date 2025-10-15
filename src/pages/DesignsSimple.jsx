import React from 'react';

export default function Designs() {
  return (
    <div style={{ 
      padding: '2rem',
      background: '#f5f7fa',
      minHeight: '80vh',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '2rem',
        color: '#4f8cff',
        marginBottom: '2rem'
      }}>
        Explore Our Designs
      </h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{
          width: '80%',
          maxWidth: '800px',
          padding: '2rem',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>Design Collection 1</h2>
          <div style={{
            width: '200px',
            height: '200px',
            margin: '1rem auto',
            background: '#4f8cff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            Design 1 Image
          </div>
          <p>Premium African fabric with vibrant colors and traditional patterns.</p>
          <button style={{
            background: '#4f8cff',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            marginTop: '1rem',
            cursor: 'pointer'
          }}>
            View Details
          </button>
        </div>
        
        <div style={{
          width: '80%',
          maxWidth: '800px',
          padding: '2rem',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>Design Collection 2</h2>
          <div style={{
            width: '200px',
            height: '200px',
            margin: '1rem auto',
            background: '#4f8cff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            Design 2 Image
          </div>
          <p>Luxurious texture with modern African motifs.</p>
          <button style={{
            background: '#4f8cff',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            marginTop: '1rem',
            cursor: 'pointer'
          }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}