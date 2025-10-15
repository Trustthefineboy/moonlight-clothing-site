import React from 'react';
import { Link } from 'react-router-dom';

// Simple design data with SVG placeholders
const designsData = [
  {
    id: 1,
    name: "Design Collection 1",
    description: "Premium African fabric with vibrant colors and traditional patterns.",
    image: "/images/design1.svg"
  },
  {
    id: 2,
    name: "Design Collection 2",
    description: "Luxurious texture with modern African motifs.",
    image: "/images/design2.svg"
  },
  {
    id: 3,
    name: "Premium Collection",
    description: "Our signature collection featuring hand-crafted designs.",
    image: "/images/design3.svg"
  }
];

export default function Designs() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Explore Our Designs</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '2rem' }}>
        {designsData.map(design => (
          <div key={design.id} style={{ width: '300px', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
            <img src={design.image} alt={design.name} style={{ width: '100%', height: 'auto' }} />
            <h3>{design.name}</h3>
            <p>{design.description}</p>
            <Link to={`/fabric/${design.id}`}>
              <button style={{ background: '#4f8cff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}