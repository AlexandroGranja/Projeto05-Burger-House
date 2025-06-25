import React from 'react';
import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <MapPin size={20} />
          <span>Rua dos Hambúrguers, 123 - Nova Iguaçu, RJ</span>
        </div>
        <p>&copy; 2025 Burger House. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;