"use client"

import React, { createContext, useState, useContext } from "react";



interface AuthContextType {
    isDark: boolean;
    setIsDark: (val: boolean) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;
    isActive: boolean;
    setIsActive:  (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) =>{
    const [isDark, setIsDark] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isActive, setIsActive] = useState(true);

    return (
        <AuthContext.Provider
      value={{ isDark, setIsDark, isLoggedIn, setIsLoggedIn, isActive, setIsActive }}
    >
      {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};