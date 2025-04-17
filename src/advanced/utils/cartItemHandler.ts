import { products } from '../data/products';
import { updateCartTotal } from './updateCartTotal.ts';

export const handleCartItemClick = (
  event: MouseEvent,
  $cartList: HTMLElement,
  $cartTotalPrice: HTMLElement,
  $stockStatus: HTMLElement,
): void => {
  const $clickedButton = event.target as HTMLElement;

  const isQuantityChange = $clickedButton.classList.contains('quantity-change');
  const isRemoveItem = $clickedButton.classList.contains('remove-item');

  if (!isQuantityChange && !isRemoveItem) {
    return;
  }

  const selectedProductId = $clickedButton.dataset.productId;
  if (!selectedProductId) return;

  const $cartItem = document.getElementById(selectedProductId);
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  if (!selectedProduct || !$cartItem) {
    return;
  }

  if (isQuantityChange) {
    const qtyChange = parseInt($clickedButton.dataset.change || '0');
    const currentQuantity = parseInt(
      $cartItem.querySelector('span')?.textContent?.split('x ')[1] || '0',
    );
    const updatedQuantity = currentQuantity + qtyChange;
    const availableStock = selectedProduct.quantity + currentQuantity;

    if (updatedQuantity <= 0) {
      $cartItem.remove();
      selectedProduct.quantity -= qtyChange;
      updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);
      return;
    }

    if (updatedQuantity > availableStock) {
      alert('재고가 부족합니다.');
      return;
    }

    const $span = $cartItem.querySelector('span');
    if ($span) {
      $span.textContent = `${$span.textContent?.split('x ')[0]}x ${updatedQuantity}`;
    }
    selectedProduct.quantity -= qtyChange;
  }

  if (isRemoveItem) {
    const currentQuantity = parseInt(
      $cartItem.querySelector('span')?.textContent?.split('x ')[1] || '0',
    );
    selectedProduct.quantity += currentQuantity;
    $cartItem.remove();
  }

  updateCartTotal($cartList, products, $cartTotalPrice, $stockStatus);
};
