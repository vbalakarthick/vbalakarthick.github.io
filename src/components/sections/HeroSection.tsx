import { TypedText } from "@/components/ui/typed-text";
import { motion, useInView } from "framer-motion";
import { SectionTransition } from "../SectionTransition";
import { useState, useEffect, useRef } from "react";
import { slideFrom } from "@/lib/animations";
import { ParticlesBackground } from "@/components/ui/particles-background";
import profilePic from './profilepic.jpg';
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleDownloadResume = () => {
    const fileUrl = "/resume/Balakarthick-Data_Scientist.pdf";
  
    // Open in a new tab
    window.open(fileUrl, "_blank");
  
    // Trigger download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Balakarthick-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  };
  
  

  return (
    <SectionTransition 
      id="home" 
      type="slide" 
      direction="top" 
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
    >
      {/* Animated background particles - with simplified CSS-based grid */}
      {isMounted && (
        <div className="dark:opacity-40 opacity-30 absolute inset-0 z-0 overflow-hidden">
          {/* Static dot grid */}
          <div 
            className="w-full h-full absolute"
            style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px), radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 20px 20px'
            }}
          ></div>
          
          {/* Animated floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/20 dark:bg-blue-400/20"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: 'blur(1px)'
              }}
              animate={{
                y: [`${Math.random() * -100}px`, `${Math.random() * 100}px`],
                x: [`${Math.random() * -100}px`, `${Math.random() * 100}px`],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}
          
          {/* Animated gradient wave */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-blue-500/5"
            style={{
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          
          {/* Light flare effect */}
          <motion.div
            className="absolute rounded-full opacity-30 dark:opacity-20"
            style={{
              width: '40vw',
              height: '40vw',
              background: 'radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)',
              top: '20%',
              left: '30%',
              filter: 'blur(40px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
      )}
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white dark:from-transparent dark:via-gray-900/20 dark:to-gray-900 z-0"></div>
      
      {/* Glowing orbs in background for additional depth */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-300/20 dark:bg-blue-600/10 blur-3xl"
          style={{ top: '15%', left: '10%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-56 h-56 rounded-full bg-purple-300/10 dark:bg-purple-600/10 blur-3xl"
          style={{ bottom: '20%', right: '15%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div 
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left column - Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.p 
              className="text-blue-600 dark:text-blue-400 font-medium text-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1 
              className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Balakarthick V
            </motion.h1>
            
            <motion.div 
              className="font-heading text-2xl sm:text-3xl text-gray-600 dark:text-gray-400 mb-6 h-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TypedText 
                strings={[
                  "GenAI Developer",
                  "Data Scientist",
                  "Cloud AI Engineer",
                ]}
               
                typeSpeed={100} 
                backSpeed={50}
                loop={true}
              />
            </motion.div>
            
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Shaping the future with intelligent, scalable, and human-centered technology.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start space-x-0 sm:space-x-4 space-y-4 sm:space-y-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadResume}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                  />
                </svg>
                Download Resume
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="w-full sm:w-auto border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                Contact Me
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="flex justify-center lg:justify-start mt-8 space-x-5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {[
                { 
                  icon: "fab fa-github", 
                  href: "https://github.com/vbalakarthick",
                  color: "hover:text-gray-800 dark:hover:text-white" 
                },
                { 
                  icon: "fab fa-linkedin", 
                  href: "https://www.linkedin.com/in/balakarthickv/",
                  color: "hover:text-blue-600 dark:hover:text-blue-400" 
                },
                { 
                  icon: "naukri", // placeholder
                  href: "https://www.naukri.com/mnjuser/profile?id=&altresid",
                  image: "https://static.naukimg.com/s/0/0/i/naukri-identity/naukri_gnb_logo.svg",
                  alt: "Naukri"
                }
                // { 
                //   icon: "fab fa-dribbble", 
                //   href: "#",
                //   color: "hover:text-pink-500 dark:hover:text-pink-400" 
                // }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className={`text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon === "naukri" ? (
                    <img 
                      src={social.image} 
                      alt={social.alt} 
                      className="w-12 h-8 object-contain"
                    />
                  ) : (
                    <i className={social.icon}></i>
                  )}

                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Right column - Profile image */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            variants={slideFrom("right", 40)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Background blur effect */}
              <motion.div 
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-purple-900/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-sm"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 0.9, 0.7]  
                }}
                transition={{ 
                  duration: 3, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              {/* Outer glowing ring */}
              <motion.div 
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-blue-200 dark:border-blue-800/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.03, 1],
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 8, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Animated dots around the border */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 shadow-lg shadow-blue-500/50 dark:shadow-blue-400/50"
                  initial={{
                    x: "50%",
                    y: "50%",
                    opacity: 0
                  }}
                  animate={{
                    x: `${50 + 45 * Math.cos(2 * Math.PI * i / 8)}%`,
                    y: `${50 + 45 * Math.sin(2 * Math.PI * i / 8)}%`,
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.2
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.2
                    },
                    x: {
                      duration: 0.5,
                      delay: 0.3 + i * 0.05
                    },
                    y: {
                      duration: 0.5,
                      delay: 0.3 + i * 0.05
                    }
                  }}
                  style={{
                    top: `calc(50% - 6px)`,
                    left: `calc(50% - 6px)`,
                  }}
                />
              ))}
              
              {/* Profile image */}
              <motion.div 
                className="w-60 h-60 sm:w-72 sm:h-72 rounded-full relative z-10 overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-600/20 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                ></motion.div>
                
                <motion.img 
                  src={profilePic} 
                  alt="Profile" 
                  className="w-full h-full object-cover border-4 border-white dark:border-gray-800"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: 1, 
            y: [0, 10, 0],
            transition: {
              y: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              },
              opacity: {
                duration: 0.5,
                delay: 1.5
              }
            }
          }}
        >
          <a 
            href="#about" 
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex flex-col items-center"
          >
            <span className="text-sm mb-1">Scroll Down</span>
            <svg 
              className="w-6 h-6 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </SectionTransition>
  );
}
