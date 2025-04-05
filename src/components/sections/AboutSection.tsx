import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionTransition } from "../SectionTransition";
import { staggeredFade, slideFrom } from "@/lib/animations";

export function AboutSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });
  const [scope, animate] = useAnimate();
  
  // Animation for core values
  useEffect(() => {
    if (isContentInView) {
      animate(".core-value", 
        { opacity: [0, 1], x: [-10, 0] }, 
        { duration: 0.4, delay: stagger(0.1) }
      );
    }
  }, [isContentInView, animate]);

  const coreValues = [
    {
      title: "🚀 Innovation-Driven",
      description: "Exploring cutting-edge AI & cloud tech"
    },
    {
      title: "🔍 Detail-Oriented",
      description: "Focused on quality and maintainability"
    },
    {
      title: "🌱 Lifelong Learner",
      description: "Always evolving with emerging technologies"
    },
    {
      title: "🤝 Collaboration",
      description: "Building solutions through teamwork and empathy"
    }
  ];

  return (
    <SectionTransition 
      id="about" 
      type="fade" 
      className="py-24 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">About Me</h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-1 bg-blue-600 dark:bg-blue-400 rounded"
          />
        </motion.div>
        
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div 
            variants={slideFrom("left", 70, 0.7)}
            initial="hidden"
            animate={isContentInView ? "visible" : "hidden"}
          >
            <img 
              src="/public/projects/profile.png" 
              alt="profile" 
              className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full mx-auto shadow-xl border-4 border-blue-600 dark:border-gray-800 transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
          
          <div ref={scope}>
            <motion.div
              variants={slideFrom("right", 70, 0.7)}
              initial="hidden"
              animate={isContentInView ? "visible" : "hidden"}
            >
              <motion.h3 className="text-2xl font-heading font-bold mb-4 text-blue-600 dark:text-blue-400">
                Who am I?
              </motion.h3>
              <motion.p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                I'm a technology enthusiast focused on building future-ready AI and cloud solutions.
                With a passion for Generative AI, Machine Learning, and scalable software systems, I enjoy transforming complex ideas into real-world applications that make a difference.
                My approach blends technical depth with a curiosity-driven mindset to create impactful, modern experiences.
              </motion.p>
              
              <motion.h3 className="text-xl font-heading font-bold mb-3">
                My Core Values
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {coreValues.map((value, index) => (
                  <div key={index} className="core-value flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{value.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <motion.div 
                className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500 italic text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
                <span className="block mt-2 text-sm font-medium text-right">— Steve Jobs</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
