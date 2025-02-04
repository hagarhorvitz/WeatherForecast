/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { UserModel } from '../Models/UserModel';

interface AuthContextProps {
  user: UserModel | null;
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: UserModel | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1) Initialize token from localStorage
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  // 2) Store the decoded user
  const [user, setUser] = useState<UserModel | null>(null);
  // 3) Whenever token changes, decode the user (or clear it if no token)
  useEffect(() => {
    if (token) {
      try {
        // Example shape: { user: { ...UserModel... } }
        const decodedUser = jwtDecode<{ user: UserModel }>(token).user;
        console.log("AuthContext decodedUser: ", decodedUser);
        setUser(decodedUser);
      } catch (err) {
        console.error('Token decode failed:', err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  // 4) Provide a logout function that clears token + user
  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        setUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Helper hook so we can do: const { user, token, ... } = useAuth()
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
