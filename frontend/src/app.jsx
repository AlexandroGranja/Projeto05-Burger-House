import React, { useState } from 'react';

// Importando os dados
import { menuItems, sides } from './data/menuData';

// Importando os componentes
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import Footer from './components/Footer';
import CartButton from './components/CartButton';
import OptionsModal from './components/OptionsModal';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';

function App() {
  // O estado e a lógica de negócio ficam no componente pai (App)
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    complement: '',
    paymentMethod: 'dinheiro'
  });
  const [selectedItemWithOptions, setSelectedItemWithOptions] = useState(null);

  const addToCart = (item, variant = null) => {
    // Se o item já tem o nome modificado (com tamanho), usar o ID original + nome
    const cartItemId = variant ? `${item.id}-${variant.size}` : 
                      item.name.includes('(') ? `${item.id}-${item.name.split('(')[1].split(')')[0].trim()}` : 
                      item.id;
    
    const existingItem = cart.find(cartItem => cartItem.id === cartItemId);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === cartItemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      const newItem = {
        ...item,
        id: cartItemId,
        name: variant ? `${item.name} (${variant.size})` : item.name,
        price: variant ? variant.price : item.price,
        quantity: 1,
        variants: undefined // Remove a chave 'variants' do item do carrinho
      };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const handleAddItemClick = (item) => {
    if (item.variants) {
      setSelectedItemWithOptions(item);
    } else {
      addToCart(item);
    }
  };

  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderSubmit = async () => {
    if (!customerData.name || !customerData.phone || !customerData.address || !customerData.neighborhood) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const orderDetails = {
      items: cart,
      total: getTotalPrice(),
      customer: customerData,
      // ✅ ADICIONE ESTAS LINHAS AQUI
      data_criacao: new Date().toISOString(),
      horario_pedido: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      })
    };
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });
      if (response.ok) {
        alert('Pedido realizado com sucesso!');
        setCart([]);
        setShowCheckout(false);
        setCustomerData({ name: '', phone: '', address: '', neighborhood: '', complement: '', paymentMethod: 'dinheiro' });
      } else {
        alert('Ocorreu um erro ao processar seu pedido no servidor.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Não foi possível conectar ao servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <Hero />
      <MenuSection
        menuItems={menuItems}
        sides={sides}
        handleAddItemClick={handleAddItemClick}
      />
      <Footer />

      <CartButton cart={cart} setShowCart={setShowCart} />

      <OptionsModal
        item={selectedItemWithOptions}
        addToCart={addToCart}
        closeModal={() => setSelectedItemWithOptions(null)}
      />

      <CartModal
        show={showCart}
        closeCart={() => setShowCart(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        getTotalPrice={getTotalPrice}
        handleCheckout={handleCheckout}
      />

      <CheckoutModal
        show={showCheckout}
        closeCheckout={() => setShowCheckout(false)}
        customerData={customerData}
        setCustomerData={setCustomerData}
        getTotalPrice={getTotalPrice}
        handleOrderSubmit={handleOrderSubmit}
      />
    </div>
  );
}

export default App;