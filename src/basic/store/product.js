const products = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
];

export const PRODUCT = {
  items: products,

  getAll: () => PRODUCT.items,
  getById: (id) => PRODUCT.items.find((product) => product.id === id),
  getRandomItem: () => PRODUCT.items[Math.floor(Math.random() * PRODUCT.items.length)],
  getSuggestedProduct: (excludeId) => PRODUCT.items.find((item) => item.id !== excludeId && item.quantity > 0),
  getDiscountRate: (productId) => {
    switch (productId) {
      case 'p1':
        return 0.1;

      case 'p2':
        return 0.15;

      case 'p3':
        return 0.2;

      case 'p4':
        return 0.05;

      case 'p5':
        return 0.25;

      default:
        return 0;
    }
  },

  updateQuantity: (id, change) => {
    const product = PRODUCT.getById(id);

    if (product && product.quantity + change >= 0) {
      product.quantity += change;
    }
  },
  applyDiscount: (id, discountRate) => {
    const product = PRODUCT.getById(id);

    if (product) {
      product.price = Math.round(product.price * (1 - discountRate));
    }
  },
};
