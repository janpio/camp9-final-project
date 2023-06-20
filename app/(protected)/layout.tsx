import React from 'react';
import '../globals.css';
import { Navbar } from '@/components/shared/navbar/Navbar';
import Provider from '../provider';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col justify-between h-screen">
        <Provider>{children}</Provider>
        {/* change the next line from true instead of children later */}
        {true && (
          <footer className="fixed bottom-8 container px-8">
            <Navbar variant={'primary'} />
          </footer>
        )}
      </body>
    </html>
  );
}
