import React from 'react';
import { X, MapPin, Phone, CreditCard, User } from 'lucide-react';

const CheckoutModal = ({ show, closeCheckout, customerData, setCustomerData, getTotalPrice, handleOrderSubmit }) => {
  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-red-900 rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col border border-red-700/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-red-700/30 bg-red-800/20">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Finalizar Pedido
            </h3>
            <button 
              onClick={closeCheckout} 
              className="text-red-200 hover:text-white p-2 rounded-full hover:bg-red-700/30 transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Form */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-red-200 font-semibold mb-2 flex items-center gap-2">
                <User size={16} />
                Nome Completo
              </label>
              <input 
                type="text" 
                name="name" 
                required 
                value={customerData.name} 
                onChange={handleInputChange} 
                className="w-full bg-red-800/30 border border-red-700/30 rounded-xl px-4 py-3 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <div>
              <label className="block text-red-200 font-semibold mb-2 flex items-center gap-2">
                <Phone size={16} />
                Telefone/WhatsApp
              </label>
              <input 
                type="tel" 
                name="phone" 
                required 
                value={customerData.phone} 
                onChange={handleInputChange} 
                className="w-full bg-red-800/30 border border-red-700/30 rounded-xl px-4 py-3 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="(21) 99999-9999"
              />
            </div>
            
            <div>
              <label className="block text-red-200 font-semibold mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Endereço de Entrega
              </label>
              <input 
                type="text" 
                name="address" 
                required 
                value={customerData.address} 
                onChange={handleInputChange} 
                className="w-full bg-red-800/30 border border-red-700/30 rounded-xl px-4 py-3 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Rua, número"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-red-200 font-semibold mb-2">Bairro</label>
                <input 
                  type="text" 
                  name="neighborhood" 
                  required 
                  value={customerData.neighborhood} 
                  onChange={handleInputChange} 
                  className="w-full bg-red-800/30 border border-red-700/30 rounded-xl px-4 py-3 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              
              <div>
                <label className="block text-red-200 font-semibold mb-2">Complemento</label>
                <input 
                  type="text" 
                  name="complement" 
                  value={customerData.complement} 
                  onChange={handleInputChange} 
                  className="w-full bg-red-800/30 border border-red-700/30 rounded-xl px-4 py-3 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Opcional"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-red-200 font-semibold mb-2 flex items-center gap-2">
                <CreditCard size={16} />
                Forma de Pagamento
              </label>
              <select 
                name="paymentMethod" 
                value={customerData.paymentMethod} 
                onChange={handleInputChange} 
                className="w-full bg-red-800/30 border border-red-700/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="dinheiro">💵 Dinheiro</option>
                <option value="cartao">💳 Cartão (crédito/débito)</option>
                <option value="pix">📱 PIX</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-red-700/30 bg-red-800/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-red-200 font-semibold">Total do Pedido:</span>
            <span className="text-2xl font-black text-green-400">R$ {getTotalPrice().toFixed(2)}</span>
          </div>
          <button
            type="button"
            onClick={handleOrderSubmit}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-black hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            ✅ Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;