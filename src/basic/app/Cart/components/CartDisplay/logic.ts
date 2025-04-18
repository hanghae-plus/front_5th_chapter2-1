import { calculateCart } from '../../logic.ts';
import {
  decreaseProductQuantity,
  findProduct,
  getProductList,
  Product,
  updateProductList,
} from '../../../../../shared/store/productList.js';
import {
  Cart,
  deleteItemFromCart,
  findItemIndex,
  getCart,
  updateCart,
} from '../../../../../shared/store/cart.ts';
import { getCartItemText } from '../../../../../shared/app/Cart/calculation.ts';

const handleRemoveItem = (
  cart: Cart,
  productList: Product[],
  productId: string,
  itemIndex: number,
): { cart: Cart; productList: Product[] } => {
  const item = cart[itemIndex];
  const newCart = deleteItemFromCart(cart, itemIndex);
  // 삭제된 아이템의 수량만큼 재고를 되돌림
  const newProductList = decreaseProductQuantity(
    productList,
    productId,
    -item.quantity,
  );
  return { cart: newCart, productList: newProductList };
};

const isValidTarget = (target: HTMLElement): boolean =>
  target.classList.contains('quantity-change') ||
  target.classList.contains('remove-item');

// 수량 변경 시 해당 아이템의 텍스트만 업데이트
export function updateCartItemQuantity(productId: string, quantity: number) {
  const item = document.getElementById(productId);
  if (!item) return;

  const product = findProduct(getProductList(), productId);
  if (!product) return;

  const span = item.querySelector('span');
  if (span) {
    span.textContent = getCartItemText({
      name: product.name,
      value: product.val,
      quantity,
    });
  }
}

// 아이템 삭제 시 해당 아이템만 제거
function removeCartItem(productId: string) {
  const item = document.getElementById(productId);
  if (item) {
    item.remove();
  }
}

export const handleClickCartDisp = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;

  if (!isValidTarget(target)) return;

  const productId = target.dataset.productId;
  if (!productId) return;

  const cart = getCart();
  const productList = getProductList();
  const itemIndex = findItemIndex(cart, productId);

  if (itemIndex === -1) return;

  let result;
  if (target.classList.contains('quantity-change')) {
    const quantityChange = parseInt(target.dataset.change || '0');
    const product = findProduct(productList, productId);

    if (!product) return;

    // 현재 수량과 증가할 수량의 합이 재고를 초과하는지 확인
    if (quantityChange > product.q) {
      alert('재고가 부족합니다.');
      return;
    }

    // 직접 수량을 증가시키고 상태를 업데이트
    const newCart = cart.map((item, i) => {
      if (i === itemIndex) {
        const newQuantity = item.quantity + quantityChange;
        // DOM 업데이트
        updateCartItemQuantity(productId, newQuantity);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    const newProductList = decreaseProductQuantity(
      productList,
      productId,
      quantityChange,
    );

    updateCart(newCart);
    updateProductList(newProductList);
  } else {
    result = handleRemoveItem(cart, productList, productId, itemIndex);
    updateCart(result.cart);
    updateProductList(result.productList);
    // DOM에서 아이템 제거
    removeCartItem(productId);
  }

  calculateCart();
};
