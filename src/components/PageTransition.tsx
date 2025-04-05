import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useRef } from "react";

interface PageTransitionProps {
  children: ReactNode;
  location?: string; // Optional key for AnimatePresence
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const overlayVariants = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1], // Custom easing function for a more interesting animation
    },
    transitionEnd: {
      display: "none",
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
    },
    display: "block",
  },
};

export function PageTransition({ children, location }: PageTransitionProps) {
  // Use a ref to get a stable reference for the key
  const keyRef = useRef(location || Math.random().toString());

  return (
    <div className="page-transition-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={keyRef.current}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="w-full"
        >
          {/* Overlay effect for transitions */}
          <motion.div
            className="fixed inset-0 origin-top bg-blue-600 dark:bg-blue-800 z-50 pointer-events-none"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={overlayVariants}
          />
          
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}