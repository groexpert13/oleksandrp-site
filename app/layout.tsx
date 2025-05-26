import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { SplashScreen } from '@/components/ui/SplashScreen';

export const metadata: Metadata = {
  title: 'oleksandr P.',
  description: 'A showcase of useful features and tools',
  icons: {
    icon: [
      { url: '/oleksandrp_logo.webp', type: 'image/webp' },
    ],
    shortcut: '/oleksandrp_logo.webp',
    apple: '/oleksandrp_logo.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <SplashScreen />
        <ThemeProvider defaultTheme="system" storageKey="function-showcase-theme">
          <LanguageProvider>
            <Toaster />
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 container mx-auto px-4 py-8 md:py-12">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}