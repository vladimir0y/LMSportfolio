import './globals.css';
import { ReactNode } from 'react';
import ThemeProvider from '@/components/providers/ThemeProvider';

export const metadata = {
  title: 'OpenLMS',
  description: 'Modern open-source LMS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}


