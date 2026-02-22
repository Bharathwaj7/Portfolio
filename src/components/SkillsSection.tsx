'use client';

import { motion } from 'framer-motion';
import SkillRadar from './SkillRadar';

export default function SkillsSection() {
  const skills = [
    { name: "Python", level: 95 },
    { name: "React/Next.js", level: 90 },
    { name: "Java", level: 85 },
    { name: "JavaScript", level: 90 },
    { name: "ML/DL", level: 88 },
    { name: "GenAI/LLMs", level: 85 },
    { name: "Node.js", level: 82 },
    { name: "C/C++", level: 80 }
  ];

  const certifications = [
    { name: "Generative AI with LLMs — Coursera (Antje Barth)", year: "Apr 2025" },
    { name: "Machine Learning Specialization — Coursera (Dr. Andrew NG)", year: "Jan 2025" },
    { name: "Smart India Hackathon 2024 (SIH24) — Finalist", year: "Dec 2024" },
    { name: "Microsoft Certified — Azure AI Fundamentals (AI-900)", year: "Jul 2024" },
    { name: "INNOVATE Carlo Rino-UPM UI/UX Hackathon — Finalist", year: "Jun 2024" },
  ];

  const techCategories = [
    { label: "Languages", items: "Java, Python, C/C++, JavaScript" },
    { label: "Frontend", items: "ReactJS, Next.js, Tailwind, HTML/CSS, Figma" },
    { label: "Backend/DevOps", items: "Node.js, Express, MongoDB, SQL, Azure, AWS, Docker, K8s" },
    { label: "AI/ML", items: "LangChain, FAISS, Groq, Prompt Engineering, ML/DL" },
    { label: "Tools", items: "Git, Postman, CI/CD, RESTful APIs" },
  ];

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-red-600">TECH</span> SKILLS
          </h2>
          <div className="h-1 w-16 bg-red-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            My technical capabilities mapped to race-winning performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-xl p-8"
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-red-600 rounded-full" />
              Skill Matrix
            </h3>
            <SkillRadar skills={skills} />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass rounded-xl p-8"
            >
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-red-600 rounded-full" />
                Technical Stack
              </h3>
              <div className="space-y-4">
                {techCategories.map((cat, index) => (
                  <div key={index}>
                    <span className="text-red-500 text-xs font-mono tracking-wider">{cat.label}</span>
                    <p className="text-gray-400 text-sm mt-0.5">{cat.items}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass glass-hover rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-red-600 rounded-full" />
                Certifications & Achievements
              </h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium">{cert.name}</h4>
                      <p className="text-gray-500 text-xs">{cert.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}