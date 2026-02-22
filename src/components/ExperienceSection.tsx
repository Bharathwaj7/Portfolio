'use client';

import { motion } from 'framer-motion';

export default function ExperienceSection() {
  const experiences = [
    {
      role: "Market Analyst",
      company: "Axxela Research and Analytics, Bangalore",
      period: "Jan 2026 – Present",
      description: "Actively trading SONIA futures, combining macro-economic indicators and rate-path expectations to generate directional trade ideas.",
      achievements: [
        "Combined macro-economic indicators and rate-path expectations to generate directional trade ideas",
        "Monitored policy announcements, data prints, and market microstructure to optimize entry/exit",
        "Managed risk exposure in short-term interest rate markets"
      ]
    },
    {
      role: "Research Intern",
      company: "SCOPE, VIT Chennai",
      period: "May 2025 – July 2025",
      description: "Built TrustEvoContrastGNN — a framework integrating Temporal GNNs and contrastive learning for dynamic P2P trust and reputation modeling.",
      achievements: [
        "Achieved R² of over 0.85 on trust prediction benchmarks",
        "Reduced MAE and RMSE by 35% compared to state-of-the-art baselines",
        "Integrated Temporal GNNs with contrastive learning for dynamic P2P modeling"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-red-600">MY</span> EXPERIENCE
          </h2>
          <div className="h-1 w-16 bg-red-600 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            My journey through the fast lane of tech and research
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-red-600/50 via-red-600/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot with pulse */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-red-600 rounded-full pulse-dot" />
                </div>

                {/* Experience card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-0 md:pl-0' : 'md:ml-auto md:pl-0 md:pr-0'}`}>
                  <div className="glass glass-hover rounded-xl p-6">
                    <span className="text-red-500 text-xs font-mono tracking-wider">{exp.period}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{exp.role}</h3>
                    <h4 className="text-gray-400 text-sm mb-3">{exp.company}</h4>
                    <p className="text-gray-500 text-sm mb-4">{exp.description}</p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-600 mt-0.5 text-xs">▸</span>
                          <span className="text-gray-400 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}