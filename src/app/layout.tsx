import type { Metadata } from 'next';
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar';
import { ConditionalFooter } from '@/components/layout/ConditionalFooter';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: "4zee Properties | Africa's Premier Real Estate Platform",
    template: '%s | 4zee Properties',
  },
  description: "Discover premium properties across 28 African countries. Buy, sell, rent, and invest in Africa's finest real estate with AI-powered recommendations and verified agents.",
  keywords: ['African real estate', 'property Africa', 'Lagos property', 'Nairobi apartments', 'South Africa homes'],
  authors: [{ name: '4zee Properties' }],
  icons: {
    icon: '/images/logo.webp',
    shortcut: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: '4zee Properties',
    title: "4zee Properties | Africa's Premier Real Estate Platform",
    description: "Buy, sell, rent & invest in premium African real estate.",
    images: [{ url: '/images/logo.webp', width: 512, height: 512, alt: '4zee Properties' }],
  },
  twitter: { card: 'summary_large_image', site: '@4zeeproperties' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConditionalNavbar />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
