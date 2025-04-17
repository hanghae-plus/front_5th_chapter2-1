import { ElementIds } from '../../../../../shared/app/constants.ts';
import { calculateCart } from '../../logic';
import { updateLastSelValue } from '../../../../store/lastSel.js';
import {
  decreaseProductQuantity,
  findProduct,
  getProductList,
  Product,
  updateProductList,
} from '../../../../../shared/store/productList.js';
import {
  addExistingItemInCart,
  addNewItemInCart,
  Cart,
  CartItem,
  findItemIndex,
  getCart,
  updateCart,
} from '../../../../../shared/store/cart';
import { updateCartItemQuantity } from '../CartDisplay/logic.ts';

function createNewCartItem(itemToAdd: Product, quantity?: number) {
  const $newItem = document.createElement('div');
  $newItem.id = itemToAdd.id;
  $newItem.className = 'flex justify-between items-center mb-2';
  $newItem.innerHTML =
    `<span>${itemToAdd.name} - ${itemToAdd.val}원 x ${quantity ?? 1}</span>` +
    `<div><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>` +
    `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>` +
    `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button></div>`;

  return $newItem;
}

function addExistingItem(cart: Cart, itemIndex: number, itemToAdd: Product) {
  const { productId, quantity }: CartItem = cart[itemIndex];
  const newQty = quantity + 1;
  const { q: productQuantity } = itemToAdd;

  if (newQty <= productQuantity) {
    //충분한 수량이 존재하므로 카트의 수량 up
    const newCart = addExistingItemInCart(cart, productId);
    updateCart(newCart);

    // DOM 업데이트
    updateCartItemQuantity(productId, newQty);

    //재고(productList) 에서는 수량 down
    const productList = getProductList();
    const newProductList = decreaseProductQuantity(productList, itemToAdd.id);
    updateProductList(newProductList);
  } else {
    alert('재고가 부족합니다.');
  }
}

function addNewItemToCart(cart: Cart, itemToAdd: Product) {
  const newCart = addNewItemInCart(cart, itemToAdd.id);
  updateCart(newCart);

  // 새 아이템만 추가
  const $cartDisplay = document.getElementById(
    ElementIds.CART_DISP,
  ) as HTMLElement;
  const $newItem = createNewCartItem(itemToAdd, 1);
  $cartDisplay.appendChild($newItem);

  const productList = getProductList();
  const newProductList = decreaseProductQuantity(productList, itemToAdd.id);
  updateProductList(newProductList);
}

function updateCartAndProduct(itemToAdd: Product) {
  const cart = getCart();
  const itemIndex = findItemIndex(cart, itemToAdd.id);
  if (itemIndex >= 0) {
    // 이미 카트에 있음. 수량만 추가
    addExistingItem(cart, itemIndex, itemToAdd);
    return;
  }

  //카트에 없는 아이템. 아이템 새로 추가
  addNewItemToCart(cart, itemToAdd);
}

function getProductToAdd(): Product | undefined {
  const $sel = document.getElementById(ElementIds.SEL) as HTMLSelectElement;
  const selectedProductId = $sel.value;

  const productList = getProductList();
  return findProduct(productList, selectedProductId);
}

export function handleClickAddBtn() {
  const itemToAdd = getProductToAdd();

  if (!itemToAdd || itemToAdd.q <= 0) {
    return;
  }

  updateCartAndProduct(itemToAdd);
  calculateCart();
  updateLastSelValue(itemToAdd.id);
}

/**
 * 최신 상태의 cart를 기반으로 내부 item들을 다시 그려주는 함수
 */
export function renderCartDomFromCart() {
  const $cartDisplay = document.getElementById(
    ElementIds.CART_DISP,
  ) as HTMLElement;

  $cartDisplay.innerHTML = '';

  const cart = getCart();
  cart.forEach((item: CartItem) => {
    const productList = getProductList();
    const product = findProduct(productList, item.productId) as Product;
    const $item = createNewCartItem(product, item.quantity);
    $cartDisplay.appendChild($item);
  });
}
