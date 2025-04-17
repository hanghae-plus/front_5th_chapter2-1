import { ITEM_DISCOUNT_RATES, ITEM_DISCOUNT_START } from "./consts/discounts";
import products from "./consts/products";
import calculateCart from "./events/calculate/calculateCart";
import updateRandomDiscount from "./events/update/updateRandomDiscount";
import updateRecommendation from "./events/update/updateRecommendation";

var addItemBtn, select, cartDiv, sum, stockInfo;
var totalPrice = 0,
  totalEa = 0;

const main = () => {
  // HTML elements 생성
  var root = document.getElementById("app");

  let container = document.createElement("div");
  container.className = "bg-gray-100 p-8";

  var wrapper = document.createElement("div");
  wrapper.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

  let titleText = document.createElement("h1");
  titleText.className = "text-2xl font-bold mb-4";
  titleText.textContent = "장바구니";

  cartDiv = document.createElement("div");
  cartDiv.id = "cart-items";

  sum = document.createElement("div");
  sum.id = "cart-total";
  sum.className = "text-xl font-bold my-4";

  addItemBtn = document.createElement("button");
  addItemBtn.id = "add-to-cart";

  stockInfo = document.createElement("div");
  stockInfo.id = "stock-status";
  stockInfo.className = "text-sm text-gray-500 mt-2";

  select = document.createElement("select");
  select.id = "product-select";
  select.innerHTML = "";
  select.className = "border rounded p-2 mr-2";

  addItemBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addItemBtn.textContent = "추가";

  updateSelectOptions();
  wrapper.appendChild(titleText);
  wrapper.appendChild(cartDiv);
  wrapper.appendChild(sum);
  wrapper.appendChild(select);
  wrapper.appendChild(addItemBtn);
  wrapper.appendChild(stockInfo);
  container.appendChild(wrapper);
  root.appendChild(container);

  // 장바구니 계산
  calculateCart();

  // 랜덤 할인 이벤트 설정
  updateRandomDiscount();
  updateRecommendation();
};

// 상품 추가 시 가격 계산
export const handleAddItem = () => {
  var cartDiv = document.getElementById("cart-items");
  var cartItems = cartDiv.children;

  var noDiscountTotalPrice = 0;
  var totalPrice = 0;
  var totalEa = 0;

  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      var item;

      for (var j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          item = products[j];
          break;
        }
      }
      var itemEa = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1],
      );

      var itemTotalPrice = item.price * itemEa;
      var itemDiscountRate = 0;
      totalEa += itemEa;
      noDiscountTotalPrice += itemTotalPrice;

      if (itemEa >= ITEM_DISCOUNT_START) {
        // 상품별 10개 이상 구매 시 할인율
        if (item.id === "p1") itemDiscountRate = ITEM_DISCOUNT_RATES.p1;
        else if (item.id === "p2") itemDiscountRate = ITEM_DISCOUNT_RATES.p2;
        else if (item.id === "p3") itemDiscountRate = ITEM_DISCOUNT_RATES.p3;
        else if (item.id === "p4") itemDiscountRate = ITEM_DISCOUNT_RATES.p4;
        else if (item.id === "p5") itemDiscountRate = ITEM_DISCOUNT_RATES.p5;
      }
      totalPrice += itemTotalPrice * (1 - itemDiscountRate);
    })();
  }
  return { noDiscountTotalPrice, totalPrice, totalEa };
};

export const updateSelectOptions = () => {
  select.innerHTML = "";
  products.forEach(function (item) {
    var opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = `${item.name} - ${item.price}원`;

    if (item.stock === 0) opt.disabled = true;
    select.appendChild(opt);
  });
};

// 총액 표시
export const showSumText = (totalPrice, totalDiscountRate) => {
  sum.textContent = `총액: ${Math.round(totalPrice)}원`;
  if (totalDiscountRate > 0) {
    var span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = `(${(totalDiscountRate * 100).toFixed(1)}% 할인 적용)`;
    sum.appendChild(span);
  }

  return { totalPrice };
};

// 포인트 계산
export const calcPoints = (totalPrice) => {
  let points = 0;
  points = Math.floor(totalPrice / 1000);

  var pointsElem = document.getElementById("points-value");
  if (!pointsElem) {
    pointsElem = document.createElement("span");
    pointsElem.id = "points-value";
    pointsElem.className = "text-blue-500 ml-2";
    sum.appendChild(pointsElem);
  }
  pointsElem.textContent = `(포인트: ${points})`;
};

// 재고 정보 업데이트
export const updateStockInfo = () => {
  var stockInfoMsg = "";
  products.forEach(function (item) {
    if (item.stock < 5) {
      stockInfoMsg += `${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : `품절`}\n`;
    }
  });
  stockInfo.textContent = stockInfoMsg;
};

// 장바구니에 추가할 상품의 HTML 생성
const makeNewItemHTML = (itemToAdd) => {
  return (
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
    '">삭제</button></div>'
  );
};

// 장바구니에 이미 있는 상품 추가
const addExistingItem = (existingItem, itemToAdd) => {
  var itemEa =
    parseInt(existingItem.querySelector("span").textContent.split("x ")[1]) + 1;

  if (itemEa <= itemToAdd.stock) {
    existingItem.querySelector("span").textContent =
      `${itemToAdd.name} - ${itemToAdd.price}원 x ${itemEa}`;
    itemToAdd.stock--;
  } else {
    alert("재고가 부족합니다.");
  }
};

// 장바구니에 새 상품 추가
const addNewItem = (itemToAdd) => {
  var newItem = document.createElement("div");
  newItem.id = itemToAdd.id;
  newItem.className = "flex justify-between items-center mb-2";
  newItem.innerHTML = makeNewItemHTML(itemToAdd);

  cartDiv.appendChild(newItem);
  itemToAdd.stock--;
};

// 장바구니 아이템 수량 변경
const updateItemEa = (target, itemElem) => {
  var itemId = target.dataset.productId;
  var eaToChange = parseInt(target.dataset.change);
  var itemSpan = itemElem.querySelector("span");
  var itemText = itemSpan.textContent;
  var currentEa = parseInt(itemText.split("x ")[1]);
  var newEa = currentEa + eaToChange;
  var itemToChange = products.find(function (item) {
    return item.id === itemId;
  });

  if (newEa > 0 && newEa <= itemToChange.stock + currentEa) {
    itemSpan.textContent = `${itemText.split("x ")[0]}x ${newEa}`;
    itemToChange.stock -= eaToChange;
  } else if (newEa <= 0) {
    itemElem.remove();
    itemToChange.stock -= eaToChange;
  } else {
    alert("재고가 부족합니다.");
  }
};

// 장바구니 아이템 삭제
const removeItemEa = (target, itemElem) => {
  var itemId = target.dataset.productId;
  var itemSpan = itemElem.querySelector("span");
  var itemText = itemSpan.textContent;
  var eaToRemove = parseInt(itemText.split("x ")[1]);
  var itemToChange = products.find(function (item) {
    return item.id === itemId;
  });

  itemToChange.stock += eaToRemove;
  itemElem.remove();
};

// 페이지 로드 시 초기화
main();

// 상품 추가 버튼 클릭 이벤트
addItemBtn.addEventListener("click", function () {
  var select = document.getElementById("product-select");
  var selectedItem = select.value;
  var lastSelectedProduct = updateRecommendation();

  var itemToAdd = products.find(function (item) {
    return item.id === selectedItem;
  });
  if (itemToAdd?.stock > 0) {
    var existingItem = document.getElementById(itemToAdd.id); // 장바구니에 있는지 확인

    if (existingItem) {
      addExistingItem(existingItem, itemToAdd);
    } else {
      addNewItem(itemToAdd);
    }
    calculateCart();
    lastSelectedProduct = selectedItem;
  }
});

// 장바구니 아이템 클릭 이벤트
cartDiv.addEventListener("click", function (event) {
  var target = event.target;
  const isTargetQuantityChange = target.classList.contains("quantity-change");
  const isTargetRemoveItem = target.classList.contains("remove-item");

  if (isTargetQuantityChange || isTargetRemoveItem) {
    var itemId = target.dataset.productId;
    var itemElem = document.getElementById(itemId);

    if (isTargetQuantityChange) {
      updateItemEa(target, itemElem);
    } else if (isTargetRemoveItem) {
      removeItemEa(target, itemElem);
    }
    calculateCart();
  }
});
