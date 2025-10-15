import React from 'react';

export default function QRCodeDisplay({ url }) {
  // Placeholder for QR code, replace with real QR code generator later
  return (
    <div style={{ margin: '1rem 0' }}>
      <div style={{ width: 120, height: 120, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
        <span>QR Code for<br />{url}</span>
      </div>
    </div>
  );
}
