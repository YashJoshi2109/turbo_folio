'use client';

import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useState, useMemo } from 'react';

type ProjectCategory = 'All' | 'ML/AI' | 'Blockchain' | 'Medical AI' | 'DevOps' | 'Computer Vision' | 'Research';

const projects = [
    {
      title: 'QuantTrade AI – GenAI Equity Research Copilot',
      description:
        'Hybrid GenAI fintech platform that fuses predictive models, financial document retrieval, sentiment analysis, and LLM-based reasoning into a unified decision-support system for equity research and portfolio intelligence.',
      tech: [
        'Python',
        'GenAI',
        'Retrieval-Augmented Generation',
        'LLMs',
        'Financial NLP',
        'Time Series Forecasting',
        'Cloud',
      ],
      metrics: [
        '10-K & Earnings Call Ingestion',
        'Financial News & Filings RAG',
        'Low-Latency Equity Research',
        'Portfolio Intelligence Copilot',
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      github: 'https://github.com/YashJoshi2109/QuantTrade-AI.git',
      demo: 'https://www.quanttrade.us',
      color: 'from-emerald-500 to-cyan-500',
      category: 'ML/AI' as ProjectCategory,
    },
    {
      title: 'NegotiationArena – OpenEnv Salary Negotiation RL',
      description:
        'Reinforcement learning environment for salary, equity, and start-date negotiation built on OpenEnv, with a rule-based Challenger for training, a Qwen2.5-1.5B (4-bit) GRPO agent via Unsloth, and a Gradio-powered HF Spaces demo for interactive negotiations.',
      tech: [
        'Python',
        'Reinforcement Learning',
        'OpenEnv',
        'Qwen2.5-1.5B',
        'Unsloth',
        'TRL (GRPO)',
        'Gradio',
        'Plotly',
      ],
      metrics: [
        'Deal Quality + Speed Reward',
        'Preference Shift (Snorkel Hook)',
        'Trained vs Baseline Evaluation',
        'HF Spaces Demo Ready',
      ],
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800',
      github: 'https://github.com/YashJoshi2109/OpenEnv_Hack.git',
      demo: 'https://huggingface.co/spaces/yashj2110/negotiation-arena-v2',
      color: 'from-indigo-500 to-cyan-500',
      category: 'ML/AI' as ProjectCategory,
    },
    {
      title: 'NASA Turbofan Engine Degradation – RUL Prediction',
      description: 'Interactive Streamlit application for predicting Remaining Useful Life (RUL) of turbofan engines using NASA C-MAPSS FD001 dataset. Features comprehensive EDA, feature engineering, regression and classification models (XGBoost, Random Forest, SVR, SVC), model comparisons, and real-time predictions with pre-trained models.',
      tech: ['Python', 'Streamlit', 'XGBoost', 'Random Forest', 'Machine Learning', 'Predictive Maintenance', 'Regression', 'Classification'],
      metrics: ['RUL Prediction', 'Predictive Maintenance', 'Multiple ML Models', 'Interactive Dashboard'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      github: 'https://github.com/YashJoshi2109/NASA-Turbofan-Engine-Degradation-Simulation.git',
      demo: 'https://nasa-turbofan-engine-degradation-simulation.streamlit.app',
      kaggleDataset: 'https://www.kaggle.com/datasets/behrad3d/nasa-cmaps',
      color: 'from-orange-500 to-red-500',
      category: 'ML/AI' as ProjectCategory,
    },
    {
      title: 'Sepsis Prediction System',
      description: 'Advanced ML model using XGBoost and ensemble methods to predict sepsis onset early, trained on a comprehensive synthetic dataset. Achieves high accuracy in early detection critical for ICU patient care and treatment planning.',
      tech: ['Python', 'XGBoost', 'Machine Learning', 'Feature Engineering', 'Data Science'],
      metrics: ['Early Detection', 'ICU Monitoring', 'High Accuracy'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      github: 'https://github.com/YashJoshi2109/Early_Sepsis_Prediction.git',
      demo: 'https://yashjoshi2109-early-sepsis-prediction-app-uhdnqo.streamlit.app/',
      kaggleDataset: 'https://www.kaggle.com/datasets/tea340yashjoshi/sepsis-prediction-dataset',
      kaggleNotebook: 'https://www.kaggle.com/code/tea340yashjoshi/early-sepsis-prediction',
      color: 'from-red-500 to-pink-500',
      category: 'Medical AI' as ProjectCategory,
    },
    {
      title: 'Edukrishnaa - Career Guidance System',
      description: 'AI-powered career guidance system for students (10th, 12th, UG) using psychometric and aptitude tests with multiclass classification to recommend career paths, job roles, roadmaps, and higher study options. Published research paper in Springer Nature.',
      tech: ['Python', 'Flask', 'Machine Learning', 'SQLAlchemy', 'Multiclass Classification'],
      metrics: ['Published Research', '1333+ Accesses', '1 Citation', 'Springer Nature'],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
      github: 'https://github.com/YashJoshi2109/Edukrishnaa_prod.git',
      demo: '#',
      paper: 'https://doi.org/10.1007/978-3-031-36402-0_56',
      kaggleDataset: 'https://www.kaggle.com/datasets/tea340yashjoshi/skill-and-career-recommendation-dataset',
      color: 'from-blue-500 to-cyan-500',
      category: 'Research' as ProjectCategory,
    },
    {
      title: 'CI/CD Pipeline Dashboard',
      description: 'Real-time analytics dashboard for monitoring CI/CD pipelines with Docker containerization, AWS cloud infrastructure integration, automated testing workflows, deployment metrics, and performance analytics for DevOps teams.',
      tech: ['Docker', 'AWS', 'CI/CD', 'DevOps', 'Monitoring', 'Python'],
      metrics: ['Real-time Analytics', 'Cloud Integration', 'DevOps Automation'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      github: 'https://github.com/YashJoshi2109/congenial-train.git',
      demo: '#',
      color: 'from-purple-500 to-indigo-500',
      category: 'DevOps' as ProjectCategory,
    },
    {
      title: 'Application Logs ETL Pipeline',
      description: 'End-to-end ETL pipeline processing structured and semi-structured application log data with timestamp normalization, service-level metric computation, and ML-based latency degradation prediction. Delivers transformed datasets, metric reports, and predictive models with performance analytics.',
      tech: ['Python', 'ETL', 'Data Engineering', 'Machine Learning', 'Predictive Analytics', 'Log Processing'],
      metrics: ['ETL Pipeline', 'Latency Prediction', 'Service Monitoring', 'Metric Computation'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      github: 'https://github.com/YashJoshi2109/Application-Logs-ETL-Pipeline.git',
      demo: '#',
      color: 'from-blue-500 to-teal-500',
      category: 'DevOps' as ProjectCategory,
    },
    {
      title: 'KSAT Quest - Regression Runoff',
      description: 'Predicts soil\'s saturated hydraulic conductivity using UKSAT data via preprocessing, feature selection, and modeling, evaluated with RMSLE/R² to aid sustainable hydrological modeling.',
      tech: ['Python', 'Machine Learning', 'Regression', 'Feature Engineering', 'Data Science'],
      metrics: ['RMSLE Evaluation', 'R² Metrics', 'Hydrological Modeling'],
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
      github: 'https://github.com/YashJoshi2109/Dathathon_KSAT-Quest_Regression-Runoff.git',
      demo: '#',
      color: 'from-amber-500 to-orange-500',
      category: 'ML/AI' as ProjectCategory,
    },
    {
      title: 'NYC Taxi Trip Duration Prediction',
      description: 'Predictive modeling project forecasting taxi trip durations using historical NYC taxi data. Includes comprehensive data preprocessing, exploratory data analysis (EDA), feature engineering, and XGBoost-based predictive model to explore urban taxi trip dynamics.',
      tech: ['Python', 'XGBoost', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA'],
      metrics: ['Time Series Prediction', 'Feature Engineering', 'Urban Analytics'],
      image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
      github: '#',
      demo: '#',
      kaggleNotebook: 'https://www.kaggle.com/code/tea340yashjoshi/nyc-taxi-duration-prediction',
      color: 'from-yellow-500 to-orange-500',
      category: 'ML/AI' as ProjectCategory,
    },
    {
      title: 'Disaster Impact Prediction Model',
      description: 'Comprehensive ML model predicting reconstruction costs, injury risks, regional impact, first responder requirements, resource availability, evacuation plans, and shelter needs during disasters.',
      tech: ['Python', 'Machine Learning', 'Predictive Analytics', 'Data Science', 'MLH Hackathon'],
      metrics: ['Multi-output Prediction', 'Cost Estimation', 'Resource Planning'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      github: 'https://github.com/YashJoshi2109/Predict_Disaster_MLH_Hackathon.git',
      demo: '#',
      color: 'from-red-500 to-pink-500',
      category: 'ML/AI' as ProjectCategory,
    },
    {
      title: 'E-Voting dApp - Blockchain Voting',
      description: 'Completely decentralized e-voting system built on Ethereum blockchain, ensuring transparency, security, and immutability of voting records using smart contracts.',
      tech: ['Ethereum', 'Blockchain', 'Smart Contracts', 'Web3', 'Solidity'],
      metrics: ['Decentralized', 'Transparent', 'Secure Voting'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      github: 'https://github.com/YashJoshi2109/HACKUTA.git',
      demo: '#',
      color: 'from-purple-500 to-indigo-500',
      category: 'Blockchain' as ProjectCategory,
    },
    {
      title: 'Diabetes Retinopathy Diagnosis',
      description: 'ML-based medical diagnosis system for detecting diabetic retinopathy from retinal images, aiding early detection and treatment of this vision-threatening condition.',
      tech: ['Python', 'Deep Learning', 'Computer Vision', 'Medical AI', 'Image Classification'],
      metrics: ['Early Detection', 'Medical Diagnosis', 'Image Analysis'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      github: 'https://github.com/YashJoshi2109/Diabetes_retinopathy_diagonsis.git',
      demo: '#',
      color: 'from-green-500 to-emerald-500',
      category: 'Medical AI' as ProjectCategory,
    },
    {
      title: 'Breast Cancer Cell Classification',
      description: 'Machine learning model for classifying breast cancer cells, helping in early diagnosis and treatment planning through automated cell analysis.',
      tech: ['Python', 'Machine Learning', 'Classification', 'Medical AI', 'Data Science'],
      metrics: ['Cell Classification', 'Early Diagnosis', 'Medical ML'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
      github: 'https://github.com/YashJoshi2109/Cancer_Cell_Classification.git',
      demo: '#',
      color: 'from-pink-500 to-rose-500',
      category: 'Medical AI' as ProjectCategory,
    },
    {
      title: 'An Eye for Sightless',
      description: 'Computer vision system for visually impaired individuals using Kinect sensor to identify known persons, provide audio navigation, and assist in corridor navigation through familiar or unfamiliar spaces.',
      tech: ['Computer Vision', 'Kinect Sensor', 'Python', 'Audio Processing', 'Accessibility'],
      metrics: ['Person Recognition', 'Audio Navigation', 'Accessibility Tech'],
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800',
      github: 'https://github.com/YashJoshi2109/An-Eye-for-Sightness.git',
      demo: '#',
      color: 'from-teal-500 to-cyan-500',
      category: 'Computer Vision' as ProjectCategory,
    },
    {
      title: 'BlockPort Global - Blockchain Escrow',
      description: 'Smart contract escrow platform for secure and transparent transactions, ensuring trustless exchanges between parties using blockchain technology.',
      tech: ['Blockchain', 'Smart Contracts', 'Ethereum', 'Web3', 'Solidity'],
      metrics: ['Secure Escrow', 'Transparent', 'Trustless Transactions'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      github: 'https://github.com/YashJoshi2109/BlockPort-Global.git',
      demo: '#',
      color: 'from-indigo-500 to-purple-500',
      category: 'Blockchain' as ProjectCategory,
    },
  ];

const categories: ProjectCategory[] = ['All', 'ML/AI', 'Blockchain', 'Medical AI', 'DevOps', 'Computer Vision', 'Research'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="min-h-screen py-20 px-4 bg-cyber-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-cyber-purple to-cyber-blue text-white shadow-lg shadow-cyber-blue/50'
                    : 'bg-cyber-black text-gray-400 border border-cyber-blue/30 hover:border-cyber-blue hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
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
                    {project.github && project.github !== '#' && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-cyber-black/80 rounded-full text-cyber-blue hover:text-white transition"
                        title="GitHub Repository"
                      >
                        <FiGithub />
                      </a>
                    )}
                    {project.paper && (
                      <a 
                        href={project.paper} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-cyber-black/80 rounded-full text-cyber-green hover:text-white transition"
                        title="Research Paper"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                    {project.kaggleDataset && (
                      <a 
                        href={project.kaggleDataset} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-cyber-black/80 rounded-full text-yellow-400 hover:text-white transition"
                        title="Kaggle Dataset"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                    {project.demo && project.demo !== '#' && !project.paper && !project.kaggleDataset && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-cyber-black/80 rounded-full text-cyber-green hover:text-white transition"
                        title="Live Demo"
                      >
                        <FiExternalLink />
                      </a>
                    )}
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
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech, techIdx) => (
                      <span 
                        key={techIdx}
                        className="px-2 py-1 bg-cyber-dark text-gray-300 text-xs rounded border border-cyber-blue/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Additional Links */}
                  {(project.kaggleNotebook || project.paper) && (
                    <div className="mt-3 pt-3 border-t border-cyber-blue/20">
                      <div className="flex flex-wrap gap-2">
                        {project.kaggleNotebook && (
                          <a
                            href={project.kaggleNotebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-cyber-blue hover:text-cyber-green transition flex items-center gap-1"
                          >
                            <FiExternalLink className="text-[10px]" />
                            Kaggle Notebook
                          </a>
                        )}
                        {project.paper && (
                          <a
                            href={project.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-cyber-green hover:text-cyber-blue transition flex items-center gap-1"
                          >
                            <FiExternalLink className="text-[10px]" />
                            Research Paper
                          </a>
                        )}
                        {project.kaggleDataset && (
                          <a
                            href={project.kaggleDataset}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-yellow-400 hover:text-yellow-300 transition flex items-center gap-1"
                          >
                            <FiExternalLink className="text-[10px]" />
                            Dataset
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No projects found in this category.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
