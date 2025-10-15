import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCodeDisplay from '../components/QRCodeDisplay';
import WhatsAppOrder from '../components/WhatsAppOrder';

export default function Fabric() {
  const { id } = useParams();
  const [fabric, setFabric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/fabrics/${id}`)
      .then(res => res.json())
      .then(data => {
        setFabric(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load fabric');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading fabric...</div>;
  if (error) return <div>{error}</div>;
  if (!fabric) return <div>Fabric not found.</div>;

  return (
    <div>
      <h1>{fabric.name}</h1>
      <img src={fabric.image} alt={fabric.name} style={{ width: 320, borderRadius: 8 }} />
      <p style={{ whiteSpace: 'pre-line' }}>{fabric.story}</p>
      <h2>Available Products</h2>
      <ul>
        {fabric.products && fabric.products.map((prod, idx) => (
          <li key={idx}>{prod}</li>
        ))}
      </ul>
      <h2>Shop Categories</h2>
      <ul>
        {fabric.categories && fabric.categories.map((cat, idx) => (
          <li key={idx}>{cat}</li>
        ))}
      </ul>
      <QRCodeDisplay url={window.location.href} />
      <h2>Order/Contact</h2>
      <WhatsAppOrder productName={fabric.name} phone={fabric.whatsapp} />
      {fabric.whatsapp && (
        <p>WhatsApp: <a href={`https://wa.me/${fabric.whatsapp.replace('+','')}`} target="_blank" rel="noopener noreferrer">{fabric.whatsapp}</a></p>
      )}
    </div>
  );
}
