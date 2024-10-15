import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const login = async (username, password) => {
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      setIsAuthenticated(true);
      setError('');
      console.log('Login successful:', data); // Handle successful login (store token, etc.)
    } else {
      setError(data.error_msg || 'Login failed'); // Capture and set the error message
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
