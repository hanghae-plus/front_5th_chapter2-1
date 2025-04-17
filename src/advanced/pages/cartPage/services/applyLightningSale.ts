import { Product } from '../../../types';

export function applyLightningSale(
  products: Product[],
  updateSelectOptions: (products: Product[]) => void,
  lightningSaleRate = 0.2
) {
  const luckyItemIndex = Math.floor(Math.random() * products.length);
  const luckyItem = products[luckyItemIndex];

  if (luckyItem.stock > 0) {
    const message = `번개세일! ${luckyItem.name}이(가) ${lightningSaleRate * 100}% 할인 중입니다!`;

    alert(message);

    const updatedProducts = products.map((product, index) =>
      index === luckyItemIndex
        ? { ...product, price: Math.round(product.price * (1 - lightningSaleRate)) }
        : product
    );

    updateSelectOptions(updatedProducts);
  }
}
