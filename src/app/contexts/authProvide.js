"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState(token);
    }
  }, []);

  const login = (token) => {
    setAuthState(token);
  };

  const logout = () => {
    setAuthState('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
