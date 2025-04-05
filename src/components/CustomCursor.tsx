import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
  life: number;
  maxLife: number;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMoving, setIsMoving] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const particleIdRef = useRef(0);
  const lastParticleTimeRef = useRef(0);
  
  // Create new particles based on mouse movement
  const createParticles = (x: number, y: number, count: number) => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 8 + 2;
      const velocityFactor = Math.random() * 2 + 1;
      const angle = Math.random() * Math.PI * 2;
      
      // Color variations - blues to purples
      const hue = Math.floor(Math.random() * 40) + 220; // 220-260 range (blues to purples)
      const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
      const lightness = Math.floor(Math.random() * 20) + 50; // 50-70%
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.2})`;
      
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        size,
        color,
        velocity: {
          x: Math.cos(angle) * velocityFactor,
          y: Math.sin(angle) * velocityFactor
        },
        life: 0,
        maxLife: Math.random() * 20 + 10
      });
    }
    
    return newParticles;
  };
  
  // Update particles position and life
  const updateParticles = () => {
    setParticles(prevParticles => {
      return prevParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          size: particle.size * 0.95, // Shrink particle over time
          life: particle.life + 1,
          velocity: {
            x: particle.velocity.x * 0.97, // Slow down x velocity
            y: particle.velocity.y * 0.97 + 0.1 // Slow down y velocity + add gravity
          }
        }))
        .filter(particle => particle.life < particle.maxLife && particle.size > 0.5);
    });
    
    animationFrameRef.current = requestAnimationFrame(updateParticles);
  };
  
  useEffect(() => {
    // Start the particle animation loop
    animationFrameRef.current = requestAnimationFrame(updateParticles);
    
    // Clean up animation frame on unmount
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Calculate distance moved
      const dx = newPosition.x - lastPositionRef.current.x;
      const dy = newPosition.y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Set moving state based on distance
      setIsMoving(distance > 5);
      
      // Add particles based on movement
      if (distance > 5 && now - lastParticleTimeRef.current > 50) {
        const particleCount = Math.min(Math.floor(distance / 10), 3);
        const newParticles = createParticles(e.clientX, e.clientY, particleCount);
        setParticles(prevParticles => [...prevParticles, ...newParticles]);
        lastParticleTimeRef.current = now;
      }
      
      lastPositionRef.current = newPosition;
    };

    // Add event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Add event listeners for hover over clickable elements
    const clickableElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    const handleElementEnter = () => setCursorVariant("hover");
    const handleElementLeave = () => setCursorVariant("default");
    
    clickableElements.forEach((element) => {
      element.addEventListener("mouseenter", handleElementEnter);
      element.addEventListener("mouseleave", handleElementLeave);
    });

    // Clean up event listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      
      clickableElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleElementEnter);
        element.removeEventListener("mouseleave", handleElementLeave);
      });
      
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const variants = {
    default: {
      height: 30,
      width: 30,
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      backgroundColor: "rgba(59, 130, 246, 0)",
      border: "2px solid rgba(59, 130, 246, 0.5)",
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    hover: {
      height: 50,
      width: 50,
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      border: "2px solid rgba(59, 130, 246, 0.7)",
      transition: {
        type: "spring",
        mass: 0.6
      }
    }
  };

  const cursorDotVariants = {
    default: {
      x: mousePosition.x - 2.5,
      y: mousePosition.y - 2.5,
      scale: isMoving ? 0.6 : 1,
      opacity: 1,
      transition: {
        type: "spring",
        mass: 0.1
      }
    },
    hover: {
      x: mousePosition.x - 2.5,
      y: mousePosition.y - 2.5,
      scale: 1.5,
      opacity: 0.7,
      transition: {
        type: "spring",
        mass: 0.1
      }
    }
  };

  // Only show custom cursor on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        animate={cursorVariant}
        variants={variants}
      />
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full bg-blue-500 pointer-events-none z-[9999] hidden md:block"
        animate={cursorVariant}
        variants={cursorDotVariants}
      />
      
      {/* Trailing particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            left: 0,
            top: 0,
            x: particle.x,
            y: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 1 - particle.life / particle.maxLife,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
          initial={{ opacity: 0.8, scale: 0 }}
          animate={{ opacity: 1 - particle.life / particle.maxLife, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        />
      ))}
      
      {/* Glow effect that follows cursor with a delay */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] hidden md:block"
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y - 50,
          opacity: 0.1,
        }}
        transition={{
          type: "spring",
          mass: 1,
          damping: 20,
          stiffness: 100,
          delay: 0.1
        }}
        style={{
          width: 100,
          height: 100,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)"
        }}
      />
    </>
  );
}
