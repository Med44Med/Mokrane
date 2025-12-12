import { useState, useEffect, useCallback } from 'react';

// Utility function to safely get item from localStorage and parse it
function getSavedValue(key, initialValue) {
  if (typeof window === 'undefined') return initialValue; // Handle SSR

  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
  }
  
  return initialValue instanceof Function ? initialValue() : initialValue;
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  // Use useEffect to update localStorage whenever the state changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') { // Ensure running in browser
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  // Optional: Add functionality to sync changes across different tabs/windows
  const handleStorageChange = useCallback((event) => {
    if (event.key === key && event.newValue !== null) {
      try {
        setValue(JSON.parse(event.newValue));
      } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
      }
    }
  }, [key]);

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [handleStorageChange]);

  return [value, setValue];
}
