import React from 'react';
import { Phone, Clock } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">🍔 Burger House</h1>
          <p className="text-red-100">Hambúrguers Artesanais Premium</p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="hidden md:flex items-center gap-2">
            <Clock size={16} />
            <span>18h - 23h</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Phone size={16} />
            <span>(21) 99999-9999</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;