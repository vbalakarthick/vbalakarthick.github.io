import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, useInView } from 'framer-motion';

/**
 * Custom hook for creating parallax scrolling effects based on an element's position in the viewport
 */
export function useParallax(range: number = 100, springConfig = { stiffness: 400, damping: 90 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  
  // Update measurements on resize or scroll
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const updatePosition = () => {
      const rect = element.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setClientHeight(window.innerHeight);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);
  
  // Calculate scroll progress for the element
  const { scrollY } = useScroll();
  
  // Create a motion value for the parallax effect
  const transformInitialValue = elementTop - clientHeight;
  const transformFinalValue = elementTop + range;

  const yRangeOutput = [-range, range];
  
  // The raw progress of the parallax effect
  const yProgress = useTransform(
    scrollY,
    [transformInitialValue, transformFinalValue],
    yRangeOutput
  );
  
  // Apply spring physics for smoother motion
  const y = useSpring(yProgress, springConfig);
  
  return { ref, y };
}

/**
 * Custom hook for revealing elements as they come into view with a parallax effect
 */
export function useParallaxReveal(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50,
  springConfig = { stiffness: 300, damping: 30 },
  delay: number = 0,
  threshold: number = 0.1
) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: threshold, once: false });
  const [hasBeenInView, setHasBeenInView] = useState(false);
  
  // Track when element comes into view
  useEffect(() => {
    if (inView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [inView, hasBeenInView]);
  
  // Track element visibility
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Set direction-based transform
  let transformProperty: any = {};
  switch (direction) {
    case 'up':
      transformProperty.y = useTransform(scrollYProgress, [0, 0.5, 1], [distance, 0, distance/4]);
      break;
    case 'down':
      transformProperty.y = useTransform(scrollYProgress, [0, 0.5, 1], [-distance, 0, -distance/4]);
      break;
    case 'left':
      transformProperty.x = useTransform(scrollYProgress, [0, 0.5, 1], [distance, 0, distance/4]);
      break;
    case 'right':
      transformProperty.x = useTransform(scrollYProgress, [0, 0.5, 1], [-distance, 0, -distance/4]);
      break;
  }
  
  // Apply opacity based on scroll progress with a more refined curve
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Apply scale effect for more dynamic reveal
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);
  
  // Apply spring physics for smoother motion
  const springY = transformProperty.y ? useSpring(transformProperty.y, springConfig) : undefined;
  const springX = transformProperty.x ? useSpring(transformProperty.x, springConfig) : undefined;
  const springOpacity = useSpring(opacity, springConfig);
  const springScale = useSpring(scale, springConfig);
  
  // Create style object without the transition property (will use framer-motion's transition prop instead)
  const style = {
    y: springY,
    x: springX,
    opacity: springOpacity,
    scale: springScale
  };
  
  // Extra prop for component to use in its own transition
  const transitionConfig = { delay };
  
  return { ref, style, transitionConfig, inView, hasBeenInView };
}

/**
 * Custom hook for creating a parallax background effect
 */
export function useParallaxBackground(speed: number = 0.5): MotionValue<string> {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to background position
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `${speed * 100}%`]
  );
  
  // Format as CSS background-position property
  const backgroundY = useTransform(y, latest => `50% ${latest}`);
  
  return backgroundY;
}

/**
 * Custom hook for creating 3D tilt effect on elements
 */
export function useParallaxTilt(sensitivity: number = 15) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to element center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate tilt based on mouse position
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Map to tilt range and invert Y axis
    const newTiltX = -(mouseY / (rect.height / 2)) * sensitivity;
    const newTiltY = (mouseX / (rect.width / 2)) * sensitivity;
    
    // Update tilt values
    setTiltX(newTiltX);
    setTiltY(newTiltY);
  };
  
  // Handle mouse enter/leave
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset tilt on mouse leave
    setTiltX(0);
    setTiltY(0);
  };
  
  // Add/remove event listeners
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  // Create spring-based motion for smoother tilting
  const springConfig = { stiffness: 300, damping: 30 };
  const springTiltX = useSpring(tiltX, springConfig);
  const springTiltY = useSpring(tiltY, springConfig);
  
  // The resulting style for 3D transformation
  const style = {
    transform: isHovering ? `perspective(1000px) rotateX(${springTiltX}deg) rotateY(${springTiltY}deg) scale3d(1.05, 1.05, 1.05)` : 
                         `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: isHovering ? 'none' : 'transform 0.5s ease-out'
  };
  
  return { ref, style, isHovering };
}

/**
 * Custom hook for creating mouse-follow parallax effect
 */
export function useMouseParallax(depth: number = 20, ease: number = 0.1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };
    
    // Set initial window size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to window center
      const x = (e.clientX - windowSize.width / 2) / (windowSize.width / 2);
      const y = (e.clientY - windowSize.height / 2) / (windowSize.height / 2);
      
      // Update target position
      setTargetPosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [windowSize]);
  
  // Animate mouse position with easing for smoother movement
  useEffect(() => {
    const animatePosition = () => {
      // Apply easing to move towards target position
      setMousePosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * ease,
        y: prev.y + (targetPosition.y - prev.y) * ease
      }));
      
      requestAnimationFrame(animatePosition);
    };
    
    const animationId = requestAnimationFrame(animatePosition);
    return () => cancelAnimationFrame(animationId);
  }, [targetPosition, ease]);
  
  // Calculate parallel movements based on mouse position
  const x = mousePosition.x * depth;
  const y = mousePosition.y * depth;
  
  return { x, y };
}