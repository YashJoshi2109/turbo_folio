'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { 
  SiPython, SiPytorch, SiTensorflow, SiAmazonaws, SiDocker, 
  SiKubernetes, SiReact, SiMongodb, SiPostgresql 
} from 'react-icons/si';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Machine Learning & AI',
      skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Keras'],
      icon: <SiPython className="text-5xl text-cyber-blue" />,
    },
    {
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'MLflow', 'DVC'],
      icon: <SiAmazonaws className="text-5xl text-cyber-yellow" />,
    },
    {
      title: 'Data Engineering',
      skills: ['SQL', 'MongoDB', 'PostgreSQL', 'Apache Spark', 'Airflow', 'ETL'],
      icon: <SiPostgresql className="text-5xl text-cyber-purple" />,
    },
    {
      title: 'Web & Visualization',
      skills: ['React', 'Next.js', 'FastAPI', 'Streamlit', 'Plotly', 'D3.js'],
      icon: <SiReact className="text-5xl text-cyber-green" />,
    },
  ];

  const techIcons = [
    { Icon: SiPython, color: '#3776AB', name: 'Python' },
    { Icon: SiPytorch, color: '#EE4C2C', name: 'PyTorch' },
    { Icon: SiTensorflow, color: '#FF6F00', name: 'TensorFlow' },
    { Icon: SiAmazonaws, color: '#FF9900', name: 'AWS' },
    { Icon: SiDocker, color: '#2496ED', name: 'Docker' },
    { Icon: SiKubernetes, color: '#326CE5', name: 'Kubernetes' },
    { Icon: SiReact, color: '#61DAFB', name: 'React' },
    { Icon: SiMongodb, color: '#47A248', name: 'MongoDB' },
  ];

  return (
    <section id="skills" className="min-h-screen py-20 px-4 bg-cyber-black relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          {techIcons.map((tech, idx) => (
            <Float key={idx} speed={2} rotationIntensity={1} floatIntensity={2}>
              <mesh position={[Math.cos(idx * 0.785) * 5, Math.sin(idx * 0.785) * 5, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color={tech.color} emissive={tech.color} emissiveIntensity={0.5} />
              </mesh>
            </Float>
          ))}
        </Canvas>
      </div>

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
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="flex flex-col items-center gap-2"
              >
                <tech.Icon style={{ color: tech.color }} className="text-5xl" />
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
                  {category.icon}
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




