import { ReactNode } from 'react';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yash Joshi | Data Scientist | ML Engineer',
  description: 'A curious innovator who turns complex data ecosystems into actionable intelligence that powers real-world decisions.',
  keywords: 'Data Science, ML Engineer, Kaggle, Researcher, Portfolio, Yash Joshi, Data Scientist, Machine Learning Engineer , Data Analyst, UT Arlington, Texas, USA',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body>{children}</body>
    </html>
  );
}