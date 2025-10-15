import React from 'react';

export default function ProductSkeleton() {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#fff',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Image skeleton */}
      <div style={{
        width: '100%',
        height: 280,
        backgroundColor: '#f0f0f0',
        animation: 'pulse 1.5s ease-in-out infinite'
      }} />
      
      {/* Content skeleton */}
      <div style={{ padding: '1.25rem', flex: 1 }}>
        {/* Title skeleton */}
        <div style={{
          height: '1.5rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '0.75rem',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        
        {/* Description skeleton */}
        <div style={{
          height: '1rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '0.5rem',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.1s'
        }} />
        <div style={{
          height: '1rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '1rem',
          width: '80%',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.2s'
        }} />
        
        {/* Price skeleton */}
        <div style={{
          height: '1.5rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '1rem',
          width: '40%',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.3s'
        }} />
        
        {/* Buttons skeleton */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{
            flex: 1,
            height: '2.5rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.4s'
          }} />
          <div style={{
            flex: 1,
            height: '2.5rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: '0.5s'
          }} />
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
