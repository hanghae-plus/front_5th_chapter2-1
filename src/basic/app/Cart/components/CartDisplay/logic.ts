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
  CartItem,
  deleteItemFromCart,
  findItemIndex,
  getCart,
  updateCart,
  addExistingItemInCart,
} from '../../../../../shared/store/cart.ts';
import { renderCartDomFromCart } from '../AddProduct/logic.ts';

type QuantityChangeResult = {
  cart: Cart;
  productList: Product[];
  success: boolean;
  message?: string;
};

const calculateNewQuantity = (currentQuantity: number, change: number): number =>
  currentQuantity + change;

const isValidNewQuantity = (
  newQuantity: number,
  availableStock: number,
  quantityChange: number,
): boolean =>
  newQuantity > 0 && quantityChange > 0 && availableStock >= quantityChange;

const handleQuantityChange = (
  cart: Cart,
  productList: Product[],
  productId: string,
  itemIndex: number,
  quantityChange: number,
): QuantityChangeResult => {
  const product = findProduct(productList, productId);
  if (!product) {
    return { cart, productList, success: false, message: '상품을 찾을 수 없습니다.' };
  }

  const item = cart[itemIndex];
  const newQuantity = calculateNewQuantity(item.quantity, quantityChange);

  if (newQuantity <= 0) {
    const newCart = deleteItemFromCart(cart, itemIndex);
    const newProductList = decreaseProductQuantity(productList, productId, quantityChange);
    return { cart: newCart, productList: newProductList, success: true };
  }

  if (isValidNewQuantity(newQuantity, product.q, quantityChange)) {
    const newCart = addExistingItemInCart(cart, productId, quantityChange);
    const newProductList = decreaseProductQuantity(productList, productId, quantityChange);
    return { cart: newCart, productList: newProductList, success: true };
  }

  return { cart, productList, success: false, message: '재고가 부족합니다.' };
};

const handleRemoveItem = (
  cart: Cart,
  productList: Product[],
  productId: string,
  itemIndex: number,
): { cart: Cart; productList: Product[] } => {
  const item = cart[itemIndex];
  const newCart = deleteItemFromCart(cart, itemIndex);
  // 삭제된 아이템의 수량만큼 재고를 되돌립니다
  const newProductList = decreaseProductQuantity(productList, productId, -item.quantity);
  return { cart: newCart, productList: newProductList };
};

const isValidTarget = (target: HTMLElement): boolean =>
  target.classList.contains('quantity-change') ||
  target.classList.contains('remove-item');

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
    
    result = handleQuantityChange(cart, productList, productId, itemIndex, quantityChange);
    
    if (!result.success && result.message) {
      alert(result.message);
      return;
    }
  } else {
    result = handleRemoveItem(cart, productList, productId, itemIndex);
  }

  updateCart(result.cart);
  updateProductList(result.productList);
  
  
  renderCartDomFromCart();
  calculateCart();
};
