import React, { useState, useEffect } from 'react';
import FabricList from '../components/FabricList';
import SearchBar from '../components/SearchBar';

const categories = [
  'The Sacred Fabrics',
  'The Ready-to-Wear Realm',
  'Men’s Collection',
  'Women’s Collection',
  'Unisex Divine Fits',
  'Limited Drop Series',
  'The Archive Pieces',
  'The Capsule Editions',
  'Custom & Made-to-Order',
  'Accessories of Light',
];

const genders = ['Men', 'Women', 'Unisex'];
const types = ['Shirts', 'Two pieces', 'Kaftan', 'Palazzo casual trousers'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <h1>Shop</h1>
      
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <style>{`
          select.shop-select {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 2px solid #FFD700;
            background: #fff;
            color: #222;
            font-weight: bold;
            transition: box-shadow 0.2s, border-color 0.2s;
            box-shadow: 0 2px 8px rgba(34,34,34,0.04);
            outline: none;
          }
          select.shop-select:focus, select.shop-select:hover {
            border-color: #222;
            box-shadow: 0 4px 16px rgba(34,34,34,0.12);
          }
        `}</style>
        <select className="shop-select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select className="shop-select" value={selectedGender} onChange={e => setSelectedGender(e.target.value)}>
          <option value="">All Genders</option>
          {genders.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select className="shop-select" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
          <option value="">All Types</option>
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <FabricList filter={{ category: selectedCategory, gender: selectedGender, type: selectedType, search: searchQuery }} />
    </div>
  );
}
