import React from 'react';
import { Link } from '@inertiajs/react';

const NavMain: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Clinique Vétérinaire
        </Link>
        <div>
          <Link href={route('cats.index')} className="mr-4 hover:underline">
            Chats
          </Link>
          <Link href={route('cats.create')} className="hover:underline">
            Ajouter un chat
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavMain;
