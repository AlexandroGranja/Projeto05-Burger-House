import React from 'react';
import { X } from 'lucide-react';

const OptionsModal = ({ item, addToCart, closeModal }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Escolha uma opção para {item.name}</h3>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="space-y-3">
            {item.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => {
                  addToCart(item, variant);
                  closeModal();
                }}
                className="w-full flex justify-between items-center text-left bg-gray-100 p-4 rounded-lg hover:bg-red-100 transition-colors"
              >
                <span className="font-semibold">{variant.size}</span>
                <span className="font-bold text-red-600">R$ {variant.price.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;