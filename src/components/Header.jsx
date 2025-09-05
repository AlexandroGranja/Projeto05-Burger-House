import React from 'react';
import { Phone, Clock, MapPin, ChefHat } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 text-white shadow-2xl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-gradient-to-br from-red-800/20 to-gray-900/20"></div>
      </div>
      
      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <ChefHat size={28} className="text-red-900" />
              </div>
              {/* Status Online */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
            </div>
            
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-500">
                🍔 Burger House
              </h1>
              <p className="text-red-200 font-semibold tracking-wide">
                🏆 Hambúrguers Artesanais Premium
              </p>
            </div>
          </div>
          
          {/* Info Cards */}
          <div className="hidden md:flex items-center gap-4">
            {/* Horário */}
            <div className="group flex items-center gap-2 bg-red-800/30 px-4 py-3 rounded-full backdrop-blur-sm border border-red-700/30 hover:bg-red-700/40 transition-all duration-300">
              <div className="p-1 bg-yellow-400/20 rounded-full">
                <Clock size={16} className="text-yellow-400 group-hover:animate-spin" />
              </div>
              <div className="text-left">
                <div className="text-red-100 font-bold text-sm">18h - 23h</div>
                <div className="text-red-300 text-xs">Aberto agora</div>
              </div>
            </div>
            
            {/* Telefone */}
            <div className="group flex items-center gap-2 bg-red-800/30 px-4 py-3 rounded-full backdrop-blur-sm border border-red-700/30 hover:bg-red-700/40 transition-all duration-300">
              <div className="p-1 bg-green-400/20 rounded-full">
                <Phone size={16} className="text-green-400 group-hover:animate-bounce" />
              </div>
              <div className="text-left">
                <div className="text-red-100 font-bold text-sm">(21) 99999-9999</div>
                <div className="text-green-300 text-xs">WhatsApp</div>
              </div>
            </div>
            
            {/* Delivery */}
            <div className="group flex items-center gap-2 bg-green-600/30 px-4 py-3 rounded-full backdrop-blur-sm border border-green-500/30 hover:bg-green-500/40 transition-all duration-300">
              <div className="p-1 bg-blue-400/20 rounded-full">
                <MapPin size={16} className="text-blue-400 group-hover:animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-green-100 font-bold text-sm">Delivery</div>
                <div className="text-blue-300 text-xs">30-45 min</div>
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-6 py-2 rounded-full font-bold hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 shadow-lg ml-4">
              Fazer Pedido
            </button>
          </div>
        </div>

        {/* Mobile Info Row */}
        <div className="md:hidden mt-4 flex justify-center gap-4">
          <div className="flex items-center gap-2 bg-red-500/30 px-3 py-2 rounded-full backdrop-blur-sm text-xs">
            <Clock size={12} className="text-yellow-400" />
            <span className="text-white font-medium">18h-23h</span>
          </div>
          <div className="flex items-center gap-2 bg-red-500/30 px-3 py-2 rounded-full backdrop-blur-sm text-xs">
            <Phone size={12} className="text-green-400" />
            <span className="text-white font-medium">WhatsApp</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;