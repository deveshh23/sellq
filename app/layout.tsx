import { JetBrains_Mono, Outfit } from 'next/font/google';
import type { Metadata } from 'next';
import { ToastProvider } from '../components/shared/ToastProvider';
import './globals.css';

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'SellQ AI — Unified AI Inbox',
  description: 'AI-powered customer communication platform',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'SellQ AI — Unified AI Inbox',
    description: 'AI-powered customer communication platform',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetBrainsMono.variable} ${outfit.variable} dark`}>
      <body className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex flex-col antialiased font-sans" suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
