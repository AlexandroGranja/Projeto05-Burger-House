import React from 'react';
import { X } from 'lucide-react';

const OptionsModal = ({ item, addToCart, closeModal }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-red-900 rounded-2xl max-w-sm w-full border border-red-700/30 shadow-2xl overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Escolha o tamanho
            </h3>
            <button
              onClick={closeModal}
              className="text-red-200 hover:text-white p-2 rounded-full hover:bg-red-700/30 transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Item Info */}
          <div className="text-center mb-6">
            <h4 className="text-white font-bold text-lg mb-2">{item.name}</h4>
            <p className="text-red-200 text-sm">{item.description}</p>
          </div>
          
          {/* Variants */}
          <div className="space-y-3">
            {item.variants && item.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => {
                  addToCart(item, variant);
                  closeModal();
                }}
                className="w-full flex justify-between items-center text-left bg-red-800/30 p-4 rounded-xl border border-red-700/20 hover:bg-red-700/40 transition-all duration-300 group"
              >
                <div>
                  <span className="font-bold text-white block">{variant.size}</span>
                  {variant.description && (
                    <span className="text-red-200 text-sm">{variant.description}</span>
                  )}
                </div>
                <span className="font-black text-green-400 bg-red-900/50 py-1 px-3 rounded-full group-hover:scale-110 transition-transform">
                  R$ {variant.price?.toFixed(2) || '0.00'}
                </span>
              </button>
            ))}
          </div>

          {/* Botão de ação rápida se não houver variants */}
          {(!item.variants || item.variants.length === 0) && (
            <button
              onClick={() => {
                addToCart(item);
                closeModal();
              }}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 py-3 rounded-xl font-black hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 mt-4"
            >
              Adicionar ao Carrinho
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;