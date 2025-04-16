import { products } from "../data/products";

const cartState = {
  products: [...products],
  lastSelectedProductId: null,
  bonusPoints: 0,
  totalAmount: 0,
  itemCount: 0,
};
