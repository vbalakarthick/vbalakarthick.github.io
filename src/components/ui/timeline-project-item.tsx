import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { Project } from "@/types";

interface TimelineProjectItemProps {
  project: Project;
  scrollYProgress: MotionValue<number>;
  index: number;
  totalProjects: number;
  onViewDetails: (project: Project) => void;
}

export function TimelineProjectItem({ 
  project, 
  scrollYProgress, 
  index, 
  totalProjects,
  onViewDetails
}: TimelineProjectItemProps) {
  // Calculate the offset for this project along the timeline
  const progress = index / (totalProjects - 1);
  
  // Alternating left and right for projects
  const isEven = index % 2 === 0;
  
  // Define transformations based on scroll position
  const yOffset = useTransform(
    scrollYProgress, 
    [Math.max(0, progress - 0.3), progress, Math.min(1, progress + 0.3)], 
    [50, 0, 50]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, progress - 0.4), progress - 0.1, progress, progress + 0.1, Math.min(1, progress + 0.4)],
    [0, 0.7, 1, 0.7, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, progress - 0.3), progress, Math.min(1, progress + 0.3)],
    [0.8, 1, 0.8]
  );
  
  const imageScale = useTransform(
    scrollYProgress, 
    [Math.max(0, progress - 0.2), progress, Math.min(1, progress + 0.2)], 
    [1.1, 1, 1.1]
  );
  
  // Calculate year (placeholder for actual project date)
  const projectYear = 2023 - index;
  
  return (
    <motion.div
      className={`absolute left-1/2 w-full px-4 md:px-0`}
      style={{
        top: `${progress * 85}%`,
        y: yOffset,
        opacity,
        scale,
        translateX: isEven ? '-75%' : '-25%',
        zIndex: index
      }}
    >
      <div className="relative pb-8 md:grid md:grid-cols-2 md:gap-8 md:items-center">
        {/* Timeline connector */}
        <div 
          className={`hidden md:block md:absolute md:top-5 ${
            isEven ? 'md:right-[-41px]' : 'md:left-[-41px]'
          } md:bottom-0 md:w-0.5 bg-gray-200 dark:bg-gray-700`} 
        />
        
        {/* Timeline marker */}
        <div 
          className={`absolute flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-gray-900 bg-blue-500 dark:bg-blue-400 ${
            isEven ? 'right-[-45px]' : 'left-[-45px]'
          } top-5 z-10`}
        >
          <span className="text-white text-xs font-bold">{index + 1}</span>
        </div>
        
        {/* Year marker */}
        <div 
          className={`absolute top-5 ${isEven ? 'left-full ml-6' : 'right-full mr-6'} transform translate-y-px`}
        >
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
            {projectYear}
          </span>
        </div>
        
        {/* Project content */}
        <motion.div
          initial={{ 
            opacity: 0, 
            x: isEven ? -30 : 30 
          }}
          whileInView={{ 
            opacity: 1, 
            x: 0 
          }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`md:col-span-1 ${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {/* Project image with parallax effect */}
            <div className="h-48 overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ scale: imageScale }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  {project.category}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <motion.span 
                    key={techIndex} 
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                    whileHover={{ scale: 1.05, backgroundColor: '#dbeafe' }} // light blue-100
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <motion.button
                  onClick={() => onViewDetails(project)}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Empty column for spacing on alternating layouts */}
        <div className={`hidden md:block md:col-span-1 ${isEven ? 'md:col-start-2' : 'md:col-start-1'}`}></div>
      </div>
    </motion.div>
  );
}