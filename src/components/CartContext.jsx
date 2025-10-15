import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Helper function to get initial cart state from localStorage
const getInitialCart = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const savedCart = localStorage.getItem('moonlight_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getInitialCart);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('moonlight_cart', JSON.stringify(cart));
    }
  }, [cart]);
  
  // Listen for custom add-to-cart events (used for cart manipulation in components)
  useEffect(() => {
    const handleAddToCartEvent = (event) => {
      addToCart(event.detail);
    };
    
    document.addEventListener('add-to-cart', handleAddToCartEvent);
    
    return () => {
      document.removeEventListener('add-to-cart', handleAddToCartEvent);
    };
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    // Check if same product (but different cartId) is already in cart
    const existingItemIndex = cart.findIndex(
      cartItem => cartItem.id === item.id && 
                 cartItem.selectedColor === item.selectedColor &&
                 cartItem.selectedSize === item.selectedSize
    );
    
    if (existingItemIndex >= 0) {
      // If same product exists, update quantity instead of adding new item
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity || 1) + (item.quantity || 1);
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, item]);
    }
  };
  
  // Remove item from cart by cartId
  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };
  
  // Update item quantity
  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return;
    
    setCart(cart.map(item => 
      item.cartId === cartId ? { ...item, quantity } : item
    ));
  };
  
  // Update item color or size
  const updateItemOption = (cartId, option, value) => {
    setCart(cart.map(item => 
      item.cartId === cartId ? { ...item, [option]: value } : item
    ));
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      updateItemOption,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
