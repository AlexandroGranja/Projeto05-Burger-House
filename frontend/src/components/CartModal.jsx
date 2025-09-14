import React from 'react';
import { Plus, Minus, X, Trash2 } from 'lucide-react';

const CartModal = ({ show, closeCart, cart, removeFromCart, addToCart, getTotalPrice, handleCheckout }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-red-900 rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col border border-red-700/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-red-700/30 bg-red-800/20">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Seu Carrinho
            </h3>
            <button 
              onClick={closeCart} 
              className="text-red-200 hover:text-white p-2 rounded-full hover:bg-red-700/30 transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Items */}
        <div className="p-6 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-red-200 text-6xl mb-4">🛒</div>
              <p className="text-red-200 font-semibold">Seu carrinho está vazio.</p>
              <p className="text-red-300 text-sm mt-2">Adicione itens deliciosos para continuar!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-red-800/20 backdrop-blur-sm border border-red-700/20 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{item.name}</h4>
                      {item.variant && (
                        <p className="text-red-200 text-sm">{item.variant.size}</p>
                      )}
                      <p className="text-green-400 font-semibold">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, true)}
                      className="text-red-300 hover:text-white p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-red-700/30 rounded-full p-1">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 transition-colors"
                      >
                        <Minus size={14} className="text-white" />
                      </button>
                      <span className="text-white font-bold min-w-[20px] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => {
                          // Criar um item sem variants para evitar problemas
                          const itemToAdd = { ...item, variants: undefined };
                          addToCart(itemToAdd);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 transition-colors"
                      >
                        <Plus size={14} className="text-white" />
                      </button>
                    </div>
                    <span className="text-white font-bold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-red-700/30 bg-red-800/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-red-200 font-semibold">Subtotal:</span>
              <span className="text-2xl font-black text-green-400">R$ {getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 py-4 rounded-xl font-black hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;