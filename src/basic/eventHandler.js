import { PRODUCTS } from './constant';
import {
  updateCartSummary,
  handleCartItemUpdate,
  removeCartItem,
  updateExistingCartItem,
  addNewCartItem,
  findProductById,
} from './util/cart';

export function setCartEventHandlers() {
  document.getElementById('add-to-cart').addEventListener('click', handleAddToCart);
  document.getElementById('cart-items').addEventListener('click', handleCartItemsClick);
}

function handleAddToCart() {
  const $productSelect = document.getElementById('product-select');
  const selectedProductId = $productSelect.value;
  const product = findProductById(selectedProductId);
  if (!product || product.stock <= 0) return;

  const $existingCartItem = document.getElementById(product.id);
  if ($existingCartItem) {
    updateExistingCartItem($existingCartItem, product);
  } else {
    addNewCartItem(product);
  }

  updateCartSummary();
}

function handleCartItemsClick(event) {
  const tgt = event.target;

  const prodId = tgt.dataset.productId;
  const itemElem = document.getElementById(prodId);
  const prod = PRODUCTS.find(function (p) {
    return p.id === prodId;
  });

  if (tgt.classList.contains('quantity-change')) {
    handleCartItemUpdate(itemElem, tgt, prod);
  } else if (tgt.classList.contains('remove-item')) {
    removeCartItem(itemElem, prod);
  }

  updateCartSummary();
}
