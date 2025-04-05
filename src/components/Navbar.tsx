import { useState, useEffect, useRef } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { Menu, Sun, Moon } from "lucide-react";
import { navLinks } from "../lib/constants";
import { Theme } from "../App";

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeSection = useScrollSpy();
  const stringRef = useRef<HTMLDivElement>(null);
  const bulbRef = useRef<HTMLDivElement>(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  // Custom theme toggle with pull string animation
  const handleThemeToggle = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(true);
    
    // Apply animation classes
    if (stringRef.current) {
      // Animate pull string
      stringRef.current.classList.remove('pull-string-animate', 'pull-string-animate-dark');
      void stringRef.current.offsetWidth; // Force reflow to restart animation
      stringRef.current.classList.add(theme === 'dark' ? 'pull-string-animate' : 'pull-string-animate-dark');
    }
    
    if (bulbRef.current) {
      // Animate bulb
      bulbRef.current.classList.remove('bulb-pulse');
      void bulbRef.current.offsetWidth; // Force reflow to restart animation
      bulbRef.current.classList.add('bulb-pulse');
    }
    
    // Toggle theme after a slight delay to see animation effect
    setTimeout(() => {
      toggleTheme();
      setIsAnimating(false);
    }, 200);
  };

  return (
    <nav className={`fixed top-0 w-full bg-white dark:bg-gray-900 z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="#home" className="text-xl font-heading font-bold text-blue-600 dark:text-blue-400">
            <span className="hidden sm:inline">Portfolio</span>
            <span className="sm:hidden">P.</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link transition-colors duration-200 ${
                  activeSection === link.href.substring(1)
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Pull String Lamp Theme Toggle */}
            <div className="relative w-6 h-10 group cursor-pointer">
              <button
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                onClick={handleThemeToggle}
                className="relative h-full w-full focus:outline-none"
                disabled={isAnimating}
              >
                <div className="relative flex flex-col items-center">
                  {/* Lamp housing */}
                  <div className="w-4 h-2 bg-gray-600 dark:bg-gray-800 rounded-t-lg mb-0.5"></div>
                  
                  {/* Lamp bulb */}
                  <div 
                    ref={bulbRef}
                    className={`w-6 h-6 rounded-full transition-all duration-500 transform ${
                      theme === "dark" 
                        ? "bg-gray-400 dark:bg-gray-700" 
                        : "bg-yellow-300 shadow-[0_0_12px_4px_rgba(253,224,71,0.6)] bulb-flicker"
                    }`}
                  >
                    {/* Light rays when on */}
                    {theme !== "dark" && (
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-yellow-200"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-0.5 h-2 bg-yellow-200"></div>
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-0.5 bg-yellow-200"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-2 h-0.5 bg-yellow-200"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Lamp base */}
                  <div className="w-4 h-1 bg-gray-800 dark:bg-gray-900 rounded-full mx-auto -mt-0.5"></div>
                  
                  {/* Pull string - taller when "off" (dark mode), shorter when "on" (light mode) */}
                  <div 
                    ref={stringRef}
                    className={`w-0.5 bg-gray-400 dark:bg-gray-500 mx-auto relative transition-all duration-300 ${
                      theme === "dark" ? "h-6" : "h-4"
                    } group-hover:h-5`}
                  >
                    {/* String knob */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-400 group-hover:scale-110 transition-transform"></div>
                  </div>
                </div>
              </button>
            </div>
            
            <button
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white dark:bg-gray-900 shadow-md ${isMobileMenuOpen ? "" : "hidden"}`}>
        <div className="container mx-auto px-4 py-3 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block py-2 transition-colors duration-200 ${
                activeSection === link.href.substring(1)
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
