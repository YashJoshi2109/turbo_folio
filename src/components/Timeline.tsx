'use client';

import { motion } from 'framer-motion';
import { FiBriefcase, FiAward } from 'react-icons/fi';

export default function Timeline() {
  const timeline = [
    {
      year: '2023 - Present',
      title: 'Master of Science in Data Science',
      organization: 'University of Texas at Arlington',
      description: 'Specializing in Machine Learning, Deep Learning, and Big Data Analytics. GPA: 3.8/4.0',
      type: 'education',
    },
    {
      year: '2022 - 2023',
      title: 'Data Scientist',
      organization: 'Infosys Limited',
      description: 'Led ML projects for healthcare and finance clients. Deployed production models on AWS.',
      type: 'work',
    },
    {
      year: '2021 - 2022',
      title: 'Machine Learning Engineer',
      organization: 'Accenture',
      description: 'Developed NLP solutions and computer vision models. Automated data pipelines with Airflow.',
      type: 'work',
    },
    {
      year: '2019 - 2021',
      title: 'Data Analyst',
      organization: 'Tata Consultancy Services',
      description: 'Built dashboards and ETL pipelines. Worked with SQL, Python, and Tableau.',
      type: 'work',
    },
    {
      year: '2015 - 2019',
      title: 'Bachelor of Technology in Computer Science',
      organization: 'Savitribai Phule Pune University',
      description: 'Foundation in algorithms, data structures, and software engineering.',
      type: 'education',
    },
  ];

  return (
    <section id="timeline" className="min-h-screen py-20 px-4 bg-cyber-dark">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-purple via-cyber-blue to-cyber-green" />

            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-cyber-black cyber-border flex items-center justify-center z-10">
                  {item.type === 'education' ? (
                    <FiAward className="text-2xl text-cyber-green" />
                  ) : (
                    <FiBriefcase className="text-2xl text-cyber-blue" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`ml-24 md:ml-0 md:w-5/12 ${idx % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="cyber-border bg-cyber-black p-6 rounded-lg hover:shadow-lg hover:shadow-cyber-blue/20 transition-all">
                    <span className="text-sm text-cyber-purple font-semibold">{item.year}</span>
                    <h3 className="text-xl font-bold text-cyber-blue mt-2">{item.title}</h3>
                    <p className="text-cyber-green font-semibold mt-1">{item.organization}</p>
                    <p className="text-gray-400 mt-3 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}




