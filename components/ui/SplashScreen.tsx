'use client';

import { useEffect, useState } from 'react';

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen immediately after hydration
    setTimeout(() => {
      setVisible(false);
    }, 300);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-[1000] transition-opacity duration-500">
      <img
        src="/oleksandrp_logo.webp"
        alt="Logo"
        className="h-24 w-24 animate-spin-slow"
      />
    </div>
  );
} 