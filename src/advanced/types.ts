interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ICartItem extends IProduct {}

interface IDiscountRequestParams {
  cartItems: ICartItem[];
  amount: number;
  itemCount: number;
}

interface IDiscountStrategy {
  name: string;
  calculate: (params: IDiscountRequestParams) => number;
}

export type { IProduct, ICartItem, IDiscountRequestParams, IDiscountStrategy };
