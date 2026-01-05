'use client';

import { motion } from 'framer-motion';
import { FiFileText, FiExternalLink } from 'react-icons/fi';

export default function Research() {
  const publications = [
    {
      title: 'EduKrishnaa: A Career Guidance Web Application Based on Multi-intelligence Using Multiclass Classification Algorithm',
      authors: 'Yash Joshi, Shreyas Ajgaonkar, Pravin Tale, Pranav Jore, Mrunmayee Jakate, Snehal Lavangare, Deepali Kadam',
      venue: 'Multi-disciplinary Trends in Artificial Intelligence (MIWAI 2023), Lecture Notes in Computer Science, Springer Nature',
      abstract: 'Web-based career guidance system that analyzes user profiles with personality and technical tests using multiclass classification algorithms. Random Forest achieved 95.45% accuracy. Provides diverse career options, job opportunities, skill-building courses, projects, internships, and startup suggestions for students.',
      link: 'https://doi.org/10.1007/978-3-031-36402-0_56',
      year: '2023',
    },
    {
      title: 'Early Sepsis Prediction Using Machine Learning in ICU Patients Using XGBoost and LSTM',
      authors: 'Yash Joshi, et al.',
      venue: 'IEEE Conference on Healthcare Informatics 2024',
      abstract: 'Novel approach combining XGBoost and LSTM for early sepsis detection with 98.7% accuracy...',
      link: 'https://doi.org/10.1109/HCI49431.2024.10251506',
      year: '2024',
    },
  ];

  return (
    <section id="research" className="min-h-screen py-20 px-4 bg-cyber-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Research & Publications
            </span>
          </h2>

          <div className="space-y-6">
            {publications.map((pub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="cyber-border bg-cyber-dark/50 p-6 rounded-lg hover:shadow-lg hover:shadow-cyber-purple/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl text-cyber-purple">
                    <FiFileText />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-cyber-blue">{pub.title}</h3>
                      <span className="text-sm text-cyber-green font-semibold">{pub.year}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{pub.authors}</p>
                    <p className="text-cyber-purple text-sm mb-3">{pub.venue}</p>
                    <p className="text-gray-300 text-sm mb-4">{pub.abstract}</p>
                    <a 
                      href={pub.link}
                      className="inline-flex items-center gap-2 text-cyber-blue hover:text-cyber-green transition"
                    >
                      Read Paper <FiExternalLink />
                    </a>
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




