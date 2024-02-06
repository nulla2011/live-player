import type { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  colorScheme: 'dark',
};
export const metadata: Metadata = {
  title: 'Live',
  description: 'Live',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
