export interface CartItem {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  count: number;
}

export interface GlobalState {
  productList: Product[];
  cartList: CartItem[];
  totalPrice: number;
  totalDiscountRate: number;
}
