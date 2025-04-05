import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SkillProgress } from "@/components/ui/skill-progress";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SectionTransition } from "../SectionTransition";
import { revealText, slideFrom } from "@/lib/animations";

export function SkillsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const technicalSkills = [
    { name: "Python", percentage: 95 },
    { name: "Generative AI / LLMs", percentage: 95 },
    { name: "Machine Learning & Deep Learning", percentage: 88 },
    { name: "LangChain / RAG Frameworks", percentage: 85 },
    { name: "Cloud Platforms", percentage: 85 },
    { name: "MLOps / Deployment (Docker, CI/CD, SageMaker)", percentage: 85 }
  ];

  const softSkills = [
    { name: "Strategic Problem Solving", icon: "fa-chess-knight" },
    { name: "Rapid Learning & Adaptability", icon: "fa-bolt" },
    { name: "Communication & Documentation", icon: "fa-comments" },
    { name: "End-to-End Ownership", icon: "fa-tasks" },
    { name: "Collaboration in Cross-Functional Teams", icon: "fa-people-group" },
    { name: "Innovation & Curiosity", icon: "fa-brain" }
  ];

  const stats = [
    { value: 3, label: "Years of Experience", suffix: "+" }
  ];

  return (
    <SectionTransition 
      id="skills" 
      type="slide-up" 
      className="py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Animation */}
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">My Skills</h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-1 bg-blue-600 dark:bg-blue-400 rounded"
          />
        </motion.div>
        
        {/* Skills Grid with Staggered Entry */}
        <div 
          ref={skillsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Technical Skills Column */}
          <motion.div 
            variants={slideFrom("left", 50, 0.6)}
            initial="hidden"
            animate={isSkillsInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={revealText}
              className="text-2xl font-heading font-bold mb-8 text-center lg:text-left"
            >
              Technical Skills
            </motion.h3>
            
            {technicalSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isSkillsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                <SkillProgress name={skill.name} percentage={skill.percentage} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Soft Skills Column */}
          <motion.div 
            variants={slideFrom("right", 50, 0.6)}
            initial="hidden"
            animate={isSkillsInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={revealText}
              className="text-2xl font-heading font-bold mb-8 text-center lg:text-left"
            >
              Soft Skills
            </motion.h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={isSkillsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + (index * 0.07),
                    ease: "easeOut" 
                  }}
                  whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="text-3xl text-blue-500 mb-3">
                    <i className={`fa-solid ${skill.icon}`}></i>
                  </div>
                  <h4 className="font-medium">{skill.name}</h4>
                </motion.div>
              ))}
            </div>
            <div 
          ref={statsRef}
          className="mt-16 flex justify-center"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md px-12 py-8 text-center flex flex-col items-center max-w-xs"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isStatsInView 
                ? { opacity: 1, y: 0, scale: 1 } 
                : { opacity: 0, y: 30, scale: 0.9 }
              }
              transition={{ 
                duration: 0.8, 
                ease: [0.175, 0.885, 0.32, 1.275] // Custom "spring" easing
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)",
                transition: { duration: 0.3, type: "spring", stiffness: 400 } 
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isStatsInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2" 
                />
                <motion.div 
                  className="w-12 h-1 bg-blue-400 dark:bg-blue-500 mx-auto my-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={isStatsInView ? { width: "3rem" } : { width: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
          </motion.div>
        </div>
        
        {/* Experience Stats Section with Enhanced Animation */}

      </div>
    </SectionTransition>
  );
}
