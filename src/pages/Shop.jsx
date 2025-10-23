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
  const [sortBy, setSortBy] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedGender('');
    setSelectedType('');
    setSearchQuery('');
    setSortBy('');
  };

  const hasActiveFilters = selectedCategory || selectedGender || selectedType || searchQuery || sortBy;

  return (
    <div style={{ 
      maxWidth: 1400, 
      margin: '0 auto', 
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3rem)', 
          marginBottom: '1rem',
          color: '#222'
        }}>
          Moonlight Collections
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: '#666',
          maxWidth: '700px',
          margin: '0 auto 1.5rem',
          lineHeight: 1.6,
          fontStyle: 'italic'
        }}>
          "Each Moonlight fabric carries a story, a covenant of creativity. Choose yours — wear your light."
        </p>
      </div>
        borderBottom: '3px solid #FFD700',
        paddingBottom: '1rem'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#222',
          margin: 0,
          marginBottom: '0.5rem'
        }}>
          🛍️ Shop Our Collection
        </h1>
        <p style={{ 
          color: '#666', 
          fontSize: '1.1rem',
          margin: 0
        }}>
          Discover unique African-inspired fashion
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Filters Section */}
      <div style={{ 
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h3 style={{ 
            margin: 0,
            fontSize: '1.2rem',
            color: '#222'
          }}>
            🔍 Filters & Sorting
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                background: 'transparent',
                border: '2px solid #ff4444',
                color: '#ff4444',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ff4444';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ff4444';
              }}
            >
              Clear All Filters
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <style>{`
            select.shop-select {
              padding: 0.75rem 1.25rem;
              border-radius: 8px;
              border: 2px solid #FFD700;
              background: #fff;
              color: #222;
              font-weight: bold;
              transition: all 0.3s;
              box-shadow: 0 2px 8px rgba(34,34,34,0.04);
              outline: none;
              cursor: pointer;
              font-size: 0.95rem;
            }
            select.shop-select:focus, select.shop-select:hover {
              border-color: #222;
              box-shadow: 0 4px 16px rgba(34,34,34,0.12);
              transform: translateY(-2px);
            }
          `}</style>
          
          {/* Category Filter */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              📁 Category
            </label>
            <select 
              className="shop-select" 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              👤 Gender
            </label>
            <select 
              className="shop-select" 
              value={selectedGender} 
              onChange={e => setSelectedGender(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">All Genders</option>
              {genders.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              👕 Type
            </label>
            <select 
              className="shop-select" 
              value={selectedType} 
              onChange={e => setSelectedType(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">All Types</option>
              {types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              🔄 Sort By
            </label>
            <select 
              className="shop-select" 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List */}
      <FabricList filter={{ 
        category: selectedCategory, 
        gender: selectedGender, 
        type: selectedType, 
        search: searchQuery,
        sortBy: sortBy
      }} />
    </div>
  );
}
