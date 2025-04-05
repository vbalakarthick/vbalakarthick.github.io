import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TimelineItem } from "@/components/ui/timeline-item";

export function ExperienceSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [showAllEducation, setShowAllEducation] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const workExperience = [
    {
      title: "AI Engineer | Advisory Analyst (AWS)",
      company: "Hexaware Technologies",
      period: "2024 – Present",
      responsibilities: [
        "Developed an AI-driven document digitization system using AWS Textract and SageMaker.",
        "Engineered a scalable BM25-based team routing solution, replacing AWS Comprehend and saving over $250K annually.",
        "Designed Lambda-based microservices for OCR, classification, and LLM-powered summarization.",
        "Provided strategic GenAI consulting to advisory teams for cloud-based automation."
      ]
    },
    {
      title: "Cloud AI Engineer (AWS & Snowflake)",
      company: "Hexaware Technologies",
      period: "2023 – 2024",
      responsibilities: [
        "Built and deployed SaaS solutions listed on AWS and Snowflake Marketplaces.",
        "Implemented a multimodal GenAI solution for product description generation from images.",
        "Created an LLM-powered document extraction copilot for insurance brokers using Snowflake.",
        "Led architecture design for secure, scalable LLM inference using SageMaker and Streamlit."
      ]
    },
    {
      title: "GenAI Solutions Developer (Azure)",
      company: "Hexaware Technologies",
      period: "2022 – 2023",
      responsibilities: [
        "Developed and deployed GenAI-powered SaaS products using Azure OpenAI and LangChain.",
        "Delivered BondReco, Financial Statement Summarizer, and Medical Coding Automation solutions.",
        "Published 3 solutions to Azure Marketplace; BondReco recognized in Microsoft AI Foundry’s Top 5.",
        "Integrated RAG-based architectures for classification, summarization, and chat-style interfaces."
      ]
    }
  ];

const education = [
  {
    title: "Bachelor's in Electrical & Electronics Engineering",
    institution: "Anna University",
    period: "2018 – 2022",
    description:
      "Though my core background was in Electrical & Electronics, I developed a strong interest in data-driven problem solving during my final years. This led me to transition into Data Science and AI through self-learning, hands-on projects, and certifications in machine learning, cloud computing, and GenAI.",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
  }
];

const certifications = [
  {
    title: "Microsoft Certified: Azure Data Scientist Associate",
    institution: "Microsoft",
    period: "2022",
    description:
      "Validated expertise in training and deploying ML models on Azure using ML pipelines and responsible AI practices.",
    icon: "https://learn.microsoft.com/favicon.ico"
  },
  {
    title: "Databricks Lakehouse Fundamentals",
    institution: "Databricks Academy",
    period: "2023",
    description:
      "Covered Spark, Delta Lake, and ML lifecycle for building scalable data and AI pipelines.",
    icon: "https://avatars.githubusercontent.com/u/140195341?s=200&v=4"
  },
  {
    title: "AI-900 & AZ-900: Microsoft AI and Azure Fundamentals",
    institution: "Microsoft",
    period: "2022",
    description:
      "Foundational understanding of AI and cloud services within Microsoft Azure.",
    icon: "https://learn.microsoft.com/favicon.ico"
  },
  {
    title: "Oracle Cloud Infrastructure 2024 – AI Foundations Associate",
    institution: "Oracle",
    period: "Dec 2024 – Dec 2026",
    description:
      "Demonstrated knowledge of foundational AI concepts and their implementation on Oracle Cloud Infrastructure (OCI), including model training, deployment, and use case alignment.",
    icon: "https://www.oracle.com/favicon.ico"
  },
  {
    title: "Oracle Cloud Infrastructure 2024 – Foundations Associate",
    institution: "Oracle",
    period: "Issued: Dec 2024",
    description:
      "Validated cloud fundamentals and core services on OCI including compute, storage, networking, and identity.",
    icon: "https://www.oracle.com/favicon.ico"
  },
  {
    title: "Boomi – Professional API Management Certification",
    institution: "Boomi",
    period: "Issued: Dec 2024",
    description:
      "Proficiency in managing full API lifecycle including creation, security, versioning, and deployment using Boomi's platform.",
    icon: "https://boomi.com/wp-content/uploads/BoomiMenuLogoIcon.svg"
  },
  {
    title: "Boomi – Professional API Design Certification",
    institution: "Boomi",
    period: "Issued: Dec 2024",
    description:
      "Demonstrated expertise in designing scalable, secure, and consumer-friendly APIs for enterprise use cases.",
    icon: "https://boomi.com/wp-content/uploads/BoomiMenuLogoIcon.svg"
  },
  {
    title: "Boomi – Development and Application Architecture Certification",
    institution: "Boomi",
    period: "Issued: Dec 2024",
    description:
      "Focused on Boomi's platform development lifecycle and application architecture for modern integration patterns.",
    icon: "https://boomi.com/wp-content/uploads/BoomiMenuLogoIcon.svg"
  }
];


  return (
    <section id="experience" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Experience & Education
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded"></div>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Work Experience */}
          <motion.div variants={containerVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-heading font-bold mb-8 text-center lg:text-left flex items-center"
            >
              <span className="mr-3 text-blue-600 dark:text-blue-400">
                <i className="fa-solid fa-briefcase"></i>
              </span>
              Work Experience
            </motion.h3>

            <div className="relative pl-8 border-l-2 border-blue-500 dark:border-blue-400 space-y-10">
              {workExperience.map((job, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TimelineItem
                    title={job.title}
                    organization={job.company}
                    period={job.period}
                    description={job.responsibilities}
                    type="list"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={containerVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-heading font-bold mb-8 text-center lg:text-left flex items-center"
            >
              <span className="mr-3 text-blue-600 dark:text-blue-400">
                <i className="fa-solid fa-graduation-cap"></i>
              </span>
              Education
            </motion.h3>

            <div className="relative pl-8 border-l-2 border-blue-500 dark:border-blue-400 space-y-10 mb-16">
              {education.map((edu, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TimelineItem
                    title={edu.title}
                    organization={edu.institution}
                    period={edu.period}
                    description={edu.description}
                    type="paragraph"
                    icon={edu.icon}
                  />
                </motion.div>
              ))}
            </div>

            {/* Certifications Section */}
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-heading font-bold mb-8 text-center lg:text-left flex items-center"
            >
              <span className="mr-3 text-blue-600 dark:text-blue-400">
                <i className="fa-solid fa-certificate"></i>
              </span>
              Certifications
            </motion.h3>

            <div className="relative pl-8 border-l-2 border-blue-500 dark:border-blue-400 space-y-10">
              {(showAllEducation ? certifications : certifications.slice(0, 4)).map((cert, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TimelineItem
                    title={cert.title}
                    organization={cert.institution}
                    period={cert.period}
                    description={cert.description}
                    type="paragraph"
                    icon={cert.icon}
                  />
                </motion.div>
              ))}
            </div>

            {certifications.length > 4 && (
              <motion.div
                className="text-center mt-8"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <motion.button
                  variants={itemVariants}
                  onClick={() => setShowAllEducation(!showAllEducation)}
                  className="inline-block border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium py-2 px-5 rounded-lg transition-colors duration-300"
                >
                  {showAllEducation ? (
                    <>
                      Show Less <i className="fa-solid fa-arrow-up ml-2"></i>
                    </>
                  ) : (
                    <>
                      View All Certifications <i className="fa-solid fa-arrow-down ml-2"></i>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
