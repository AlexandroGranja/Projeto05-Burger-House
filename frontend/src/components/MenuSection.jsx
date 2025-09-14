// components/MenuSection.jsx
import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { categories } from '../data/menuData';

const MenuSection = ({ handleAddItemClick }) => {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ Debug para verificar dados recebidos
  useEffect(() => {
    console.log('🔍 Dados recebidos no MenuSection:');
    console.log('Categorias:', categories);
    
    // Verificar se há refrigerante nos sides
    const hasRefrigerante = categories.sides.items.some(item => 
      item.name.toLowerCase().includes('refrigerante') || 
      item.name.toLowerCase().includes('refri')
    );
    
    if (hasRefrigerante) {
      console.warn('⚠️ REFRIGERANTE ENCONTRADO nos acompanhamentos!');
    }
  }, []);

  // ✅ Função para normalizar caminhos de imagem
  const getImagePath = (imageName) => {
    if (!imageName) return '/images/burger-classico.jpg';
    return imageName.startsWith('/images/') ? imageName : `/images/${imageName}`;
  };

  // ✅ Função para obter preço de exibição
  const getDisplayPrice = (item) => {
    if (item.price) return item.price;
    if (item.variants && item.variants.length > 0) return item.variants[0].price;
    return 0;
  };

  const handleItemClick = (item) => {
    if (item.variants && item.variants.length > 0) {
      setSelectedItem(item);
    } else {
      handleAddItemClick(item);
    }
  };

  const handleVariantSelect = (variant, item) => {
    // Criar um item temporário sem variants para evitar loop
    const itemWithoutVariants = {
      ...item,
      variants: undefined,
      price: variant.price,
      name: `${item.name} (${variant.size})`
    };
    handleAddItemClick(itemWithoutVariants);
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
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 text-sm sm:text-base ${activeCategory === categoryKey
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
            activeCategory === 'burgers' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
            activeCategory === 'sides' ? 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' :
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          } gap-4 sm:gap-6 md:gap-8`}>
            {categories[activeCategory].items.map(item => (
              <div key={item.id} className="bg-red-800/30 backdrop-blur-sm border border-red-700/30 rounded-lg shadow-xl overflow-hidden flex flex-col hover:bg-red-700/40 transition-all duration-300 group">
                {/* Imagem Centralizada */}
                <div className="w-full h-40 sm:h-48 overflow-hidden flex justify-center items-center bg-gradient-to-b from-black/10 to-black/5">
                  <img
                    src={getImagePath(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
                    onError={(e) => {
                      // Fallback para imagens que não carregam
                      if (activeCategory === 'burgers') {
                        e.target.src = '/images/burger-classico.jpg';
                      } else if (activeCategory === 'sides') {
                        e.target.src = '/images/sides-fries.jpg';
                      } else {
                        e.target.src = '/images/Refrigerantes.jpg';
                      }
                    }}
                  />
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h4 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-500 mb-2">
                    {item.name}
                  </h4>
                  <p className="text-red-200 font-semibold tracking-wide mb-3 sm:mb-4 flex-grow text-sm sm:text-base">
                    {item.description}
                  </p>
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 xs:gap-0 mt-auto">
                    <span className="text-xl sm:text-2xl font-bold text-green-400">
                      {item.variants && item.variants.length > 0 ? "A partir de " : ""}
                      R$ {getDisplayPrice(item).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleItemClick(item)}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-3 sm:px-4 py-2 rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base w-full xs:w-auto"
                    >
                      <Plus size={14} className="sm:w-4" /> 
                      <span>{item.variants ? "Opções" : "Adicionar"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Opções para Itens com Variantes */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-red-900 rounded-2xl max-w-sm w-full border border-red-700/30 shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Escolha o tamanho
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-red-200 hover:text-white p-1 sm:p-2 rounded-full hover:bg-red-700/30 transition-all duration-300"
                >
                  <X size={20} className="sm:w-6" />
                </button>
              </div>

              {/* Item Info */}
              <div className="text-center mb-4 sm:mb-6">
                <h4 className="text-white font-bold text-base sm:text-lg mb-2">{selectedItem.name}</h4>
                <p className="text-red-200 text-xs sm:text-sm">{selectedItem.description}</p>
              </div>

              {/* Variants */}
              <div className="space-y-2 sm:space-y-3">
                {selectedItem.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantSelect(variant, selectedItem)}
                    className="w-full flex justify-between items-center text-left bg-red-800/30 p-3 sm:p-4 rounded-xl border border-red-700/20 hover:bg-red-700/40 transition-all duration-300 group"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-white block text-sm sm:text-base truncate">{variant.size}</span>
                      {variant.description && (
                        <span className="text-red-200 text-xs sm:text-sm block truncate">{variant.description}</span>
                      )}
                    </div>
                    <span className="font-black text-green-400 bg-red-900/50 py-1 px-2 sm:px-3 rounded-full group-hover:scale-110 transition-transform text-sm sm:text-base whitespace-nowrap ml-2">
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