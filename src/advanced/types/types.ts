export type ProductInfo = {
  id: string;
  name: string;
  price: number;
  stock: number;
  quantity: number;
};

export type CartInfo = {
  lastSaleItem: string | null;
  productList: ProductInfo[];
};
