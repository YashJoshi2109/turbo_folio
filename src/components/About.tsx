'use client';

import { motion } from 'framer-motion';
import { FiCode, FiAward, FiTrendingUp } from 'react-icons/fi';

export default function About() {
  const stats = [
    { icon: <FiCode />, label: 'Projects Completed', value: '15+' },
    { icon: <FiAward />, label: 'Research Papers', value: '3' },
    { icon: <FiTrendingUp />, label: 'Years Experience', value: '3+' },
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-4 bg-cyber-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a <span className="text-cyber-blue font-semibold">Data Scientist</span> and{' '}
                <span className="text-cyber-green font-semibold">Machine Learning Engineer</span> pursuing my Master's in Data Science at the University of Texas at Arlington.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With expertise in <span className="text-cyber-purple font-semibold">AI/ML</span>, Deep Learning, and Cloud Technologies, I specialize in building scalable solutions that transform raw data into actionable insights.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My work spans healthcare analytics, NLP, computer vision, and MLOps, with a passion for deploying production-ready machine learning systems that make a real-world impact.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="cyber-border bg-cyber-black/50 p-6 rounded-lg hover:shadow-lg hover:shadow-cyber-blue/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl text-cyber-blue">{stat.icon}</div>
                    <div>
                      <div className="text-3xl font-bold text-cyber-green">{stat.value}</div>
                      <div className="text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




