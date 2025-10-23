import React from 'react';

export default function QRCodeDisplay({ url }) {
  // Using QR Server API to generate QR code image
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  
  return (
    <div style={{ 
      margin: '1rem 0', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img 
        src={qrCodeUrl} 
        alt={`QR Code for ${url}`}
        style={{ 
          width: '200px', 
          height: '200px',
          border: '2px solid #e0e0e0',
          borderRadius: '8px',
          padding: '0.5rem',
          backgroundColor: '#fff'
        }}
      />
    </div>
  );
}
