'use client';

import { motion } from 'framer-motion';
import { FiBriefcase, FiAward } from 'react-icons/fi';

export default function Timeline() {
  const timeline = [
    {
      year: 'Jan 2026 - Present',
      title: 'AI & ML Research Assistant',
      organization: 'The University of Texas at Arlington (with Dr. Eric Jones Jr.)',
      description:
        'Supporting applied AI and machine learning research, contributing to model development, experimentation, and data-driven insights across academic and real-world problem domains.',
      type: 'work',
    },
    {
      year: 'Jan 2023 - Dec 2025',
      title: "Master of Science in Data Science",
      organization: 'The University of Texas at Arlington',
      description: 'CGPA: 4.0/4.0. Coursework: Big Data Management, Data Science, Data Visualization, Machine Learning, R Programming, Statistics.',
      type: 'education',
    },
    {
      year: 'Apr 2024',
      title: 'Hackathon UTA - 1st Place',
      organization: 'Team Lead',
      description: 'Led team to first place in University of Texas at Arlington hackathon competition.',
      type: 'award',
    },
    {
      year: 'Dec 2022 - Feb 2023',
      title: 'Data Engineer',
      organization: 'Larsen and Toubro Private LTD.',
      description: 'Configured data ingestion pipelines connecting SAP ERP, SQL Server, and flat-file feeds. Engineered ETL workflows in Python (Pandas, SQLAlchemy) and Airflow, reducing manual reporting time by 35%. Optimized pipeline performance, cutting data refresh latency from 2 hours to 25 minutes.',
      type: 'work',
    },
    {
      year: '2020 - 2023',
      title: "Bachelor's in Computer Science",
      organization: 'Mumbai University',
      description: 'GPA: 8.5/9.0. Comprehensive foundation in computer science principles including algorithms, data structures, software engineering, database systems, operating systems, and computer networks. Developed strong problem-solving skills and technical expertise.',
      type: 'education',
    },
    
    {
      year: 'Dec 2022',
      title: 'Smart India Hackathon - Finalist (2nd Place)',
      organization: 'Team Leader',
      description: 'Led team as finalist achieving 2nd place in national-level Smart India Hackathon competition.',
      type: 'award',
    },
    {
      year: 'Feb - Jun 2022',
      title: 'AI & Machine Learning Engineer',
      organization: 'Universal Recycle Solutions',
      description: 'Designed and deployed Power BI dashboards connected to SQL Server. Developed ML pipeline (Random Forest, Gradient Boosting) to forecast waste collection volume 7-14 days ahead. Cut overtime costs by an estimated 12% per quarter through predictive analytics.',
      type: 'work',
    },
    {
      year: 'Feb 2022',
      title: 'Hack Overflow - 1st Place',
      organization: 'Team Lead',
      description: 'Led team to first place in Hack Overflow hackathon competition.',
      type: 'award',
    },
    {
      year: 'Sep 2019',
      title: 'State Level Paper Presentation - 1st Place',
      organization: 'Presenter',
      description: 'Achieved first place in state-level paper presentation competition.',
      type: 'award',
    },
    {
      year: '2017 - 2020',
      title: 'Technical Diploma in Computer Science',
      organization: 'Diploma Program',
      description: 'Percentile: 92.00%. Intensive technical training in computer science fundamentals including programming languages, software development, web technologies, and system administration. Built strong technical foundation through hands-on projects and practical applications.',
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
                  ) : item.type === 'award' ? (
                    <FiAward className="text-2xl text-yellow-500" />
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




