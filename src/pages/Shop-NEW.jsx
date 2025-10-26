import React, { useState, useEffect } from 'react';
import FabricList from '../components/FabricList';
import SearchBar from '../components/SearchBar';

const categories = [
  'The Sacred Fabrics',
  'The Ready-to-Wear Realm',
  "Men's Collection",
  "Women's Collection",
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
      const mobile = window.innerWidth < 1024;
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
  const activeFilterCount = [selectedCategory, selectedGender, selectedType, selectedCulture, selectedColorTheme, selectedStoryTheme, sortBy].filter(Boolean).length;

  return (
    <div style={{
      background: '#fff',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        padding: isMobile ? '3rem 1.5rem 2rem' : '4rem 2rem 3rem',
        textAlign: 'center',
        background: '#fff',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2rem' : '3rem',
          fontWeight: '600',
          marginBottom: '0.75rem',
          color: '#000',
          letterSpacing: '-0.5px'
        }}>
          SHOP ALL
        </h1>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.125rem',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto',
          fontWeight: '300'
        }}>
          Discover our collection of premium African-inspired clothing
        </p>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '1.5rem' : '2rem'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filter Toggle Button - Mobile/Tablet */}
        {isMobile && (
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1.5rem',
              background: '#000',
              color: '#fff',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'background 0.2s'
            }}
          >
            <span>
              FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}
            </span>
            <span style={{
              transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.3s'
            }}>
              ▼
            </span>
          </button>
        )}

        {/* Filters Section - LSKD Style */}
        {(!isMobile || filtersOpen) && (
          <div style={{
            background: '#f8f8f8',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2rem',
            border: '1px solid #e5e5e5'
          }}>
            {/* Clear Filters */}
            {hasActiveFilters && (
              <div style={{
                marginBottom: '1.5rem',
                textAlign: 'right'
              }}>
                <button
                  onClick={clearFilters}
                  style={{
                    background: 'transparent',
                    border: '1px solid #000',
                    color: '#000',
                    padding: '0.5rem 1rem',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#000';
                    e.target.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#000';
                  }}
                >
                  CLEAR ALL
                </button>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: isMobile ? '1.25rem' : '1.5rem'
            }}>
              <style>{`
                .lskd-select {
                  width: 100%;
                  padding: 0.875rem 1rem;
                  border: 1px solid #ddd;
                  background: #fff;
                  color: #000;
                  font-size: 0.875rem;
                  font-weight: 500;
                  outline: none;
                  cursor: pointer;
                  transition: border-color 0.2s;
                  font-family: inherit;
                }
                .lskd-select:focus {
                  border-color: #000;
                }
                .lskd-select option {
                  font-weight: 400;
                }
              `}</style>

              {/* Category */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#000'
                }}>
                  Category
                </label>
                <select
                  className="lskd-select"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#000'
                }}>
                  Gender
                </label>
                <select
                  className="lskd-select"
                  value={selectedGender}
                  onChange={e => setSelectedGender(e.target.value)}
                >
                  <option value="">All Genders</option>
                  {genders.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#000'
                }}>
                  Type
                </label>
                <select
                  className="lskd-select"
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {types.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Culture */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#000'
                }}>
                  Culture
                </label>
                <select
                  className="lskd-select"
                  value={selectedCulture}
                  onChange={e => setSelectedCulture(e.target.value)}
                >
                  <option value="">All Cultures</option>
                  {cultures.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Color Theme */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#000'
                }}>
                  Color
                </label>
                <select
                  className="lskd-select"
                  value={selectedColorTheme}
                  onChange={e => setSelectedColorTheme(e.target.value)}
                >
                  <option value="">All Colors</option>
                  {colorThemes.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Story Theme */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#000'
                }}>
                  Theme
                </label>
                <select
                  className="lskd-select"
                  value={selectedStoryTheme}
                  onChange={e => setSelectedStoryTheme(e.target.value)}
                >
                  <option value="">All Themes</option>
                  {storyThemes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  color: '#000'
                }}>
                  Sort By
                </label>
                <select
                  className="lskd-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
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
    </div>
  );
}
