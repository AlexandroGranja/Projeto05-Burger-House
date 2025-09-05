import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const MenuSection = ({ menuItems, sides, handleAddItemClick }) => {
  const [activeCategory, setActiveCategory] = useState('burgers');
  
  // Organizar os itens em categorias
  const categories = {
    burgers: {
      name: '🍔 Hambúrgueres Artesanais',
      items: menuItems.map(item => ({ 
        ...item, 
        image: `/images/${item.image}` 
      }))
    },
    sides: {
      name: '🍟 Acompanhamentos',
      items: sides.map(item => ({ 
        ...item, 
        image: `/images/${item.image}`, 
        price: item.price || 0
      }))
    },
    drinks: {
      name: '🥤 Bebidas',
      items: [
        { 
          id: 101, 
          name: 'Refrigerante', 
          description: 'Lata 350ml - Coca-Cola, Guaraná, Fanta', 
          price: 6.90, 
          image: '/images/sides-soda.jpg' // ✅ Esta imagem EXISTE
        },
        { 
          id: 102, 
          name: 'Suco Natural', 
          description: 'Copo 500ml - Laranja, Maracujá, Limão', 
          price: 8.90, 
          image: '/images/sides-soda.jpg' // Usando a mesma por enquanto
        },
        { 
          id: 103, 
          name: 'Milkshake', 
          description: 'Copo 500ml - Chocolate, Morango, Baunilha', 
          price: 12.90, 
          image: '/images/sides-soda.jpg' // Usando a mesma por enquanto
        }
      ]
    },
    desserts: {
      name: '🍰 Sobremesas',
      items: [
        { 
          id: 201, 
          name: 'Brownie', 
          description: 'Brownie de chocolate com sorvete', 
          price: 10.90, 
          image: '/images/burger-classico.jpg' // Fallback com imagem que existe
        },
        { 
          id: 202, 
          name: 'Torta de Limão', 
          description: 'Fatia de torta de limão merengue', 
          price: 9.90, 
          image: '/images/burger-classico.jpg' // Fallback com imagem que existe
        }
      ]
    }
  };

  return (
    <main id="menu" className="relative py-16 bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 overflow-hidden shadow-2xl text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-gradient-to-br from-red-800/20 to-gray-900/20"></div>
      </div>
      
      {/* Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>

      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-500 text-center mb-8">
          Nosso Cardápio
        </h2>
        
        {/* Navegação por Categorias */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.keys(categories).map((categoryKey) => (
            <button
              key={categoryKey}
              onClick={() => setActiveCategory(categoryKey)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                activeCategory === categoryKey
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 shadow-lg'
                  : 'bg-red-800/30 backdrop-blur-sm border border-red-700/30 text-red-100 hover:bg-red-700/40'
              }`}
            >
              {categories[categoryKey].name}
            </button>
          ))}
        </div>
        
        {/* Seção de Itens da Categoria Ativa */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent hover:from-yellow-300 hover:via-orange-400 hover:to-red-500 transition-all duration-500 mb-8 text-center">
            {categories[activeCategory].name}
          </h3>
          
          <div className={`grid ${
            activeCategory === 'burgers' ? 'md:grid-cols-2 lg:grid-cols-3' : 
            activeCategory === 'sides' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 
            'md:grid-cols-2 lg:grid-cols-3'
          } gap-8`}>
            {categories[activeCategory].items.map(item => (
              <div key={item.id} className="bg-red-800/30 backdrop-blur-sm border border-red-700/30 rounded-lg shadow-xl overflow-hidden flex flex-col hover:bg-red-700/40 transition-all duration-300 group">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-all duration-300" 
                  onError={(e) => {
                    // Fallback inteligente baseado na categoria
                    if (activeCategory === 'burgers') {
                      e.target.src = '/images/burger-classico.jpg';
                    } else if (activeCategory === 'sides') {
                      e.target.src = '/images/sides-fries.jpg';
                    } else if (activeCategory === 'drinks') {
                      e.target.src = '/images/sides-soda.jpg';
                    } else {
                      e.target.src = '/images/burger-classico.jpg';
                    }
                  }}
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-500 mb-2">
                    {item.name}
                  </h4>
                  <p className="text-red-200 font-semibold tracking-wide mb-4 flex-grow">{item.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-green-400">
                      {item.price ? `R$ ${item.price.toFixed(2)}` : "A partir"}
                    </span>
                    <button 
                      onClick={() => handleAddItemClick(item)}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-4 py-2 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 flex items-center gap-2 shadow-lg"
                    >
                      <Plus size={16} /> Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MenuSection;