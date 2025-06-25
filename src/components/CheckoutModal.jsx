import React from 'react';
import { X } from 'lucide-react';

const CheckoutModal = ({ show, closeCheckout, customerData, setCustomerData, getTotalPrice, handleOrderSubmit }) => {
  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Finalizar Pedido</h3>
            <button onClick={closeCheckout} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
          </div>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome Completo</label>
              <input type="text" name="name" required value={customerData.name} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefone/WhatsApp</label>
              <input type="tel" name="phone" required value={customerData.phone} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" placeholder="(21) 99999-9999" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Endereço</label>
              <input type="text" name="address" required value={customerData.address} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bairro</label>
              <input type="text" name="neighborhood" required value={customerData.neighborhood} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Complemento (opcional)</label>
              <input type="text" name="complement" value={customerData.complement} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Forma de Pagamento</label>
              <select name="paymentMethod" value={customerData.paymentMethod} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2">
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartão</option>
                <option value="pix">PIX</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 border-t">
          <p className="text-lg font-bold mb-4">Total: R$ {getTotalPrice().toFixed(2)}</p>
          <button
            type="button"
            onClick={handleOrderSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;