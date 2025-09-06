import React, { useState, useEffect } from 'react'; // ✅ Adicionei useEffect
import { Plus, X } from 'lucide-react';

const MenuSection = ({ menuItems, sides, handleAddItemClick }) => {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ ADICIONE ESTE useEffect PARA DEBUG
  useEffect(() => {
    console.log('🔍 Dados recebidos no MenuSection:');
    console.log('menuItems:', menuItems);
    console.log('sides:', sides);
    
    // Verificar se há refrigerante nos sides
    const hasRefrigerante = sides.some(item => 
      item.name.toLowerCase().includes('refrigerante') || 
      item.name.toLowerCase().includes('refri')
    );
    
    if (hasRefrigerante) {
      console.warn('⚠️ REFRIGERANTE ENCONTRADO nos acompanhamentos!');
      console.log('Itens com refrigerante:', sides.filter(item => 
        item.name.toLowerCase().includes('refrigerante') || 
        item.name.toLowerCase().includes('refri')
      ));
    }
  }, [menuItems, sides]);

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
      // ✅ FILTRO PARA REMOVER BEBIDAS DOS ACOMPANHAMENTOS
      items: sides
        .filter(item => {
          const lowerName = item.name.toLowerCase();
          return !lowerName.includes('refrigerante') && 
                 !lowerName.includes('refri') &&
                 !lowerName.includes('suco') &&
                 !lowerName.includes('milkshake') &&
                 !lowerName.includes('cerveja') &&
                 !lowerName.includes('bebida');
        })
        .map(item => ({
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
          description: 'Coca-Cola, Guaraná, Fanta, Sprite',
          price: 6.90,
          image: '/images/Refrigerantes.jpg',
          variants: [
            { size: "Lata 350ml", price: 6.90, description: "Lata gelada" },
            { size: "600ml", price: 10.90, description: "Garrafa" },
            { size: "1 Litro", price: 14.90, description: "Garrafa família" },
            { size: "2 Litros", price: 18.90, description: "Garrafa party" }
          ]
        },
        {
          id: 102,
          name: 'Suco Natural',
          description: 'Laranja, Maracujá, Limão, Abacaxi',
          price: 8.90,
          image: '/images/sucos.jpg',
          variants: [
            { size: "Copo 300ml", price: 8.90, description: "Copo individual" },
            { size: "500ml", price: 12.90, description: "Copo grande" },
            { size: "1 Litro", price: 18.90, description: "Jarra individual" }
          ]
        },
        {
          id: 103,
          name: 'Milkshake',
          description: 'Chocolate, Morango, Baunilha',
          price: 12.90,
          image: '/images/Milkshake.jpg',
          variants: [
            { size: "300ml", price: 12.90, description: "Copo tradicional" },
            { size: "500ml", price: 16.90, description: "Copo grande" },
            { size: "1 Litro", price: 24.90, description: "Compartilhar" }
          ]
        },
        {
          id: 104,
          name: 'Cerveja Artesanal',
          description: 'IPA, Pilsen, Weiss, Stout',
          price: 14.90,
          image: '/images/Cerveja.png',
          variants: [
            { size: "Long Neck 355ml", price: 14.90, description: "Garrafa" },
            { size: "Lata 473ml", price: 16.90, description: "Lata" },
            { size: "Chopp 300ml", price: 12.90, description: "Chopp gelado" }
          ]
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
          image: '/images/burger-classico.jpg'
        },
        {
          id: 202,
          name: 'Torta de Limão',
          description: 'Fatia de torta de limão merengue',
          price: 9.90,
          image: '/images/burger-classico.jpg'
        }
      ]
    }
  };

  const handleItemClick = (item) => {
    if (item.variants && item.variants.length > 0) {
      setSelectedItem(item);
    } else {
      handleAddItemClick(item);
    }
  };

  const handleVariantSelect = (variant) => {
    handleAddItemClick({
      ...selectedItem,
      price: variant.price,
      variant: variant
    });
    setSelectedItem(null);
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
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${activeCategory === categoryKey
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

          <div className={`grid ${activeCategory === 'burgers' ? 'md:grid-cols-2 lg:grid-cols-3' :
            activeCategory === 'sides' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
              'md:grid-cols-2 lg:grid-cols-3'
            } gap-8`}>
            {categories[activeCategory].items.map(item => (
              <div key={item.id} className="bg-red-800/30 backdrop-blur-sm border border-red-700/30 rounded-lg shadow-xl overflow-hidden flex flex-col hover:bg-red-700/40 transition-all duration-300 group">
                {/* Imagem Centralizada */}
                <div className="w-full h-48 overflow-hidden flex justify-center items-center bg-gradient-to-b from-black/10 to-black/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
                    onError={(e) => {
                      if (activeCategory === 'burgers') {
                        e.target.src = '/images/burger-classico.jpg';
                      } else if (activeCategory === 'sides') {
                        e.target.src = '/images/sides-fries.jpg';
                      } else {
                        e.target.src = '/images/sides-soda.jpg';
                      }
                    }}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-500 mb-2">
                    {item.name}
                  </h4>
                  <p className="text-red-200 font-semibold tracking-wide mb-4 flex-grow">{item.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-green-400">
                      {item.variants && item.variants.length > 0 ? "A partir " : ""}
                      {item.price ? `R$ ${item.price.toFixed(2)}` : "A partir"}
                    </span>
                    <button
                      onClick={() => handleItemClick(item)}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-4 py-2 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 flex items-center gap-2 shadow-lg"
                    >
                      <Plus size={16} /> {item.variants ? "Opções" : "Adicionar"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Opções para Bebidas */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-red-900 rounded-2xl max-w-sm w-full border border-red-700/30 shadow-2xl overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Escolha o tamanho
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-red-200 hover:text-white p-2 rounded-full hover:bg-red-700/30 transition-all duration-300"
                >
                  <X size={24} /> {/* ✅ AGORA O X ESTÁ DEFINIDO */}
                </button>
              </div>

              {/* Item Info */}
              <div className="text-center mb-6">
                <h4 className="text-white font-bold text-lg mb-2">{selectedItem.name}</h4>
                <p className="text-red-200 text-sm">{selectedItem.description}</p>
              </div>

              {/* Variants */}
              <div className="space-y-3">
                {selectedItem.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantSelect(variant)}
                    className="w-full flex justify-between items-center text-left bg-red-800/30 p-4 rounded-xl border border-red-700/20 hover:bg-red-700/40 transition-all duration-300 group"
                  >
                    <div>
                      <span className="font-bold text-white block">{variant.size}</span>
                      {variant.description && (
                        <span className="text-red-200 text-sm">{variant.description}</span>
                      )}
                    </div>
                    <span className="font-black text-green-400 bg-red-900/50 py-1 px-3 rounded-full group-hover:scale-110 transition-transform">
                      R$ {variant.price.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MenuSection;