import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
// import bondreco from "@/components/sections/projects/bondreco.png";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewAll, setViewAll] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const filterButtons = ["All", "GenAI", "ML", "Cloud", "SaaS"];

  const projects = [
    {
      id: 1,
      title: "BondReco – AI-Powered Bond Classification",
      description: "Automated bond classification using GenAI and regulatory clause checks. Deployed as a SaaS solution on Azure Marketplace.",
      image: "/projects/bondreco.png", // Add your image path
      technologies: ["Azure OpenAI", "RAG", "LangChain", "SaaS"],
      useCase: "Finance teams needed faster, scalable ERISA classification for bonds and investment documents to reduce manual review efforts.",
      solution: "Created a Retrieval-Augmented Generation (RAG) solution integrated with clause classification and compliance logic, deployed via Azure as a SaaS app.",
      liveLink: "#",
      githubLink: "#",
      category: ["GenAI", "SaaS"]
    },
    {
      id: 2,
      title: "Instant Loan Audit",
      description: "LLM-powered automation for auditing loan documents in real-time, ensuring compliance and identifying risky clauses.",
      image: "/projects/loan.png", // add your image file here
      technologies: ["Azure OpenAI", "GenAI", "Compliance AI", "Document Analysis"],
      useCase: "Banks and financial institutions needed faster ways to audit loan agreements while detecting potential regulatory risks.",
      solution: "Built an LLM-powered tool that scans and analyzes loan agreements, extracts key entities, flags risks, and generates summary reports instantly. Reduced manual audit time by over 70%.",
      liveLink: "#",
      githubLink: "#",
      category: ["GenAI", "SaaS"]
    },
    {
      id: 3,
      title: "Financial Statement Summarizer",
      description: "AI system that parses and summarizes financial statements like balance sheets and income statements using LLMs.",
      image: "/projects/financial.png",
      technologies: ["LangChain", "Azure OpenAI", "Streamlit", "PDF Parsing"],
      useCase: "CFOs and analysts wanted quick, actionable summaries of lengthy financial documents.",
      solution: "Developed a GenAI-powered tool with prompt templates to extract and summarize insights. Integrated document upload and multi-tab analysis interface.",
      liveLink: "#",
      githubLink: "#",
      category: ["GenAI", "SaaS"]
    },
    {
      id: 4,
      title: "Medical Coding Automation",
      description: "GenAI-based automation of ICD coding from clinical notes and claims data.",
      image: "/projects/medical.png",
      technologies: ["Prompt Engineering", "LLMs", "Healthcare AI", "Azure"],
      useCase: "Healthcare providers needed to reduce turnaround time for coding insurance claims with high accuracy.",
      solution: "Implemented prompt-based LLM workflows to generate and validate ICD codes, improving speed and accuracy while ensuring auditability.",
      liveLink: "#",
      githubLink: "#",
      category: ["GenAI", "SaaS"]
    },
    {
      id: 5,
      title: "Team Routing Engine with BM25",
      description: "Built a secure, scalable team classification engine to replace AWS Comprehend and save over $250K/year.",
      image: "/projects/routing.png",
      technologies: ["BM25", "Lambda", "AWS S3", "Open Source"],
      useCase: "Client used AWS Comprehend for routing tickets based on topics, which was costly and inflexible.",
      solution: "Developed a BM25-powered engine trained on team-specific documents for accurate routing, hosted with Lambda + S3.",
      liveLink: "#",
      githubLink: "#",
      category: "Cloud"
    },
    {
      id: 6,
      title: "Onboarding Assistant Chatbot",
      description: "AI chatbot that personalizes the employee onboarding journey using LLMs and adaptive content.",
      image: "/projects/onboarding.png",
      technologies: ["GenAI", "Chatbot", "Azure OpenAI", "HR AI"],
      useCase: "HR teams needed a scalable and personalized way to onboard remote employees.",
      solution: "Built a chat-driven onboarding bot integrated with schedules, policy PDFs, and FAQs. Used LLMs to adapt answers per user profile.",
      liveLink: "#",
      githubLink: "#",
      category: ["GenAI", "Cloud"]
    },
    {
      id: 7,
      title: "Document Digitization Copilot for Insurance Brokers",
      description: "A GenAI-powered solution that digitizes complex insurance documents, extracts insights, and automates workflows. Available on Snowflake Marketplace.",
      image: "/projects/insurance.png", // use actual image path
      technologies: ["GenAI", "Snowflake", "Document AI", "Insurance AI"],
      useCase: "Insurance brokers and agents needed a faster way to process client onboarding forms, policy documents, and claims.",
      solution: "Built a scalable SaaS solution leveraging LLMs and Snowflake to extract, classify, and summarize insurance documents. Published on Snowflake Marketplace.",
      liveLink: "https://app.snowflake.com/marketplace/listing/GZTYZGP22T0/hexaware-technologies-digital-copilot-for-insurance-brokers-agents?search=hexaware",
      githubLink: "#",
      category: ["GenAI", "SaaS"]
    },
    {
      id: 8,
      title: "Image-to-Product Description Generator",
      description: "An AI solution that generates rich product descriptions and tags from images, tailored for e-commerce platforms. Listed on AWS Marketplace.",
      image: "/projects/product.png", // use your image
      technologies: ["Vision AI", "AWS SageMaker", "LLMs", "E-commerce AI"],
      useCase: "Sellers needed an automated way to generate compelling product content from images to reduce manual effort and improve listings.",
      solution: "Created a multimodal GenAI solution that uses image inputs to generate descriptions, tags, and review analytics. Deployed on AWS Marketplace.",
      liveLink: "https://aws.amazon.com/marketplace/pp/prodview-6kucsgqv3r3ba?sr=0-3&ref_=beagle&applicationId=AWSMPContessa",
      githubLink: "#",
      category: ["GenAI", "SaaS"]
    },    
    {
      id: 9,
      title: "Document Digitization using GenAI on AWS",
      description: "An intelligent document digitization solution leveraging AWS Textract and LLMs to extract and process unstructured data from scanned documents.",
      image: "/projects/document.png", // replace with your actual image path
      technologies: ["AWS Textract", "GenAI", "LLM", "SageMaker", "Document AI"],
      useCase: "Enterprises needed to automate the processing of physical and scanned documents for faster workflows, accuracy, and downstream analytics.",
      solution: "Built an end-to-end pipeline using AWS Textract for OCR and custom LLM prompts for structured extraction and summarization. Integrated with SageMaker for scalable inference and pre/post-processing.",
      liveLink: "#", // optional: if you have a demo or walkthrough
      githubLink: "#", // optional
      category: ["GenAI", "Cloud"]
    }
    
  ];

  // Filter projects based on active category
  const filteredProjects =
  activeFilter === "All"
    ? projects
    : projects.filter((project) =>
        Array.isArray(project.category)
          ? project.category.includes(activeFilter)
          : project.category === activeFilter
      );

  
  // Show only first 3 projects if not viewing all
  const displayedProjects = viewAll ? filteredProjects : filteredProjects.slice(0, 3);

  // Handle view all projects toggle
  const toggleViewAll = () => {
    setViewAll(!viewAll);
    
    // If toggling to view all, scroll slightly down to see more projects
    if (!viewAll) {
      setTimeout(() => {
        window.scrollBy({
          top: 200,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded"></div>
        </div>
        
        <motion.div 
          className="mb-12 flex flex-wrap justify-center gap-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {filterButtons.map((filter, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              className={`font-medium py-2 px-4 rounded-md transition-colors duration-200 ${
                activeFilter === filter
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => {
                setActiveFilter(filter);
                setViewAll(false); // Reset view all when changing filter
              }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>
        
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {displayedProjects.map((project) => (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Only show the button if there are more projects to display */}
        {filteredProjects.length > 3 && (
          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.button 
              variants={itemVariants}
              onClick={toggleViewAll}
              className="inline-block border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              {viewAll ? (
                <>Show Less <i className="fa-solid fa-arrow-up ml-2"></i></>
              ) : (
                <>View All Projects <i className="fa-solid fa-arrow-right ml-2"></i></>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
