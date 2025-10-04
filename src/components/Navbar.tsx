'use client';

import React from 'react';

export default function Navbar() {
  const items = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#research', label: 'Research' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-black/30 border-b border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="text-cyber-blue font-bold text-lg">My Portfolio</a>
        <ul className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
