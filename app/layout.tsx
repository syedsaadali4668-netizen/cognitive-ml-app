import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neuro-Cognitive AI Predictor",
  description: "Advanced ML model predicting academic performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}