import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCodeDisplay from '../components/QRCodeDisplay';
import WhatsAppOrder from '../components/WhatsAppOrder';
import { productsData } from '../data/productsData';

export default function Fabric() {
  const { id } = useParams();
  const [fabric, setFabric] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find fabric from static data
    const foundFabric = productsData.find(p => p.id === parseInt(id));
    setFabric(foundFabric || null);
    setLoading(false);
  }, [id]);

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading fabric...</div>;
  if (!fabric) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>Fabric not found</h2>
      <Link to="/shop" style={{ color: '#4f8cff' }}>← Back to Shop</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Link to="/shop" style={{ color: '#4f8cff', marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Shop
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <div>
          <img 
            src={fabric.image} 
            alt={fabric.name} 
            style={{ width: '100%', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x600/f5f5f5/666?text=' + encodeURIComponent(fabric.name);
            }}
          />
        </div>
        
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{fabric.name}</h1>
          
          {fabric.proverb && (
            <p style={{
              fontSize: '1rem',
              fontStyle: 'italic',
              color: '#888',
              marginBottom: '1.5rem',
              paddingLeft: '1rem',
              borderLeft: '4px solid #FFD700'
            }}>
              {fabric.proverb}
            </p>
          )}
          
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFD700', marginBottom: '2rem' }}>
            ₦{typeof fabric.price === 'number' ? fabric.price.toLocaleString() : fabric.price}
          </div>
          
          <p style={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: '#666', marginBottom: '2rem' }}>
            {fabric.story}
          </p>
          
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Available Products</h2>
          <ul style={{ marginBottom: '2rem' }}>
            {fabric.products && fabric.products.map((prod, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{prod}</li>
            ))}
          </ul>
          
          <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {fabric.categories && fabric.categories.map((cat, idx) => (
              <span
                key={idx}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}
              >
                {cat}
              </span>
            ))}
          </div>
          
          {/* WhatsApp Order Button */}
          <a
            href={`https://wa.me/${fabric.whatsapp?.replace(/[^0-9]/g, '')}?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(fabric.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#25D366',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '2rem'
            }}
          >
            📱 Order/Enquire on WhatsApp
          </a>
          
          {/* QR Code */}
          <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Share this fabric</h3>
            <QRCodeDisplay url={window.location.href} />
          </div>
        </div>
      </div>
    </div>
  );
}
