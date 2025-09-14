import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = ({ handleAddItemClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const promotions = [
    {
      id: 2,
      title: 'Bacon Supreme',
      description: 'Pão artesanal, hambúrguer 200g, bacon crocante, queijo suíço, molho especial.',
      price: 34.90,
      image: '/images/Bacon-Supreme.png',
      category: 'burgers'
    },
    {
      id: 4,
      title: 'Double Cheese',
      description: 'Pão brioche, dois hambúrguers 150g, queijo cheddar duplo, picles e molho burger.',
      price: 38.90,
      image: '/images/Double-Cheese.png',
      category: 'burgers'
    },
    {
      id: 7,
      title: 'Batata Frita Grande',
      description: 'Porção família de batatas fritas crocantes, temperadas com ervas finas.',
      price: 16.90,
      image: '/images/batata.png',
      category: 'sides',
      variants: [
        { size: "Pequena", price: 8.90, description: "Porção individual" },
        { size: "Média", price: 12.90, description: "Para compartilhar" },
        { size: "Grande", price: 16.90, description: "Porção família" }
      ]
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promotions.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promotions.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 text-white py-16 overflow-hidden shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-gradient-to-br from-red-800/20 to-gray-900/20"></div>
      </div>
      
      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mb-7 px-4">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent pb-1 leading-tight">
            Os Melhores Hambúrguers da Cidade
          </h2>
        </div>
        
        <p className="text-xl mb-8 text-red-200 font-semibold tracking-wide">
          Ingredientes frescos, receitas exclusivas e muito sabor!
        </p>
        
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                fill="currentColor"
                className="group-hover:animate-pulse transition-all duration-300"
              />
            ))}
          </div>
          <span className="text-lg text-red-100 font-bold">4.9/5 - Mais de 1000 avaliações</span>
        </div>

        {/* Carousel Section */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <div className="overflow-hidden rounded-xl shadow-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {promotions.map((promo, index) => (
                <div
                  key={index}
                  className="min-w-full flex flex-col md:flex-row items-center bg-red-800/30 backdrop-blur-sm border border-red-700/30 p-6 rounded-xl group hover:bg-red-700/40 transition-all duration-300"
                >
                  <div className="w-full md:w-1/2">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="w-full md:w-1/2 text-left pl-0 md:pl-6 mt-4 md:mt-0">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-orange-400 group-hover:to-red-400 transition-all duration-500">
                      {promo.title}
                    </h3>
                    <p className="text-red-200 font-semibold tracking-wide my-2">{promo.description}</p>
                    <p className="text-green-400 font-bold text-lg">R$ {promo.price.toFixed(2)}</p>
                    <button 
                      onClick={() => handleAddItemClick && handleAddItemClick(promo)}
                      className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-6 py-2 rounded-full font-bold hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 shadow-lg"
                    >
                      Pedir Agora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full shadow-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300"
          >
            <ChevronLeft size={24} className="text-red-900" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full shadow-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300"
          >
            <ChevronRight size={24} className="text-red-900" />
          </button>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {promotions.map((_, index) => (
              <button
                key={index}
                aria-label={`Ir para promoção ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-yellow-400 scale-125'
                    : 'bg-red-700/50 hover:bg-red-700/80'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;