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
const cultures = ['Yoruba', 'Pan-African'];
const colorThemes = ['Black', 'White', 'Indigo', 'Gold'];
const storyThemes = ['Covenant', 'Legacy'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCulture, setSelectedCulture] = useState('');
  const [selectedColorTheme, setSelectedColorTheme] = useState('');
  const [selectedStoryTheme, setSelectedStoryTheme] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setFiltersOpen(true); // Always show filters on desktop
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedGender('');
    setSelectedType('');
    setSelectedCulture('');
    setSelectedColorTheme('');
    setSelectedStoryTheme('');
    setSearchQuery('');
    setSortBy('');
  };

  const hasActiveFilters = selectedCategory || selectedGender || selectedType || selectedCulture || selectedColorTheme || selectedStoryTheme || searchQuery || sortBy;

  return (
    <div style={{ 
      maxWidth: 1400, 
      margin: '0 auto', 
      padding: isMobile ? '1rem' : '2rem'
    }}>
      {/* Header */}
      <div style={{ 
        marginBottom: isMobile ? '1.5rem' : '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(1.75rem, 5vw, 3rem)', 
          marginBottom: '0.75rem',
          color: '#222'
        }}>
          Moonlight Collections
        </h1>
        <p style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.3rem)',
          color: '#666',
          maxWidth: '700px',
          margin: '0 auto 1.5rem',
          lineHeight: 1.6,
          fontStyle: 'italic',
          padding: isMobile ? '0 0.5rem' : '0'
        }}>
          "Each Moonlight fabric carries a story, a covenant of creativity. Choose yours — wear your light."
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Mobile Filter Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          style={{
            width: '100%',
            padding: '1rem',
            marginBottom: '1rem',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s'
          }}
        >
          <span>🔍 Filters & Sorting {hasActiveFilters && `(${Object.values({ selectedCategory, selectedGender, selectedType, selectedCulture, selectedColorTheme, selectedStoryTheme, sortBy }).filter(Boolean).length})`}</span>
          <span style={{ 
            fontSize: '1.2rem',
            transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s'
          }}>▼</span>
        </button>
      )}

      {/* Filters Section */}
      {(!isMobile || filtersOpen) && (
        <div style={{ 
          backgroundColor: '#f8f9fa',
          padding: isMobile ? '1rem' : '1.5rem',
          borderRadius: '12px',
          marginBottom: isMobile ? '1rem' : '2rem',
          border: '1px solid #e0e0e0',
          animation: isMobile && filtersOpen ? 'slideDown 0.3s ease-out' : 'none'
        }}>
          <style>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {!isMobile && (
              <h3 style={{ 
                margin: 0,
                fontSize: '1.2rem',
                color: '#222'
              }}>
                🔍 Filters & Sorting
              </h3>
            )}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{
                  background: 'transparent',
                  border: '2px solid #ff4444',
                  color: '#ff4444',
                  padding: isMobile ? '0.6rem 1.2rem' : '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.95rem' : '0.9rem',
                  transition: 'all 0.3s',
                  width: isMobile ? '100%' : 'auto'
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
        
        <div style={{ display: 'flex', gap: isMobile ? '0.75rem' : '1rem', flexWrap: 'wrap' }}>
          <style>{`
            select.shop-select {
              padding: ${isMobile ? '0.85rem 1rem' : '0.75rem 1.25rem'};
              border-radius: 8px;
              border: 2px solid #FFD700;
              background: #fff;
              color: #222;
              font-weight: bold;
              transition: all 0.3s;
              box-shadow: 0 2px 8px rgba(34,34,34,0.04);
              outline: none;
              cursor: pointer;
              font-size: ${isMobile ? '1rem' : '0.95rem'};
            }
            select.shop-select:focus, select.shop-select:hover {
              border-color: #222;
              box-shadow: 0 4px 16px rgba(34,34,34,0.12);
              transform: translateY(-2px);
            }
          `}</style>
          
          {/* Category Filter */}
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : '200px' }}>
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
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : '150px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: isMobile ? '0.95rem' : '0.9rem',
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
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : '150px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: isMobile ? '0.95rem' : '0.9rem',
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
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : '200px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: isMobile ? '0.95rem' : '0.9rem',
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

          {/* Culture Filter */}
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : '180px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: isMobile ? '0.95rem' : '0.9rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              🌍 Culture
            </label>
            <select 
              className="shop-select" 
              value={selectedCulture} 
              onChange={e => setSelectedCulture(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">All Cultures</option>
              {cultures.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Color Theme Filter */}
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : '180px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: isMobile ? '0.95rem' : '0.9rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              🎨 Color Theme
            </label>
            <select 
              className="shop-select" 
              value={selectedColorTheme} 
              onChange={e => setSelectedColorTheme(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">All Colors</option>
              {colorThemes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Story Theme Filter */}
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : '180px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              📖 Story Theme
            </label>
            <select 
              className="shop-select" 
              value={selectedStoryTheme} 
              onChange={e => setSelectedStoryTheme(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="">All Themes</option>
              {storyThemes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        </div>
      )}

      {/* Product List */}
      <FabricList filter={{ 
        category: selectedCategory, 
        gender: selectedGender, 
        type: selectedType, 
        culture: selectedCulture,
        colorTheme: selectedColorTheme,
        storyTheme: selectedStoryTheme,
        search: searchQuery,
        sortBy: sortBy
      }} />
    </div>
  );
}
