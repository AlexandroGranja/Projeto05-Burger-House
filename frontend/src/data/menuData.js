// data/menuData.js

// ✅ Estrutura consistente: todos os itens devem ter a mesma estrutura básica
// ✅ Preços definidos corretamente (item principal ou primeira variante)
// ✅ Caminhos de imagem padronizados

export const menuItems = [
  {
    id: 1,
    name: "Burger Clássico",
    description: "Pão brioche, hambúrguer 180g, queijo cheddar, alface, tomate, cebola roxa.",
    price: 28.90,
    image: "Burger-Classico.png",
    category: "burgers"
  },
  {
    id: 2,
    name: "Bacon Supreme",
    description: "Pão artesanal, hambúrguer 200g, bacon crocante, queijo suíço, molho especial.",
    price: 34.90,
    image: "Bacon-Supreme.png",
    category: "burgers"
  },
  {
    id: 11,
    name: "Frango Crispy",
    description: "Pão brioche, filé de frango empanado super crocante, alface americana e maionese de ervas.",
    price: 29.90,
    image: "Frango-Crispy.png",
    category: "burgers"
  },
  {
    id: 4,
    name: "Double Cheese",
    description: "Pão brioche, dois hambúrguers 150g, queijo cheddar duplo, picles e molho burger.",
    price: 38.90,
    image: "Double-Cheese.png",
    category: "burgers"
  },
  {
    id: 12,
    name: "Calabresa Rústica",
    description: "Pão artesanal, hambúrguer de calabresa, vinagrete, queijo coalho tostado e rúcula.",
    price: 33.90,
    image: "Calabresa-Rustica.png",
    category: "burgers"
  },
  {
    id: 3,
    name: "Veggie Deluxe",
    description: "Pão integral, hambúrguer de grão-de-bico, queijo vegano, rúcula e tomate seco.",
    price: 26.90,
    image: "Veggie-Deluxe.png",
    category: "burgers"
  }
];

export const sides = [
  { 
    id: 7, 
    name: "Batata Frita",
    description: "Porção de batatas fritas crocantes, temperadas com ervas finas.",
    image: "batata.png",
    variants: [
      { size: "Pequena", price: 8.90, description: "Porção individual" },
      { size: "Média", price: 12.90, description: "Para compartilhar" },
      { size: "Grande", price: 16.90, description: "Porção família" }
    ],
    price: 8.90, // ✅ Preço padrão (primeira variante)
    category: "sides"
  },
  { 
    id: 8, 
    name: "Onion Rings", 
    description: "Anéis de cebola empanados e crocantes, servidos com molho barbecue.",
    price: 15.90,
    image: "Onion.png",
    category: "sides"
  },
  { 
    id: 9, 
    name: "Nuggets de Frango", 
    description: "8 unidades de nuggets crocantes de frango, com molho à escolha.",
    price: 14.90,
    image: "Nuggets-de-Frango.png", 
    category: "sides"
  }
];

// ✅ Dados para outras categorias (evita hardcode no componente)
export const drinks = [
  {
    id: 101,
    name: "Refrigerante",
    description: "Coca-Cola, Guaraná, Fanta, Sprite",
    image: "Refrigerantes.jpg",
    variants: [
      { size: "Lata 350ml", price: 6.90, description: "Lata gelada" },
      { size: "600ml", price: 10.90, description: "Garrafa" },
      { size: "1 Litro", price: 14.90, description: "Garrafa família" },
      { size: "2 Litros", price: 18.90, description: "Garrafa party" }
    ],
    price: 6.90,
    category: "drinks"
  },
  {
    id: 102,
    name: "Suco Natural",
    description: "Laranja, Maracujá, Limão, Abacaxi",
    image: "sucos.jpg",
    variants: [
      { size: "Copo 300ml", price: 8.90, description: "Copo individual" },
      { size: "500ml", price: 12.90, description: "Copo grande" },
      { size: "1 Litro", price: 18.90, description: "Jarra individual" }
    ],
    price: 8.90,
    category: "drinks"
  },
  {
    id: 103,
    name: "Milkshake",
    description: "Chocolate, Morango, Baunilha",
    image: "Milkshake.jpg",
    variants: [
      { size: "300ml", price: 12.90, description: "Copo tradicional" },
      { size: "500ml", price: 16.90, description: "Copo grande" },
      { size: "1 Litro", price: 24.90, description: "Compartilhar" }
    ],
    price: 12.90,
    category: "drinks"
  },
  {
    id: 104,
    name: "Cerveja Artesanal",
    description: "IPA, Pilsen, Weiss, Stout",
    image: "Cerveja.png",
    variants: [
      { size: "Long Neck 355ml", price: 14.90, description: "Garrafa" },
      { size: "Lata 473ml", price: 16.90, description: "Lata" },
      { size: "Chopp 300ml", price: 12.90, description: "Chopp gelado" }
    ],
    price: 12.90,
    category: "drinks"
  }
];

export const desserts = [
  {
    id: 201,
    name: "Brownie",
    description: "Brownie de chocolate com sorvete de baunilha e calda",
    price: 10.90,
    image: "Brownie.png", 
    category: "desserts"
  },
  {
    id: 202,
    name: "Torta de Limão",
    description: "Fatia de torta de limão com merengue italiano",
    price: 9.90,
    image: "Torta-de-Limao.png", 
    category: "desserts"
  }
];

// ✅ Categorias organizadas para facilitar a manutenção
export const categories = {
  burgers: {
    name: '🍔 Hambúrgueres Artesanais',
    items: menuItems
  },
  sides: {
    name: '🍟 Acompanhamentos',
    items: sides
  },
  drinks: {
    name: '🥤 Bebidas',
    items: drinks
  },
  desserts: {
    name: '🍰 Sobremesas',
    items: desserts
  }
};