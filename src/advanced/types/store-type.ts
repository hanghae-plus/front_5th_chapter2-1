// 상품 타입
export type Product = {
  id: string;
  name: string;
  val: number;
  q: number;
};

export type CartItem = {
  id: string;
  name: string;
  val: number;
  quantity: number;
};

export type CartStore = {
  products: Product[];
  cart: CartItem[];
  lastSelected: string | null;
  finalTotal: number;
  originalTotal: number;
  itemCount: number;
  discountRate: number;

  // 상태 조작 함수
  setLastSelected: (id: string) => void;
  updateProductPrice: (id: string, newPrice: number) => void;
  addToCart: (productId: string) => void;
  addToCartWithCalc: (productId: string) => void;
  resetCart: () => void;
  calculateCart: () => void;
  changeCartItemQuantity: (productId: string, delta: number) => void;
  removeCartItem: (productId: string) => void;
};
