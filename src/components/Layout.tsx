import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Theme } from "../App";
import { PageTransition } from "./PageTransition";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";
import { EasterEgg } from "./EasterEgg";

interface LayoutProps {
  children?: ReactNode;
  theme: Theme;
  toggleTheme: () => void;
}

export function Layout({ children, theme, toggleTheme }: LayoutProps) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [showHint, setShowHint] = useState(false);

  // Skip the initial animation on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstRender(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Show easter egg hint after 2 minutes on the site
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(true);
      // Hide the hint after 10 seconds
      setTimeout(() => setShowHint(false), 10000);
    }, 120000);
    
    return () => clearTimeout(hintTimer);
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300 min-h-screen overflow-hidden">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      {/* Easter Egg Integration */}
      <EasterEgg />
      
      {/* Subtle hint about the easter egg */}
      {showHint && (
        <motion.div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg text-xs text-blue-800 dark:text-blue-200 z-50 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Psst! Try the Konami Code... (↑↑↓↓←→←→ba)
        </motion.div>
      )}
      
      <motion.main
        initial={isFirstRender ? false : "initial"}
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="relative z-10"
      >
        <PageTransition>
          {children}
        </PageTransition>
      </motion.main>
      <Footer />
    </div>
  );
}
