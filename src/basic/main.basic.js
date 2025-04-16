import { products, discountRateMap } from "./constants.js";
import { calculateCart } from "./helpers/cart.js";
import { mount } from "./helpers/render.js";
import {
  scheduleFlashSale,
  scheduleRecommendationSale,
} from "./helpers/scheduleTask.js";

let lastSelectedProductId;
let [cartItemList, cartTotal, productSelector, addToCartButton, stockStatus] =
  mount();

updateProductSelector();
calculateCart({ cartItemList, cartTotal, stockStatus });
triggerRandomSales();
addEventListener();

function triggerRandomSales() {
  scheduleFlashSale({ onSale: updateProductSelector });
  scheduleRecommendationSale({
    productId: lastSelectedProductId,
    onSale: updateProductSelector,
  });
}

function addEventListener() {
  addToCartButton.addEventListener("click", function () {
    const selectedProduct = getSelectedProduct();
    if (!selectedProduct || selectedProduct.units <= 0) {
      alert("상품이 품절되었습니다.");
    } else {
      const cartItem = document.getElementById(selectedProduct.id);
      if (cartItem) {
        updateExistingCartItem(cartItem, selectedProduct);
      } else {
        createNewCartItem(selectedProduct);
      }
      calculateCart({ cartItemList, cartTotal, stockStatus });
      lastSelectedProductId = selectedProduct.id;
    }
  });

  cartItemList.addEventListener("click", function (event) {
    const target = event.target;
    const isQuantityChanged = target.classList.contains("quantity-change");
    const isRemoved = target.classList.contains("remove-item");

    if (!isQuantityChanged && !isRemoved) return;

    const productId = target.dataset.productId;
    const productElement = document.getElementById(productId);
    const product = getProductById(productId);
    const currentQuantity = getQuantityFromElement(productElement);

    if (isQuantityChanged) {
      const change = parseInt(target.dataset.change);
      handleQuantityChange(product, productElement, currentQuantity, change);
    }
    if (isRemoved) {
      handleRemoveItem(product, productElement, currentQuantity);
    }
    calculateCart({ cartItemList, cartTotal, stockStatus });
  });
}

function getSelectedProduct() {
  const selectedId = productSelector.value;

  return products.find((p) => p.id === selectedId);
}

function handleRemoveItem(product, element, currentQuantity) {
  product.units += currentQuantity;
  element.remove();
}

function getCurrentQuantity(element) {
  const text = element.querySelector("span").textContent;

  return parseInt(text.split("x ")[1]);
}

function updateExistingCartItem(element, product) {
  const currentQuantity = getCurrentQuantity(element);
  const updatedQuantity = currentQuantity + 1;

  if (updatedQuantity <= product.units + currentQuantity) {
    element.querySelector("span").textContent =
      `${product.name} - ${product.price}원 x ${updatedQuantity}`;
    product.units--;
  } else {
    alert("재고가 부족합니다.");
  }
}

function createNewCartItem(product) {
  const newItem = document.createElement("div");
  newItem.id = product.id;
  newItem.className = "flex justify-between items-center mb-2";

  newItem.innerHTML = `
    <span>${product.name} - ${product.price}원 x 1</span>
    <div>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
      <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
    </div>
  `;

  cartItemList.appendChild(newItem);
  product.units--;
}

function getProductById(id) {
  return products.find((p) => p.id === id);
}

function getQuantityFromElement(element) {
  const text = element.querySelector("span").textContent;
  return parseInt(text.split("x ")[1]);
}

function handleQuantityChange(product, element, currentQuantity, change) {
  const updatedQuantity = currentQuantity + change;
  const availableStock = product.units + currentQuantity;

  if (updatedQuantity > 0 && updatedQuantity <= availableStock) {
    const label = element.querySelector("span").textContent.split("x ")[0];
    element.querySelector("span").textContent = `${label}x ${updatedQuantity}`;
    product.units -= change;
  } else if (updatedQuantity <= 0) {
    element.remove();
    product.units -= change;
  } else {
    alert("재고가 부족합니다.");
  }
}

function updateProductSelector() {
  productSelector.innerHTML = "";

  products.forEach(function (item) {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = `${item.name} - ${item.price}원`;
    option.disabled = item.units === 0;

    productSelector.appendChild(option);
  });
}
