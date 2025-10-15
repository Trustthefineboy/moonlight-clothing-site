import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div style={{ 
      position: 'relative', 
      maxWidth: '600px', 
      margin: '0 auto 2rem',
      width: '100%'
    }}>
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          🔍
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products by name or description..."
          style={{
            width: '100%',
            padding: '1rem 3rem 1rem 3rem',
            fontSize: '1rem',
            border: '2px solid #e0e0e0',
            borderRadius: '25px',
            outline: 'none',
            transition: 'border-color 0.3s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#FFD700';
            e.target.style.boxShadow = '0 4px 12px rgba(255,215,0,0.2)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e0e0e0';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
          }}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: '#999',
              padding: '0.25rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#333'}
            onMouseOut={(e) => e.currentTarget.style.color = '#999'}
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.9rem',
          color: '#666',
          textAlign: 'center'
        }}>
          Searching for "{searchTerm}"
        </div>
      )}
    </div>
  );
}
