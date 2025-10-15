import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{
      position: 'fixed',
      top: '5rem',
      right: '1rem',
      zIndex: 20000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '400px'
    }}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }) {
  const typeStyles = {
    success: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '✓'
    },
    error: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '✕'
    },
    info: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: 'ℹ'
    },
    warning: {
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '⚠'
    }
  };

  const style = typeStyles[toast.type] || typeStyles.success;

  return (
    <div style={{
      background: style.background,
      color: 'white',
      padding: '1rem 1.25rem',
      borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      animation: 'slideInRight 0.3s ease-out',
      minWidth: '300px',
      cursor: 'pointer'
    }}
    onClick={onClose}
    >
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        background: 'rgba(255, 255, 255, 0.2)',
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {style.icon}
      </div>
      
      <div style={{ flex: 1, fontWeight: '500', fontSize: '0.95rem' }}>
        {toast.message}
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          color: 'white',
          fontSize: '1.25rem',
          width: '1.75rem',
          height: '1.75rem',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        ×
      </button>
      
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
