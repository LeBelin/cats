import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 p-4 text-center">
      © {new Date().getFullYear()} Clinique Vétérinaire. Tous droits réservés.
    </footer>
  );
};

export default Footer;
