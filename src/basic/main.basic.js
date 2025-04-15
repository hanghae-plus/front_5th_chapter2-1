import { products } from "./consts/products";
import { updateRandomDiscount } from "./events/updateRandomDiscount";
import { updateRecommendation } from "./events/updateRecommendation";
import { updateSelectOptions } from "./events/updateSelectOptions";

var addItemBtn, cartDiv, sum, stockInfo;
var totalPrice = 0,
  totalEa = 0;

const main = () => {
  // HTML elements 생성
  var root = document.getElementById("app");
  let container = document.createElement("div");
  var wrapper = document.createElement("div");
  let titleText = document.createElement("h1");
  cartDiv = document.createElement("div");
  sum = document.createElement("div");
  addItemBtn = document.createElement("button");
  stockInfo = document.createElement("div");

  var select = updateSelectOptions();

  // IDs 설정
  cartDiv.id = "cart-items";
  sum.id = "cart-total";
  addItemBtn.id = "add-to-cart";
  stockInfo.id = "stock-status";

  // className 설정
  container.className = "bg-gray-100 p-8";
  wrapper.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  titleText.className = "text-2xl font-bold mb-4";
  sum.className = "text-xl font-bold my-4";
  addItemBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  stockInfo.className = "text-sm text-gray-500 mt-2";

  // 텍스트 설정
  titleText.textContent = "장바구니";
  addItemBtn.textContent = "추가";

  // 이벤트 리스너 설정

  // HTML 요소 추가
  wrapper.appendChild(titleText);
  wrapper.appendChild(cartDiv);
  wrapper.appendChild(sum);
  wrapper.appendChild(select);
  wrapper.appendChild(addItemBtn);
  wrapper.appendChild(stockInfo);
  container.appendChild(wrapper);
  root.appendChild(container);

  // 장바구니 계산
  calcCart();

  // 랜덤 할인 이벤트 설정
  updateRandomDiscount();
  updateRecommendation();
};

// 상품 추가 시 가격 계산
const handleAddItem = (cartItems) => {
  var noDiscTotalPrice = 0;
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
      var itemDiscRate = 0;
      totalEa += itemEa;
      noDiscTotalPrice += itemTotalPrice;

      if (itemEa >= 10) {
        // 상품별 10개 이상 구매 시 할인율
        if (item.id === "p1") itemDiscRate = 0.1;
        else if (item.id === "p2") itemDiscRate = 0.15;
        else if (item.id === "p3") itemDiscRate = 0.2;
        else if (item.id === "p4") itemDiscRate = 0.05;
        else if (item.id === "p5") itemDiscRate = 0.25;
      }
      totalPrice += itemTotalPrice * (1 - itemDiscRate);
    })();
  }
  return { noDiscTotalPrice, totalPrice, totalEa };
};

// 총액 표시
const showSumText = (totalPrice, totalDiscRate) => {
  sum.textContent = "총액: " + Math.round(totalPrice) + "원";
  if (totalDiscRate > 0) {
    var span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (totalDiscRate * 100).toFixed(1) + "% 할인 적용)";
    sum.appendChild(span);
  }

  return { totalPrice };
};

// 장바구니 계산
const calcCart = () => {
  var cartItems = cartDiv.children;
  var addItemResult = handleAddItem(cartItems);
  var noDiscTotalPrice = addItemResult.noDiscTotalPrice;
  var totalPrice = addItemResult.totalPrice;
  var totalEa = addItemResult.totalEa;

  let totalDiscRate = 0; // 전체 할인율
  var itemDisc = noDiscTotalPrice - totalPrice; // (이미 적용된) 할인 가격
  // 전체 30개 이상 구매 시 할인율 계산
  if (totalEa >= 30) {
    const BULK_DISCOUNT_RATE = 0.25;
    var bulkDisc = totalPrice * BULK_DISCOUNT_RATE;

    if (bulkDisc > itemDisc) {
      totalPrice = noDiscTotalPrice * (1 - BULK_DISCOUNT_RATE);
      totalDiscRate = BULK_DISCOUNT_RATE;
    } else {
      totalDiscRate = itemDisc / noDiscTotalPrice;
    }
  } else {
    totalDiscRate = itemDisc / noDiscTotalPrice;
  }

  // 화요일 할인율 계산
  if (new Date().getDay() === 2) {
    const TUESDAY_DISCOUNT_RATE = 0.1;
    totalPrice *= 1 - TUESDAY_DISCOUNT_RATE;
    totalDiscRate = Math.max(totalDiscRate, TUESDAY_DISCOUNT_RATE);
  }

  showSumText(totalPrice, totalDiscRate);
  updateStockInfo();
  calcPoints(totalPrice);
};

// 포인트 계산
const calcPoints = (totalPrice) => {
  let points = 0;
  points = Math.floor(totalPrice / 1000);

  var pointsElem = document.getElementById("points-value");
  if (!pointsElem) {
    pointsElem = document.createElement("span");
    pointsElem.id = "points-value";
    pointsElem.className = "text-blue-500 ml-2";
    sum.appendChild(pointsElem);
  }
  pointsElem.textContent = "(포인트: " + points + ")";
};

// 재고 정보 업데이트
const updateStockInfo = () => {
  var infoMsg = "";
  products.forEach(function (item) {
    if (item.stock < 5) {
      infoMsg +=
        item.name +
        ": " +
        (item.stock > 0 ? "재고 부족 (" + item.stock + "개 남음)" : "품절") +
        "\n";
    }
  });
  stockInfo.textContent = infoMsg;
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
      itemToAdd.name + " - " + itemToAdd.price + "원 x " + itemEa;
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
    itemSpan.textContent = itemText.split("x ")[0] + "x " + newEa;
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
    calcCart();
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
    calcCart();
  }
});
