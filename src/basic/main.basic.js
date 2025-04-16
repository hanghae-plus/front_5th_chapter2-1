import { products, discountRateMap } from "./constants.js";
import {
  scheduleFlashSale,
  scheduleRecommendationSale,
} from "./helpers/scheduleTask.js";

let productSelector, addToCartButton, cartItemList, cartTotal, stockStatus;
let lastSelectedProductId,
  bonusPts = 0,
  finalTotal = 0,
  totalItemsInCart = 0;

main();
addEventListener();

function main() {
  render();
  updateProductSelector();
  calculateCart();
  triggerRandomSales();
}

function render() {
  const root = document.getElementById("app");
  const cont = document.createElement("div");
  const wrap = document.createElement("div");
  const hTxt = document.createElement("h1");

  cartItemList = document.createElement("div");
  cartTotal = document.createElement("div");
  productSelector = document.createElement("select");
  addToCartButton = document.createElement("button");
  stockStatus = document.createElement("div");

  cartItemList.id = "cart-items";
  cartTotal.id = "cart-total";
  productSelector.id = "product-select";
  addToCartButton.id = "add-to-cart";
  stockStatus.id = "stock-status";
  cont.className = "bg-gray-100 p-8";
  wrap.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  hTxt.className = "text-2xl font-bold mb-4";
  cartTotal.className = "text-xl font-bold my-4";
  productSelector.className = "border rounded p-2 mr-2";
  addToCartButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
  stockStatus.className = "text-sm text-gray-500 mt-2";
  hTxt.textContent = "장바구니";
  addToCartButton.textContent = "추가";

  wrap.appendChild(hTxt);
  wrap.appendChild(cartItemList);
  wrap.appendChild(cartTotal);
  wrap.appendChild(productSelector);
  wrap.appendChild(addToCartButton);
  wrap.appendChild(stockStatus);
  cont.appendChild(wrap);
  root.appendChild(cont);
}

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
      calculateCart();
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

    calculateCart();
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

function calculateCart() {
  const cartItems = getCartItems();
  let originalTotal = 0;
  finalTotal = 0;
  totalItemsInCart = 0;

  cartItems.forEach(({ id, units }) => {
    const product = getProductById(id);
    const amount = product.price * units;
    const discountRate = getItemDiscountRate(units, product.id);

    totalItemsInCart += units;
    originalTotal += amount;
    finalTotal += amount * (1 - discountRate);
  });

  const discountRate = getDiscountRate({
    originalTotal,
    finalTotal,
    totalItemsInCart,
  });

  // TODO: 함수 시작 동사를 update로 할지 render로 할지 고민
  updateCartTotal(finalTotal, discountRate);
  updateStockStatus();
  updateLoyaltyPoints();
}

function updateCartTotal(finalTotal, discountRate) {
  cartTotal.textContent = `총액: ${Math.round(finalTotal)}원`;
  if (discountRate > 0) {
    const discountText = document.createElement("span");
    discountText.className = "text-green-500 ml-2";
    discountText.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotal.appendChild(discountText);
  }
}

function getCartItems() {
  const cartItems = Array.from(cartItemList.children);

  return cartItems.map((el) => {
    const id = el.id;
    const units = parseInt(el.querySelector("span").textContent.split("x ")[1]);

    return { id, units };
  });
}

function getItemDiscountRate(units, productId) {
  if (units < 10) return 0;

  return discountRateMap[productId] ?? 0;
}

function getDiscountRate({ originalTotal, finalTotal, totalItemsInCart }) {
  let rate = (originalTotal - finalTotal) / originalTotal;

  if (totalItemsInCart >= 30) {
    const maxBulkDiscountAmount = originalTotal * 0.25;
    if (maxBulkDiscountAmount > originalTotal - finalTotal) {
      finalTotal = originalTotal * (1 - 0.25);
      rate = 0.25;
    }
  }

  const isTuesday = new Date().getDay() === 2;
  if (isTuesday) {
    finalTotal *= 0.9;
    rate = Math.max(rate, 0.1);
  }
  return rate;
}

function updateLoyaltyPoints() {
  bonusPts = Math.floor(finalTotal / 1000);
  let points = document.getElementById("loyalty-points");

  if (!points) {
    points = document.createElement("span");
    points.id = "loyalty-points";
    points.className = "text-blue-500 ml-2";
    cartTotal.appendChild(points);
  }
  points.textContent = "(포인트: " + bonusPts + ")";
}

function updateStockStatus() {
  const limitUnits = 5;
  let statusMessage = "";

  const checkStockStatus = (item) => {
    if (item.units < limitUnits) {
      const stockMessage =
        item.units > 0 ? `재고 부족 (${item.units}개 남음)` : "품절";
      statusMessage += item.name + ": " + stockMessage + "\n";
    }
  };

  products.forEach(checkStockStatus);
  stockStatus.textContent = statusMessage;
}
