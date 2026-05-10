import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('nx_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('nx_theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = useCallback(() => setIsDark(d => !d), []);

  const theme = isDark ? {
    bg: '#0A0D0F',
    surface: '#14181B',
    surfaceHover: '#1A1F24',
    border: '#1E2429',
    text: '#EDF0F2',
    textSecondary: '#8A949E',
    accent: '#0B6B5C',
    accentLight: '#34D399',
    cardGradient: 'linear-gradient(145deg, #14181B, #1A1F24)',
    incomeBg: '#0B6B5C',
    incomeText: '#FFFFFF',
    expenseBg: '#1A1F24',
    expenseText: '#EDF0F2',
    goalBg: '#14181B',
    navBg: 'rgba(10, 13, 15, 0.85)',
    inputBg: '#14181B',
    inputBorder: '#1E2429',
    inputFocus: '#0B6B5C',
  } : {
    bg: '#F8FAF9',
    surface: '#FFFFFF',
    surfaceHover: '#F5F7F6',
    border: '#E8ECEA',
    text: '#111815',
    textSecondary: '#6B7B74',
    accent: '#0B6B5C',
    accentLight: '#0D8570',
    cardGradient: '#FFFFFF',
    incomeBg: '#0B6B5C',
    incomeText: '#FFFFFF',
    expenseBg: '#F5F7F6',
    expenseText: '#111815',
    goalBg: '#FFFFFF',
    navBg: 'rgba(248, 250, 249, 0.85)',
    inputBg: '#FFFFFF',
    inputBorder: '#E0E5E2',
    inputFocus: '#0B6B5C',
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
