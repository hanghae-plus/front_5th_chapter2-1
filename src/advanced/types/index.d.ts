interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  bulkDiscountRate: number;
}

interface CartItem extends Product {
  quantity: number;
}
