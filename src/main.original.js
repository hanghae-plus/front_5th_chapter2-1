// TODO: 상수로 분리
// 임시메모: price는 보통 제품이나 서비스 1단위당의 금액
// 임시메모: amount는 전체 계산된 금액, price × 수량
const products = [
  { id: "p1", name: "상품1", price: 10000, units: 50 },
  { id: "p2", name: "상품2", price: 20000, units: 30 },
  { id: "p3", name: "상품3", price: 30000, units: 20 },
  { id: "p4", name: "상품4", price: 15000, units: 0 },
  { id: "p5", name: "상품5", price: 25000, units: 10 },
];

let productSelector, addToCartButton, cartItemList, cartTotal, stockStatus;
let lastSel,
  bonusPts = 0,
  finalTotal = 0,
  totalItemsInCart = 0; // TODO: Cart를 뺄지 말지 고민

main();
addEventListener();

// function
function main() {
  render();
  updateProductSelector();
  calculateCart();
  triggerRandomSales();
}

function render() {
  // 요소를 탐색하는 역할
  const root = document.getElementById("app");
  const cont = document.createElement("div");
  const wrap = document.createElement("div");
  const hTxt = document.createElement("h1");

  cartItemList = document.createElement("div");
  cartTotal = document.createElement("div");
  productSelector = document.createElement("select");
  addToCartButton = document.createElement("button");
  stockStatus = document.createElement("div");

  // 스타일 적용
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

  // ------- 요소에 스타일 적용

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
  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.units > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateProductSelector();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        const suggest = products.find(function (item) {
          return item.id !== lastSel && item.units > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggest.price = Math.round(suggest.price * 0.95);
          updateProductSelector();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function addEventListener() {
  // 이벤트
  addToCartButton.addEventListener("click", function () {
    const selItem = productSelector.value;
    const itemToAdd = products.find(function (p) {
      return p.id === selItem;
    });
    if (itemToAdd && itemToAdd.units > 0) {
      const item = document.getElementById(itemToAdd.id);
      if (item) {
        const newQty =
          parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
        if (newQty <= itemToAdd.units) {
          item.querySelector("span").textContent =
            itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;
          itemToAdd.units--;
        } else {
          alert("재고가 부족합니다.");
        }
      } else {
        const newItem = document.createElement("div");
        newItem.id = itemToAdd.id;
        newItem.className = "flex justify-between items-center mb-2";
        newItem.innerHTML =
          "<span>" +
          itemToAdd.name +
          " - " +
          itemToAdd.price +
          "원 x 1</span><div>" +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          itemToAdd.id +
          '" data-change="-1">-</button>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          itemToAdd.id +
          '" data-change="1">+</button>' +
          '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
          itemToAdd.id +
          '">삭제</button></div>';
        cartItemList.appendChild(newItem);
        itemToAdd.units--;
      }
      calculateCart();
      lastSel = selItem;
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

function getProductById(id) {
  return products.find((p) => p.id === id);
}

function getQuantityFromElement(element) {
  const text = element.querySelector("span").textContent;
  return parseInt(text.split("x ")[1]);
}

function setQuantityToElement(element, newQty) {
  const label = element.querySelector("span").textContent.split("x ")[0];
  element.querySelector("span").textContent = `${label}x ${newQty}`;
}

function handleQuantityChange(product, element, currentQuantity, change) {
  const newQty = currentQuantity + change;
  const availableStock = product.units + currentQuantity;

  if (newQty > 0 && newQty <= availableStock) {
    setQuantityToElement(element, newQty);
    product.units -= change;
  } else if (newQty <= 0) {
    element.remove();
    product.units -= change;
  } else {
    alert("재고가 부족합니다.");
  }
}

function handleRemoveItem(product, element, currentQuantity) {
  product.units += currentQuantity;
  element.remove();
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
  const discountRateMap = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  };
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
  if (new Date().getDay() === 2) {
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
