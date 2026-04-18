import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'TalentX Market | The Compliance Talent Marketplace',
  description:
    'TalentX Market connects compliance professionals — AML, Risk, MLRO, Trust & Safety specialists — with top employers. Post your availability or find your next hire today.',
  keywords:
    'compliance jobs, AML jobs, MLRO recruitment, risk management talent, trust and safety jobs, compliance marketplace, compliance professionals',
  openGraph: {
    title: 'TalentX Market | The Compliance Talent Marketplace',
    description:
      'The unified platform where compliance professionals post availability and employers find specialist talent.',
    url: 'https://talentxmarket.com',
    siteName: 'TalentX Market',
    images: [
      {
        url: '/tx-icon-gold.png',
        width: 1200,
        height: 630,
        alt: 'TalentX Market',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalentX Market | The Compliance Talent Marketplace',
    description:
      'Connecting compliance professionals with top employers worldwide.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/favicon-512.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider proxyUrl="https://talentxmarket.com/api/clerk">
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
