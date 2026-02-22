'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const projects = [
    {
      title: "ResumeMatch Pro",
      description: "AI-powered resume optimization and analysis system with real-time scoring via Groq API. Features advanced document processing with PyPDF2 and TikToken, multi-format exports (PDF, JSON), and supports 50+ simultaneous batch processing.",
      tech: ["Python", "Streamlit", "Groq API", "PyPDF2", "TikToken"],
      image: "/images/resumematch.jpg",
      liveUrl: "#",
      githubUrl: "https://github.com/Bharathwaj7/ResumeMatch-Pro"
    },
    {
      title: "Hybrid Pathfinding for Lunar Exploration",
      description: "Terrain-aware navigation system integrating NASA LOLA DEM data with ML models. Combines PRM, A*, and Theta* algorithms achieving 40% improved route efficiency and 35% reduced path computation time.",
      tech: ["Python", "Machine Learning", "A*", "Theta*", "PRM"],
      image: "/images/lunar-pathfinding.jpg",
      liveUrl: "#",
      githubUrl: "https://drive.google.com/file/d/1qMYIzs9exUb0UCKL95G16RJsp6BY6xD_/view?usp=sharing"
    },
    {
      title: "Multi-PDF ChatBot",
      description: "Intelligent document processing and conversational AI system using LangChain/FAISS, processing 100+ PDFs simultaneously with 92% retrieval accuracy. Integrated multiple LLMs with automatic fallbacks and 2-second streaming responses.",
      tech: ["Python", "LangChain", "FAISS", "Groq", "Streamlit", "Sentence Transformers"],
      image: "/images/pdf-chatbot.jpg",
      liveUrl: "#",
      githubUrl: "https://github.com/Bharathwaj7/Mutli-PDF-ChatBot"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-red-600">MY</span> PROJECTS
          </h2>
          <div className="h-1 w-16 bg-red-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Engineering intelligent solutions — from AI-powered tools to lunar navigation systems
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard
                title={project.title}
                description={project.description}
                tech={project.tech}
                image={project.image}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}