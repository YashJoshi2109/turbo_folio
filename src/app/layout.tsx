import { ReactNode } from 'react';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yash Joshi | Data Scientist | ML Engineer',
  description: 'A curious innovator who turns complex data ecosystems into actionable intelligence that powers real-world decisions.',
  keywords: 'Data Science, ML Engineer, Kaggle, Researcher, Portfolio, Yash Joshi, Data Scientist, Machine Learning Engineer , Data Analyst, UT Arlington, Texas, USA',
  metadataBase: new URL('https://port-folio-amber-phi.vercel.app'),
  openGraph: {
    title: 'Yash Joshi | Data Scientist | ML Engineer',
    description:
      'A curious innovator who turns complex data ecosystems into actionable intelligence that powers real-world decisions.',
    url: 'https://port-folio-amber-phi.vercel.app',
    siteName: 'Yash Joshi',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Yash Joshi – Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yash Joshi | Data Scientist | ML Engineer',
    description:
      'A curious innovator who turns complex data ecosystems into actionable intelligence that powers real-world decisions.',
    images: ['/og-image.jpg'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body>{children}</body>
    </html>
  );
}