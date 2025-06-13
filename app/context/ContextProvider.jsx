"use client";
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}

function ContextProvider({ children }) {
  const [wordCount, setWordCount] = useState(10);
   const [wpm, setWpm] = useState(0);
  const [netWpm, setNetWpm] = useState(0);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      username: '',
      confirmPassword: ''
    });
  return (
    <AppContext.Provider value={{
        wordCount,
        setWordCount,
        wpm, setWpm,
        netWpm, setNetWpm,
        formData, setFormData
     }}>
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
