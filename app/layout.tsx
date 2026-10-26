import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Faruq Etamesor — Developer & Builder',
  description: 'Faruq Etamesor — developer and product builder. Explore Masterspred, EasyGrab, and the ideas I bring to life.',
  metadataBase: new URL('https://faruq.tech'),
  alternates: { canonical: '/' },
  icons: { icon: { url: '/faruq-logo.png', type: 'image/png' }, apple: '/faruq-logo.png' },
  openGraph: {
    title: 'Faruq Etamesor — Developer & Builder',
    description: 'Developer. Product builder. A little personality. Explore the work of Faruq Etamesor.',
    url: 'https://faruq.tech',
    images: [{ url: '/faruq-logo.png', width: 1254, height: 1254, alt: 'Faruq logo' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
