import React from 'react';
import { Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">Os Melhores Hambúrguers da Cidade</h2>
        <p className="text-xl mb-8 text-red-100">Ingredientes frescos, receitas exclusivas e muito sabor!</p>
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <span className="text-lg">4.9/5 - Mais de 1000 avaliações</span>
        </div>
        <a href="#menu" className="bg-yellow-400 text-red-800 px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-colors">
          Ver Cardápio
        </a>
      </div>
    </section>
  );
};

export default Hero;