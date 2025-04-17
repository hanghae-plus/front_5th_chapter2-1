import { getProductById } from "../utils.js";
import { getSelectedProduct } from "../logic/selector.js";
import {
  updateExistingCartItem,
  createNewCartItem,
  handleQuantityChange,
  handleRemoveItem,
} from "../logic/cart.js";
import {
  calculateCart,
  getQuantityFromElement,
} from "../logic/calculateCart.js";

export function bindCartEvents({
  cartItemList,
  productSelector,
  addToCartButton,
  cartTotalEl,
  stockStatusEl,
  context,
}) {
  addToCartButton.addEventListener("click", handleAddToCart);
  cartItemList.addEventListener("click", handleCartItemClick);

  function handleAddToCart() {
    const product = getSelectedProduct(productSelector);
    if (!product || product.units <= 0) {
      alert("상품이 품절되었습니다.");
      return;
    }

    const productEl = document.getElementById(product.id);
    if (productEl) {
      updateExistingCartItem(productEl, product);
    } else {
      const newCartItem = createNewCartItem(product, cartItemList);
      cartItemList.appendChild(newCartItem);
    }

    calculateCart({ cartItemList, cartTotalEl, stockStatusEl });
    context.lastSelectedProductId = product.id;
  }

  function handleCartItemClick(event) {
    const target = event.target;
    const productId = target.dataset.productId;
    if (!productId) return;

    const product = getProductById(productId);
    const itemEl = document.getElementById(productId);
    const currentQuantity = getQuantityFromElement(itemEl);

    const isQuantityChange = target.classList.contains("quantity-change");
    const isRemoveItem = target.classList.contains("remove-item");

    if (isQuantityChange) {
      const change = Number(target.dataset.change);
      handleQuantityChange(product, itemEl, currentQuantity, change);
    }
    if (isRemoveItem) {
      handleRemoveItem(product, itemEl, currentQuantity);
    }

    calculateCart({ cartItemList, cartTotalEl, stockStatusEl });
  }
}
