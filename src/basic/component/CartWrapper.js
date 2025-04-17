import {
  CartProducts,
  CartTotal,
  CartTitle,
  ProductSelect,
  ProductAddButton,
  CartStockInfo,
} from '../component';

export const CartWrapper = () => {
  const div = document.createElement('div');
  div.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  div.appendChild(CartTitle());
  div.appendChild(CartProducts());
  div.appendChild(CartTotal());
  div.appendChild(ProductSelect());
  div.appendChild(ProductAddButton());
  div.appendChild(CartStockInfo());

  return div;
};
