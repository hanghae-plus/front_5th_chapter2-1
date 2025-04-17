import { Product } from '../../../types';

export function suggestProduct(
  productsOptions: Product[],
  lastSelectedItemId: string | null,
  setProductsOptions: (products: Product[]) => void,
  suggestRate = 0.05
) {
  if (lastSelectedItemId) {
    const suggestItem = productsOptions.find(
      (item) => item.id !== lastSelectedItemId && item.stock > 0
    );

    if (suggestItem) {
      const message = `${suggestItem.name}은(는) 어떠세요? 지금 구매하시면 ${suggestRate * 100}% 추가 할인!`;

      alert(message);

      const updatedProducts = productsOptions.map((item) =>
        item.id === suggestItem.id
          ? { ...item, price: Math.round(item.price * (1 - suggestRate)) }
          : item
      );

      setProductsOptions(updatedProducts);
    }
  }
}
