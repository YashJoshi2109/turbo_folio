'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function Projects() {
  const projects = [
    {
      title: 'Sepsis Prediction System',
      description: 'ML model using XGBoost and LSTM to predict sepsis onset 6 hours in advance, achieving 98.7% accuracy and 96.5% recall on ICU patient data.',
      tech: ['Python', 'XGBoost', 'LSTM', 'AWS SageMaker', 'Flask'],
      metrics: ['98.7% Accuracy', '96.5% Recall', '6hrs Prediction Window'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      github: '#',
      demo: '#',
      color: 'from-red-500 to-pink-500',
    },
    {
      title: 'Career Guidance System',
      description: 'NLP-powered recommendation system using BERT and collaborative filtering to match students with career paths based on skills, interests, and market trends.',
      tech: ['BERT', 'PyTorch', 'FastAPI', 'React', 'MongoDB'],
      metrics: ['89% Match Accuracy', '10K+ Users', '50+ Career Paths'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      github: '#',
      demo: '#',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Supply Chain Optimization',
      description: 'Deep learning model for demand forecasting and inventory optimization, reducing costs by 23% and improving delivery times by 35%.',
      tech: ['TensorFlow', 'Time Series', 'Tableau', 'SQL', 'Docker'],
      metrics: ['23% Cost Reduction', '35% Faster Delivery', '$2M Savings'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      github: '#',
      demo: '#',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'CI/CD Performance Dashboard',
      description: 'Real-time analytics dashboard for monitoring CI/CD pipelines with ML-based anomaly detection and predictive failure analysis.',
      tech: ['Python', 'Streamlit', 'Jenkins API', 'Scikit-learn', 'PostgreSQL'],
      metrics: ['40% Faster Detection', '95% Uptime', 'Real-time Alerts'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      github: '#',
      demo: '#',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'KSAT Satellite Analysis Tool',
      description: 'Automated satellite imagery analysis using computer vision for agricultural monitoring and crop health assessment.',
      tech: ['OpenCV', 'YOLOv8', 'AWS Lambda', 'React', 'PostgreSQL'],
      metrics: ['92% Detection Rate', '1000+ Images/day', '15 Countries'],
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
      github: '#',
      demo: '#',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-4 bg-cyber-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="cyber-border bg-cyber-black rounded-lg overflow-hidden group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`} />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a href={project.github} className="p-2 bg-cyber-black/80 rounded-full text-cyber-blue hover:text-white transition">
                      <FiGithub />
                    </a>
                    <a href={project.demo} className="p-2 bg-cyber-black/80 rounded-full text-cyber-green hover:text-white transition">
                      <FiExternalLink />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-cyber-blue">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.metrics.map((metric, metricIdx) => (
                      <span 
                        key={metricIdx}
                        className="px-2 py-1 bg-cyber-purple/20 text-cyber-purple text-xs rounded"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIdx) => (
                      <span 
                        key={techIdx}
                        className="px-2 py-1 bg-cyber-dark text-gray-300 text-xs rounded border border-cyber-blue/30"
                      >
                        {tech}
                      </span>
                    ))}
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


