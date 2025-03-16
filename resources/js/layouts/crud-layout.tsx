import React, { ReactNode } from 'react';
import NavMain from '@/components/nav-main';
import Footer from '@/components/footer';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const CrudLayout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavMain />
      <header className="bg-gray-100 shadow p-4">
        <h1 className="text-2xl font-bold text-center">{title}</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CrudLayout;
