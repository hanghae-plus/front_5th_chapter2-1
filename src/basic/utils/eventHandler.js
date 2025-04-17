import { getState, setState } from './state';
import { calculateCart } from './calculateCarts';

/**
 * 장바구니에 상품 추가 처리
 */
export const handleAddToCart = (ui) => {
  const state = getState();
  const selectedProductId = ui.getSelectedProductId();
  const productToAdd = state.products.find((product) => product.id === selectedProductId);

  if (productToAdd && productToAdd.quantity > 0) {
    ui.addItemToCart(productToAdd, 1);

    const updatedProducts = state.products.map((product) => {
      if (product.id === selectedProductId) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    setState({
      ...state,
      products: updatedProducts,
      lastSelectedItem: selectedProductId,
    });

    calculateCart(ui);
  } else if (productToAdd && productToAdd.quantity <= 0) {
    alert('재고가 부족합니다.');
  }
};

/**
 * 장바구니 항목 변경 처리 (수량 증감, 삭제)
 */
export const handleClickCartButton = (event, ui) => {
  const targetElement = event.target;

  if (targetElement.classList.contains('quantity-change') || targetElement.classList.contains('remove-item')) {
    const state = getState();
    const productId = targetElement.dataset.productId;
    const itemElement = document.getElementById(productId);

    // 상태에서 제품 찾기
    const productIndex = state.products.findIndex((product) => product.id === productId);
    if (productIndex === -1) return;

    const product = state.products[productIndex];
    const updatedProducts = [...state.products];

    if (targetElement.classList.contains('quantity-change')) {
      const quantityChange = parseInt(targetElement.dataset.change);
      const currentQuantity = parseInt(itemElement.querySelector('span').textContent.split('x ')[1]);
      const newQuantity = currentQuantity + quantityChange;

      if (newQuantity > 0 && (quantityChange < 0 || newQuantity <= product.quantity + currentQuantity)) {
        itemElement.querySelector('span').textContent =
          itemElement.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;

        updatedProducts[productIndex] = {
          ...product,
          quantity: product.quantity - quantityChange,
        };
      } else if (newQuantity <= 0) {
        itemElement.remove();

        updatedProducts[productIndex] = {
          ...product,
          quantity: product.quantity + currentQuantity,
        };
      } else {
        alert('재고가 부족합니다.');
        return;
      }
    } else if (targetElement.classList.contains('remove-item')) {
      const removedQuantity = parseInt(itemElement.querySelector('span').textContent.split('x ')[1]);

      itemElement.remove();

      updatedProducts[productIndex] = {
        ...product,
        quantity: product.quantity + removedQuantity,
      };
    }

    setState({
      ...state,
      products: updatedProducts,
    });

    calculateCart(ui);
  }
};
