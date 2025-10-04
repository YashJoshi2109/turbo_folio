'use client';

import { FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-cyber-black py-8 px-4 border-t border-cyber-blue/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Made with <FiHeart className="text-cyber-pink animate-pulse" /> by{' '}
            <span className="text-cyber-blue font-semibold">Yash Joshi</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}




