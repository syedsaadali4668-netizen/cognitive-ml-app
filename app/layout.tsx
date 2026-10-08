import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neuro-Cognitive AI Predictor',
  description: 'Advanced machine learning model predicting academic performance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}