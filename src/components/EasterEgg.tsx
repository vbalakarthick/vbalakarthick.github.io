import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [comboProgress, setComboProgress] = useState<string[]>([]);
  const secretCombo = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add current key to the progress array
      const newProgress = [...comboProgress, e.key];
      
      // Check if the new progress matches the secret combo so far
      const isCorrectSoFar = newProgress.every((key, index) => 
        index >= newProgress.length - secretCombo.length && 
        key === secretCombo[index - (newProgress.length - secretCombo.length)]
      );
      
      // If the keys don't match the pattern, reset progress
      if (!isCorrectSoFar) {
        setComboProgress([]);
        return;
      }
      
      setComboProgress(newProgress);
      
      // Check if the complete combo has been entered
      const lastKeysEntered = newProgress.slice(-secretCombo.length);
      const isFullCombo = lastKeysEntered.every((key, index) => key === secretCombo[index]);
      
      if (isFullCombo && lastKeysEntered.length === secretCombo.length) {
        // Trigger easter egg
        setIsActive(true);
        
        // Reset progress and hide easter egg after 10 seconds
        setComboProgress([]);
        setTimeout(() => setIsActive(false), 10000);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [comboProgress]);
  
  // Configure particle animation
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    velocityX: (Math.random() - 0.5) * 10,
    velocityY: (Math.random() - 0.5) * 10,
    rotation: Math.random() * 360,
    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
  }));
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
              }}
              initial={{ 
                x: window.innerWidth / 2, 
                y: window.innerHeight / 2,
                opacity: 0,
                rotate: 0 
              }}
              animate={{ 
                x: [window.innerWidth / 2, particle.x, particle.x + particle.velocityX * 20],
                y: [window.innerHeight / 2, particle.y, particle.y + particle.velocityY * 20],
                opacity: [0, 1, 0],
                rotate: [0, particle.rotation, particle.rotation * 2],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                ease: "easeOut",
                times: [0, 0.2, 1] 
              }}
            />
          ))}
          
          {/* Secret message */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-6 rounded-lg shadow-xl max-w-lg text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.5 
            }}
          >
            <motion.h2 
              className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              🎮 You found the secret!
            </motion.h2>
            <motion.p 
              className="mb-4 text-gray-700 dark:text-gray-300"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Congratulations! You've discovered the Konami Code easter egg. You're officially a gaming legend now!
            </motion.p>
            <motion.div
              className="text-5xl mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.2, 1],
                opacity: 1,
              }}
              transition={{ 
                delay: 1.2,
                duration: 0.8,
                times: [0, 0.6, 1]
              }}
            >
              🏆 👾 🎮
            </motion.div>
            <motion.div
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              This will disappear in a few seconds...
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}