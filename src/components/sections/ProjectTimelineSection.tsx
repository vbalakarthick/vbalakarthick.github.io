import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionTransition } from "../SectionTransition";
import { Project } from "@/types";
import { TimelineProjectItem } from "../ui/timeline-project-item";
import { useParallaxBackground } from "@/hooks/useParallax";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProjectTimelineProps {
  projects: Project[];
}

export function ProjectTimelineSection({ projects }: ProjectTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Scrolling progress value (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Smoothen the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 15, 
    stiffness: 100 
  });
  
  // Parallax background effect
  const backgroundY = useParallaxBackground(0.2);
  
  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
  };
  
  const closeModal = () => {
    setSelectedProject(null);
  };
  
  // Progress indicator transforms
  const progressWidth = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );
  
  const progressOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );
  
  return (
    <SectionTransition
      id="timeline"
      type="fade"
      className="py-20 overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-cover bg-center -z-10 opacity-10"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80')",
          backgroundPosition: backgroundY
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Project Timeline
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded"
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.p 
            className="text-center mt-4 text-gray-600 dark:text-gray-400 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Scroll through my journey of projects and see how they've evolved over time.
          </motion.p>
        </div>
        
        {/* Scroll progress indicator */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-blue-500 dark:bg-blue-400 z-50"
          style={{ 
            scaleX: progressWidth, 
            opacity: progressOpacity,
            transformOrigin: "0% 50%" 
          }}
        />
        
        <div 
          ref={containerRef}
          className="relative min-h-[100vh] py-20"
        >
          {/* Vertical timeline line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"
            style={{
              scaleY: smoothProgress
            }}
            initial={{ scaleY: 0 }}
          />
          
          {/* Timeline heading markers */}
          <motion.div
            className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-md border-2 border-blue-400 z-20"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0])
            }}
          >
            <div className="text-blue-600 dark:text-blue-400 font-bold">Start</div>
          </motion.div>
          
          <motion.div
            className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 bottom-0 bg-white dark:bg-gray-900 px-4 py-2 rounded-full shadow-md border-2 border-blue-400 z-20"
            style={{
              opacity: useTransform(scrollYProgress, [0.9, 0.95, 1], [0, 1, 1])
            }}
          >
            <div className="text-blue-600 dark:text-blue-400 font-bold">Present</div>
          </motion.div>
          
          {/* Project items */}
          {projects.map((project, index) => (
            <TimelineProjectItem
              key={project.id}
              project={project}
              scrollYProgress={smoothProgress}
              index={index}
              totalProjects={projects.length}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
      
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
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
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
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
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                      <div className="mt-2 text-sm text-white/80">{selectedProject.category}</div>
                    </motion.div>
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
                  <p className="text-gray-700 dark:text-gray-300">{selectedProject.description}</p>
                </motion.div>

                {/* Use Case */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold mb-3">Challenge</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedProject.useCase}</p>
                </motion.div>

                {/* Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold mb-3">Solution</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedProject.solution}</p>
                </motion.div>

                {/* Technologies Used */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
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
                
                {/* Action Links */}
                <motion.div
                  className="flex justify-center gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {selectedProject.liveLink && (
                    <motion.a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Live Demo
                    </motion.a>
                  )}
                  
                  {selectedProject.githubLink && (
                    <motion.a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fab fa-github"></i>
                      View Code
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionTransition>
  );
}