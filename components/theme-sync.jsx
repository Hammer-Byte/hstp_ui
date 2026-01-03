'use client';

import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ThemeSync() {
  const { setTheme } = useTheme();
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (mode) {
      setTheme(mode);
    }
  }, [mode, setTheme]);

  return null;
}
