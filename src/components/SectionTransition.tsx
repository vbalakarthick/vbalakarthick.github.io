import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { sectionTransition, slideFrom, fadeIn, revealText } from "../lib/animations";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  id?: string; // For navigation anchor points
  type?: "fade" | "slide" | "reveal" | "slide-up";
  direction?: "top" | "bottom" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number; // View threshold
  once?: boolean; // Whether to animate only once
}

export function SectionTransition({
  children,
  className = "",
  id,
  type = "fade",
  direction = "bottom",
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  once = true,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once,
    amount: threshold,
  });

  // Pick the animation based on type
  const getAnimationVariant = () => {
    switch (type) {
      case "slide":
        return slideFrom(direction, 50, duration);
      case "reveal":
        return revealText;
      case "slide-up":
        return sectionTransition;
      case "fade":
      default:
        return fadeIn(direction === "top" ? "down" : 
                     direction === "bottom" ? "up" : 
                     direction === "left" ? "right" : "left", delay);
    }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getAnimationVariant()}
      transition={{ 
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.section>
  );
}