import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';
import Leaderboard from '../pages/Leaderboard';

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
  const [quizUser, setQuizUser] = useState("");
  const [quizRegion, setQuizRegion] = useState("Europe");
  const [quizScore, setQuizScore] = useState(null);

  const [leaderboard, setLeaderboard] = useState(JSON.parse(localStorage.getItem("leaderboard") || "[]"));

  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  return (
   <AppContext.Provider 
    value={{ 
      isDarkMode, setIsDarkMode, 
      savedCountries, setSavedCountries,
      quizUser, setQuizUser,
      quizRegion, setQuizRegion,
      quizScore, setQuizScore,
      leaderboard, setLeaderboard
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
