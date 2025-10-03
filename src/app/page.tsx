'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Lazy load heavy 3D components
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'));
const Research = dynamic(() => import('@/components/Research'));
const Timeline = dynamic(() => import('@/components/Timeline'));
const Contact = dynamic(() => import('@/components/Contact'));
const Navbar = dynamic(() => import('@/components/Navbar'));
const Footer = dynamic(() => import('@/components/Footer'));
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'));

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="relative overflow-hidden">
        <Suspense fallback={<div className="h-screen bg-cyber-black" />}> 
          <Hero />
        </Suspense>
        <About />
        <Suspense fallback={<div className="min-h-screen bg-cyber-dark" />}> 
          <Skills />
        </Suspense>
        <Projects />
        <Research />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}