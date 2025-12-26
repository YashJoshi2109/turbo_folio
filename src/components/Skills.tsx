'use client';

import { motion } from 'framer-motion';
import React from 'react';
import type { IconType } from 'react-icons';
import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiAmazon,
  SiDocker,
  SiKubernetes,
  SiReact,
  SiMongodb,
  SiPostgresql,
} from 'react-icons/si';
import dynamic from 'next/dynamic';

const GalaxyBackground = dynamic(() => import('./GalaxyBackground'), { ssr: false });

function Skills() {
  const techIcons: Array<{ Icon: IconType | undefined; color: string; name: string }> = [
    { Icon: SiPython as IconType, color: '#3776AB', name: 'Python' },
    { Icon: (SiPytorch as unknown as IconType) || undefined, color: '#EE4C2C', name: 'PyTorch' },
    { Icon: (SiTensorflow as unknown as IconType) || undefined, color: '#FF6F00', name: 'TensorFlow' },
    { Icon: SiAmazon as IconType, color: '#FF9900', name: 'AWS' },
    { Icon: SiDocker as IconType, color: '#2496ED', name: 'Docker' },
    { Icon: (SiKubernetes as unknown as IconType) || undefined, color: '#326CE5', name: 'Kubernetes' },
    { Icon: SiReact as IconType, color: '#61DAFB', name: 'React' },
    { Icon: (SiMongodb as unknown as IconType) || undefined, color: '#47A248', name: 'MongoDB' },
  ];

  const skillCategories: Array<{ title: string; skills: string[]; iconComponent?: IconType; iconClassName: string }> = [
    {
      title: 'Machine Learning & AI',
      skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Keras'],
      iconComponent: SiPython as IconType,
      iconClassName: 'text-5xl text-cyber-blue',
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'MLflow', 'DVC'],
      iconComponent: SiAmazon as IconType,
      iconClassName: 'text-5xl text-cyber-yellow',
    },
    {
      title: 'Data Engineering',
      skills: ['SQL', 'MongoDB', 'PostgreSQL', 'Apache Spark', 'Airflow', 'ETL'],
      iconComponent: SiPostgresql as IconType,
      iconClassName: 'text-5xl text-cyber-purple',
    },
    {
      title: 'Web & Visualization',
      skills: ['React', 'Next.js', 'FastAPI', 'Streamlit', 'Plotly', 'D3.js'],
      iconComponent: SiReact as IconType,
      iconClassName: 'text-5xl text-cyber-green',
    },
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-4 bg-cyber-black relative overflow-hidden">
      <GalaxyBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>

          {/* Tech Icons Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 mb-16">
            {techIcons.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15 }}
                className="flex flex-col items-center gap-2"
              >
                {typeof tech.Icon === 'function'
                  ? React.createElement(tech.Icon, { style: { color: tech.color }, className: 'text-5xl' })
                  : null}
                <span className="text-xs text-gray-400">{tech.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Skill Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="cyber-border bg-cyber-dark/50 p-6 rounded-lg hover:shadow-lg hover:shadow-cyber-blue/20 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  {typeof category.iconComponent === 'function'
                    ? React.createElement(category.iconComponent, { className: category.iconClassName })
                    : null}
                  <h3 className="text-2xl font-bold text-cyber-blue">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-1 bg-cyber-black/50 rounded-full text-sm text-gray-300 border border-cyber-purple/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;