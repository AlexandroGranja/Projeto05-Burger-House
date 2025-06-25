import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartButton = ({ cart, setShowCart }) => {
  if (cart.length === 0) return null;

  return (
    <button
      onClick={() => setShowCart(true)}
      className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40 flex items-center gap-2 animate-bounce"
    >
      <ShoppingCart size={24} />
      <span className="font-bold hidden sm:inline">Ver Carrinho</span>
      <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
        {cart.reduce((sum, item) => sum + item.quantity, 0)}
      </span>
    </button>
  );
};

export default CartButton;