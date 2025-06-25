export const menuItems = [
  {
    id: 1,
    name: "Burger Clássico",
    description: "Pão brioche, hambúrguer 180g, queijo cheddar, alface, tomate, cebola roxa.",
    price: 28.90,
    image: "/images/burger-classico.jpg" 
  },
  {
    id: 2,
    name: "Bacon Supreme",
    description: "Pão artesanal, hambúrguer 200g, bacon crocante, queijo suíço, molho especial.",
    price: 34.90,
    image: "/images/burger-bacon.jpg"
  },
  {
    id: 11,
    name: "Frango Crispy",
    description: "Pão brioche, filé de frango empanado super crocante, alface americana e maionese de ervas.",
    price: 29.90,
    image: "/images/burger-chicken.jpg"
  },
  {
    id: 4,
    name: "Double Cheese",
    description: "Pão brioche, dois hambúrguers 150g, queijo cheddar duplo, picles e molho burger.",
    price: 38.90,
    image: "/images/burger-double.jpg"
  },
  {
    id: 12,
    name: "Calabresa Rústica",
    description: "Pão artesanal, hambúrguer de calabresa, vinagrete, queijo coalho tostado e rúcula.",
    price: 33.90,
    image: "/images/burger-calabresa.jpg"
  },
  {
    id: 3,
    name: "Veggie Deluxe",
    description: "Pão integral, hambúrguer de grão-de-bico, queijo vegano, rúcula e tomate seco.",
    price: 26.90,
    image: "/images/burger-veggie.jpg"
  },
];

export const sides = [
  { 
    id: 7, 
    name: "Batata Frita",
    image: "/images/sides-fries.jpg",
    variants: [
      { size: "Pequena", price: 8.90 },
      { size: "Média", price: 12.90 },
      { size: "Grande", price: 16.90 },
    ]
  },
  { 
    id: 8, 
    name: "Onion Rings", 
    price: 15.90,
    image: "/images/sides-onion-rings.jpg"
  },
  { 
    id: 10, 
    name: "Refrigerante",
    image: "/images/sides-soda.jpg",
    variants: [
      { size: "Coca-Cola (Lata)", price: 6.90 },
      { size: "Guaraná (Lata)", price: 6.50 },
      { size: "Coca-Cola (2L)", price: 12.00 },
      { size: "Guaraná (2L)", price: 11.00 },
    ]
  }
];