import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
   const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) ?? true
  );

  // Save to localStorage + update Tailwind "dark" class
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const [savedCountries, setSavedCountries] = useState(
    JSON.parse(localStorage.getItem("savedCountries")|| "[]")
  );
  // Sync savedCountries with localStorage
  useEffect(() => {
    localStorage.setItem('savedCountries', JSON.stringify(savedCountries))
  
   
  }, [savedCountries]);
  

  return (
   <AppContext.Provider value={{ isDarkMode, setIsDarkMode, savedCountries, setSavedCountries }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
