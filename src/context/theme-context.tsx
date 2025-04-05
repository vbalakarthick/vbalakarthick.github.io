// This context is no longer used but kept as a placeholder in case we want to revert
// to using React Context API for theme management later.
// Currently, theme handling is done in App.tsx

import { ReactNode } from "react";

// Export the type just for compatibility
export type Theme = "light" | "dark";

interface ThemeProviderProps {
  children: ReactNode;
}

// Simple pass-through provider
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}
