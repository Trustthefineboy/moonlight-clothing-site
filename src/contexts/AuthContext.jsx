import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('moonlight_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = (email, password, name) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('moonlight_users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password, // In production, this should be hashed on backend
      createdAt: new Date().toISOString(),
      orders: [],
      wishlist: []
    };

    // Save to users array
    users.push(newUser);
    localStorage.setItem('moonlight_users', JSON.stringify(users));

    // Set as current user (without password)
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('moonlight_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const signIn = (email, password) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('moonlight_users') || '[]');
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Set as current user (without password)
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    localStorage.setItem('moonlight_user', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('moonlight_user');
  };

  const updateProfile = (updates) => {
    const users = JSON.parse(localStorage.getItem('moonlight_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('moonlight_users', JSON.stringify(users));
      
      const updatedUser = { ...users[userIndex] };
      delete updatedUser.password;
      
      setUser(updatedUser);
      localStorage.setItem('moonlight_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
