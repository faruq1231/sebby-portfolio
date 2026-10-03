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
  description: 'Developer, builder, and creator of Masterspred. Serious work, eventually.',
  metadataBase: new URL('https://faruq.tech'),
  alternates: { canonical: '/' },
  icons: { icon: '/faruq-logo.jpeg', apple: '/faruq-logo.jpeg' },
  openGraph: {
    title: 'Faruq Etamesor — Developer & Builder',
    description: 'Developer, builder, and creator of Masterspred. Serious work, eventually.',
    url: 'https://faruq.tech',
    images: [{ url: '/faruq-logo.jpeg', width: 1280, height: 1280, alt: 'Faruq logo' }],
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
