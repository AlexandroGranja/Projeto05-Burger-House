import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartButton = ({ cart, setShowCart }) => {
  if (cart.length === 0) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => setShowCart(true)}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 p-4 rounded-full shadow-2xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 z-40 flex items-center gap-2 group animate-bounce"
    >
      <div className="relative">
        <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white shadow-lg">
          {totalItems}
        </span>
      </div>
      <span className="font-bold hidden sm:inline">Ver Carrinho</span>
      <span className="font-bold text-sm ml-1 hidden sm:inline">• R$ {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
    </button>
  );
};

export default CartButton;