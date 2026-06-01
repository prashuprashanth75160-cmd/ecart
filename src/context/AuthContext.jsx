import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate reading logged in user from localStorage
    const savedUser = localStorage.getItem('ecart_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error("Please enter all fields."));
          return;
        }
        
        // Simulating a success login
        const loggedUser = {
          name: email.split('@')[0].toUpperCase(),
          email: email,
          joined: '2026-06-01'
        };
        
        setUser(loggedUser);
        localStorage.setItem('ecart_user', JSON.stringify(loggedUser));
        resolve(loggedUser);
      }, 800); // realistic delay
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !password) {
          reject(new Error("Please enter all fields."));
          return;
        }
        const newUser = {
          name: name,
          email: email,
          joined: new Date().toISOString().split('T')[0]
        };
        setUser(newUser);
        localStorage.setItem('ecart_user', JSON.stringify(newUser));
        resolve(newUser);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecart_user');
  };

  const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email) {
          reject(new Error("Please enter email."));
          return;
        }
        resolve("Password reset link has been sent to your email!");
      }, 800);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
