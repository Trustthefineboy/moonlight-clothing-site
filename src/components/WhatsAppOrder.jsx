import React from 'react';

export default function WhatsAppOrder({ productName, phone }) {
  const whatsappNumber = phone || '2348012345678';
  const message = encodeURIComponent(`Hello! I'm interested in ${productName} from Moonlight Clothings. Can you tell me more about it?`);
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 'bold' }}>
      Order via WhatsApp
    </a>
  );
}
