// FIX: Added import for React to resolve 'Cannot find namespace React' error.
import React from 'react';
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

const vazirmatn = Vazirmatn({ subsets: ['arabic'], display: 'swap' });

export const metadata: Metadata = {
  title: 'جمعه سیاه: فروشگاه آنلاین',
  description: 'یک صفحه فرود تجارت الکترونیک برای جمعه سیاه با پشتیبانی کامل از زبان فارسی و راست‌چین.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}