export interface IProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface ICartProduct extends IProduct {
  quantity: number; // 카트에 담긴 수량
}
