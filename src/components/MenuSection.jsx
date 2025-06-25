import React from 'react';
import { Plus } from 'lucide-react';

const MenuSection = ({ menuItems, sides, handleAddItemClick }) => {
  return (
    <main id="menu" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nosso Cardápio</h2>
        
        {/* Seção de Hambúrguers (Esta parte já estava correta) */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-red-600">🍔 Hambúrguers Artesanais</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                  <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-red-600">R$ {item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => handleAddItemClick(item)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <Plus size={16} /> Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Acompanhamentos (ESTA É A PARTE QUE FOI CORRIGIDA) */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-red-600">🍟 Acompanhamentos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sides.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
                {/* IMAGEM ADICIONADA AQUI */}
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="text-lg font-bold mb-2 flex-grow">{item.name}</h4>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-lg font-bold text-red-600">
                      {/* Lógica para mostrar "A partir" ou o preço fixo */}
                      {item.price ? `R$ ${item.price.toFixed(2)}` : "A partir"}
                    </span>
                    <button 
                      onClick={() => handleAddItemClick(item)}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                    >
                      <Plus size={16} />
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