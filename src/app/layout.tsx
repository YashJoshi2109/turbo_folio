import { ReactNode } from 'react';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'A Next.js application with TypeScript and dark mode support.',
  keywords: 'Next.js, TypeScript, dark mode',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body>{children}</body>
    </html>
  );
}