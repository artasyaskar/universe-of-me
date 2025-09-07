import { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';

type ThemeMode = 'galaxy' | 'neon' | 'minimal';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => (localStorage.getItem('uom-theme') as ThemeMode) || 'galaxy');

  useEffect(() => {
    localStorage.setItem('uom-theme', mode);
    const root = document.documentElement;
    root.classList.remove('theme-galaxy', 'theme-neon', 'theme-minimal');
    root.classList.add(`theme-${mode}`);
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}


