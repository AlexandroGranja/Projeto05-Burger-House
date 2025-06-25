import React from 'react';
import { Plus, Minus, X } from 'lucide-react';

const CartModal = ({ show, closeCart, cart, removeFromCart, addToCart, getTotalPrice, handleCheckout }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Seu Carrinho</h3>
            <button onClick={closeCart} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
          </div>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Seu carrinho está vazio.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-3 border-b">
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-red-600">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => removeFromCart(item.id)} className="bg-gray-200 p-1 rounded"><Minus size={14} /></button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="bg-gray-200 p-1 rounded"><Plus size={14} /></button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-lg">R$ {getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
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