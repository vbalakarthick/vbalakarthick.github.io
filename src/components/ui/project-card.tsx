import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    // Restore body scrolling
    document.body.style.overflow = "auto";
  };

  // Close modal when clicking escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  // Playful hover animation variants
  const cardVariants = {
    hover: {
      scale: 1.03,
      rotate: 1,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.98,
      rotate: -1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    }
  };

  // Technology pill hover animation
  const techPillVariants = {
    hover: (i: number) => ({
      y: [0, -5, 0],
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }),
    initial: {
      y: 0
    }
  };

  // Secret button hover animation
  const secretButtonVariants = {
    initial: { opacity: 0, scale: 0 },
    hover: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  return (
    <>
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md h-full flex flex-col cursor-pointer relative"
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Secret button that appears on hover (Easter egg) */}
        <motion.div
          className="absolute top-4 right-4 z-20"
          variants={secretButtonVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
            whileHover={{ 
              rotate: [0, 360], 
              scale: 1.2,
              transition: { duration: 0.5 }
            }}
            onClick={(e) => {
              e.stopPropagation();
              // Easter egg animation - make the card do a flip
              const card = e.currentTarget.parentElement?.parentElement;
              if (card) {
                card.animate([
                  { transform: 'rotateY(0deg)' },
                  { transform: 'rotateY(360deg)' }
                ], {
                  duration: 800,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                });
              }
            }}
            aria-label="Easter egg button"
          >
            <i className="fa-solid fa-star text-xs"></i>
          </motion.button>
        </motion.div>

        {/* Card content that opens the modal when clicked */}
        <div className="relative overflow-hidden h-56" onClick={openModal}>
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.5 }
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-blue-600 bg-opacity-80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="text-white flex gap-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <motion.button 
                className="bg-white rounded-full p-3 text-blue-600"
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="View project details"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double triggering
                  openModal();
                }}
              >
                <i className="fa-solid fa-eye"></i>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="p-6 flex-grow" onClick={openModal}>
          <motion.h3 
            className="text-xl font-heading font-bold mb-2"
            initial={{ y: 0 }}
            whileHover={{ 
              y: -3,
              color: '#3b82f6', // blue-500
              transition: { duration: 0.2 }
            }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <motion.span 
                key={index}
                custom={index}
                variants={techPillVariants}
                initial="initial"
                animate={isHovered ? "hover" : "initial"}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: '#93c5fd', // blue-300
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              {/* Modal Content */}
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl flex flex-col"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              >
                {/* Modal Header */}
                <div className="relative">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-64 object-cover"
                    initial={{ filter: 'brightness(1)' }}
                    whileHover={{ filter: 'brightness(1.1)', transition: { duration: 0.3 } }}
                  />
                  <motion.div 
                    className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/70 to-transparent"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start">
                      <motion.h2 
                        className="text-2xl font-bold text-white"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {project.title}
                      </motion.h2>
                      <motion.button 
                        onClick={closeModal}
                        className="text-white hover:text-gray-300 transition-colors p-1"
                        aria-label="Close modal"
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: 90,
                          transition: { duration: 0.3 } 
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                  {/* Project Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Project Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                  </motion.div>

                  {/* Use Case */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Challenge</h3>
                    <p className="text-gray-700 dark:text-gray-300">{project.useCase}</p>
                  </motion.div>

                  {/* Solution */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Solution</h3>
                    <p className="text-gray-700 dark:text-gray-300">{project.solution}</p>
                  </motion.div>

                  {/* Technologies Used */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <motion.span 
                          key={index} 
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + (index * 0.05), duration: 0.3 }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: '#93c5fd', // blue-300
                            transition: { duration: 0.2 } 
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
