import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillProgressProps {
  name: string;
  percentage: number;
}

export function SkillProgress({ name, percentage }: SkillProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, []);

  // No need for the custom animation with MotionValue since we're using a simpler approach

  const progressVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: `${percentage}%`,
      transition: { 
        duration: 1.5,
        ease: [0.17, 0.55, 0.55, 1]
      }
    }
  };

  // Particle effect for completed bar
  const particleCount = 5;
  const particleColors = [
    "rgb(59, 130, 246)", // blue-500
    "rgb(96, 165, 250)", // blue-400
    "rgb(37, 99, 235)", // blue-600
    "rgb(147, 197, 253)", // blue-300
    "rgb(29, 78, 216)", // blue-700
  ];

  return (
    <div 
      ref={progressRef} 
      className="mb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Name and percentage display */}
      <div className="flex justify-between mb-2 items-center">
        <motion.span 
          className="font-semibold text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, y: 5 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {name}
        </motion.span>
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <motion.span 
            className="font-bold text-blue-600 dark:text-blue-400"
          >
            {Math.round(percentage)}%
          </motion.span>
        </motion.div>
      </div>
      
      {/* Progress bar container */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
        {/* Main progress bar */}
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-full rounded-full relative"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={progressVariants}
          style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
        >
          {/* Shine effect */}
          <motion.div 
            className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{
              left: ["-20%", "120%"],
              transition: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.8,
                repeat: 0,
                repeatType: "loop"
              }
            }}
          />
          
          {/* Particles at end of bar when completed and hovered */}
          <AnimatePresence>
            {isHovered && isVisible && percentage >= 90 && (
              <>
                {[...Array(particleCount)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    initial={{ 
                      x: "95%", 
                      y: "50%", 
                      scale: 0,
                      opacity: 0.8 
                    }}
                    animate={{ 
                      x: `${95 + Math.random() * 15}%`,
                      y: `${Math.random() * 100}%`, 
                      scale: Math.random() * 0.8 + 0.2,
                      opacity: Math.random() * 0.5 + 0.3
                    }}
                    exit={{ 
                      scale: 0, 
                      opacity: 0 
                    }}
                    transition={{
                      duration: 1 + Math.random() * 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    style={{
                      backgroundColor: particleColors[i % particleColors.length],
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      boxShadow: `0 0 6px ${particleColors[i % particleColors.length]}`,
                      translateX: "-50%",
                      translateY: "-50%"
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Pulsing highlight for mastered skills */}
        {percentage >= 90 && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [0.97, 1.01, 0.97] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1.5
            }}
            style={{
              background: "linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0) 100%)",
              pointerEvents: "none"
            }}
          />
        )}
      </div>
      
      {/* Skill level indicator */}
      <motion.div
        className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        {percentage >= 90 ? "Expert" : 
         percentage >= 75 ? "Advanced" : 
         percentage >= 60 ? "Intermediate" : 
         "Beginner"}
      </motion.div>
    </div>
  );
}
