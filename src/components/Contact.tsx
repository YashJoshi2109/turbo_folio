'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi';
import { FaKaggle } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const GalaxyBackground = dynamic(() => import('./GalaxyBackground'), { ssr: false });

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        const data = await res.json().catch(() => null);
        setStatus(data?.error || 'Failed to send message. Please try again later.');
      }
    } catch (err) {
      setStatus('Failed to send message. Please try again later.');
    }
  };

  const socialLinks = [
    { icon: <FiMail />, label: 'Email', href: 'mailto:yashjosh7486@gmail.com', color: 'text-cyber-blue' },
    { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/yash-joshi21', color: 'text-cyber-purple' },
    { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/YashJoshi2109', color: 'text-cyber-green' },
    { icon: <FaKaggle />, label: 'Kaggle', href: 'https://www.kaggle.com/tea340yashjoshi', color: 'text-cyber-blue' },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4 bg-cyber-black relative overflow-hidden">
      <GalaxyBackground />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg focus:outline-none focus:border-cyber-blue text-white"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg focus:outline-none focus:border-cyber-blue text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-cyber-dark border border-cyber-blue/30 rounded-lg focus:outline-none focus:border-cyber-blue text-white resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyber-blue/50 transition-all flex items-center justify-center gap-2"
                >
                  Send Message <FiSend />
                </button>

                {status && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-cyber-green"
                  >
                    {status}
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-cyber-blue mb-4">Let's Connect!</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm always interested in hearing about new opportunities, collaborations, or just a friendly chat about data science and machine learning.
                </p>
              </div>

              <div className="space-y-4">
                {socialLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 10 }}
                    className={`flex items-center gap-4 p-4 cyber-border bg-cyber-dark/50 rounded-lg hover:shadow-lg hover:shadow-cyber-blue/20 transition-all ${link.color}`}
                  >
                    <div className="text-3xl">{link.icon}</div>
                    <span className="font-semibold">{link.label}</span>
                  </motion.a>
                ))}
              </div>

              <div className="cyber-border bg-cyber-dark/50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-cyber-purple mb-3">Current Status</h4>
                <p className="text-gray-300 text-sm">
                  🎓 Master's Student at UTA<br />
                  💼 Open to Full-Time Opportunities<br />
                  🚀 Available for Freelance Projects
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




