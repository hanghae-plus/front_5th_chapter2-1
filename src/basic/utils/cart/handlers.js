import { renderCart } from "../../components/cart";
import { cartStore, productStore, uiStore } from "../../stores";
import { decreaseProductStock, getProductById, increaseProductStock } from "../product";
import { addItem, getCartItemById, removeCartItem, updateCartItemQuantity } from "./index";

/**
 * 장바구니에 상품을 추가합니다.
 *
 * @param {string} productId - 추가할 상품의 ID
 * @param {Product} product - 추가할 상품 정보
 */
const updateCart = (productId, product) => {
  const existingItem = getCartItemById(productId);
  let updatedCartItems;

  if (existingItem) {
    updatedCartItems = updateCartItemQuantity(productId, existingItem.quantity + 1);
  } else {
    updatedCartItems = addItem(productId, product.name, product.price, 1);
  }

  cartStore.setCartItems(updatedCartItems);
};

/**
 * 상품 재고를 감소시킵니다.
 *
 * @param {string} productId - 재고를 감소시킬 상품의 ID
 */
const updateProductStock = (productId) => {
  const decreasedProductList = decreaseProductStock(productId, 1);
  productStore.setProductList(decreasedProductList);
};

/**
 * UI 상태를 업데이트합니다.
 *
 * @param {string} productId - 선택된 상품의 ID
 */
const updateUIState = (productId) => {
  renderCart();
  uiStore.setLastSelectedProduct(productId);
};

/**
 * 장바구니에 상품 추가 클릭 이벤트 핸들러를 생성합니다.
 *
 * @param {HTMLSelectElement} selectElement - 상품 선택 요소
 * @returns {Function} 장바구니 추가 이벤트 핸들러
 */
export const handleAddToCart = (selectElement) => () => {
  const selectedId = selectElement.value;
  const product = getProductById(selectedId);

  if (!product) return;

  if (product.quantity <= 0) {
    alert("재고가 부족합니다.");
    return;
  }

  updateCart(selectedId, product);
  updateProductStock(selectedId);
  updateUIState(selectedId);
};

/**
 * 장바구니에서 상품을 제거합니다.
 *
 * @param {string} productId - 제거할 상품의 ID
 * @param {number} quantity - 제거할 상품의 수량
 */
const handleRemoveCartItem = (productId, quantity) => {
  const updatedCartItems = removeCartItem(productId);
  cartStore.setCartItems(updatedCartItems);

  const updatedProductList = increaseProductStock(productId, quantity);
  productStore.setProductList(updatedProductList);

  renderCart();
};

/**
 * 장바구니에서 상품 수량을 증가시킵니다.
 *
 * @param {string} productId - 수량을 증가시킬 상품의 ID
 * @param {CartItem} cartItem - 장바구니 아이템 정보
 * @param {Product} product - 상품 정보
 * @param {number} newQuantity - 새로운 수량
 */
const handleQuantityIncrease = (productId, cartItem, product, newQuantity) => {
  const availableStock = product.quantity + cartItem.quantity;

  if (newQuantity > availableStock) {
    alert("재고가 부족합니다.");
    return;
  }

  const updatedCartItems = updateCartItemQuantity(productId, newQuantity);
  cartStore.setCartItems(updatedCartItems);

  const updatedProductList = decreaseProductStock(productId, 1);
  productStore.setProductList(updatedProductList);

  renderCart();
};

/**
 * 장바구니에서 상품 수량을 감소시킵니다.
 *
 * @param {string} productId - 수량을 감소시킬 상품의 ID
 * @param {number} change - 변경 수량 (음수값)
 * @param {number} newQuantity - 새로운 수량
 */
const handleQuantityDecrease = (productId, change, newQuantity) => {
  const updatedCartItems = updateCartItemQuantity(productId, newQuantity);
  cartStore.setCartItems(updatedCartItems);

  const updatedProductList = increaseProductStock(productId, Math.abs(change));
  productStore.setProductList(updatedProductList);

  renderCart();
};

/**
 * 장바구니 아이템 관련 이벤트를 처리합니다.
 *
 * @param {Event} event - 처리할 이벤트 객체
 */
export const handleCartItemEvents = (event) => {
  const target = event.target;
  const isQuantityChangeButton = target.classList.contains("quantity-change");
  const isRemoveItemButton = target.classList.contains("remove-item");

  if (!isQuantityChangeButton && !isRemoveItemButton) return;

  const productId = target.dataset.productId;
  const cartItem = getCartItemById(productId);
  const product = getProductById(productId);

  if (!cartItem || !product) return;

  if (isRemoveItemButton) {
    handleRemoveCartItem(productId, cartItem.quantity);
    return;
  }

  const change = Number.parseInt(target.dataset.change, 10);
  const newQuantity = cartItem.quantity + change;

  if (newQuantity <= 0) {
    handleRemoveCartItem(productId, cartItem.quantity);
    return;
  }

  if (change > 0) {
    handleQuantityIncrease(productId, cartItem, product, newQuantity);
    return;
  }

  handleQuantityDecrease(productId, change, newQuantity);
};
