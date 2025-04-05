import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ContactSection } from "./components/sections/ContactSection";
import { CustomCursor } from "./components/CustomCursor";
import { Toaster } from "@/components/ui/toaster";

// Define theme type
export type Theme = "light" | "dark";

function App() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme on component mount
  useEffect(() => {
    // Get theme from localStorage or use system preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    let initialTheme: Theme;
    
    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      // Check system preference
      initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light";
    }
    
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  // Update theme class and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
    
    // Update document class
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, mounted]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  // Wait until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="hidden">Loading theme...</div>;
  }

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <CustomCursor />
      <Layout 
        theme={theme} 
        toggleTheme={toggleTheme}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </Layout>
      <Toaster />
    </div>
  );
}

export default App;
