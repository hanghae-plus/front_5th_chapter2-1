import { $ } from "./utils/$";

const PRODUCT_LIST = [
  { id: "p1", name: "상품1", value: 10000, quantity: 50 },
  { id: "p2", name: "상품2", value: 20000, quantity: 30 },
  { id: "p3", name: "상품3", value: 30000, quantity: 20 },
  { id: "p4", name: "상품4", value: 15000, quantity: 0 },
  { id: "p5", name: "상품5", value: 25000, quantity: 10 },
];

let $productSelect, $addToCart, $cartItems, $cartTotal, $stockStatus;

let lastSelected,
  bonusPoints = 0,
  totalAmount = 0,
  itemCount = 0;

const main = () => {
  const $root = $("#app");

  // UI 앨리먼트 생성 및 속성 설정 커스텀 $ 함수 사용
  const $container = $("div", { className: "bg-gray-100 p-8" });
  const $wrapper = $("div", { className: "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8" });
  const $title = $("h1", { className: "text-2xl font-bold mb-4", textContent: "장바구니" });
  $cartItems = $("div", { id: "cart-items" });
  $cartTotal = $("div", { id: "cart-total", className: "text-xl font-bold my-4" });
  $productSelect = $("select", { id: "product-select", className: "border rounded p-2 mr-2" });
  $addToCart = $("button", { id: "add-to-cart", className: "bg-blue-500 text-white px-4 py-2 rounded", textContent: "추가" });
  $stockStatus = $("div", { id: "stock-status", className: "text-sm text-gray-500 mt-2" });

  updateSelectOptions();

  // 컴포넌트 조립
  [$title, $cartItems, $cartTotal, $productSelect, $addToCart, $stockStatus].forEach((el) => $wrapper.appendChild(el));
  $container.appendChild($wrapper);
  $root.appendChild($container);

  calculateCart();

  // 랜덤 할인 이벤트
  setTimeout(() => {
    setInterval(() => {
      let luckyItem = PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.value = Math.round(luckyItem.value * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => {
      if (!lastSelected) return;
      const suggest = PRODUCT_LIST.find((item) => item.id !== lastSelected && item.quantity > 0);
      if (!suggest) return;
      alert(suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!");
      suggest.value = Math.round(suggest.value * 0.95);
      updateSelectOptions();
    }, 60000);
  }, Math.random() * 20000);
};

const updateSelectOptions = () => {
  $productSelect.innerHTML = "";

  const frag = $("frag");
  PRODUCT_LIST.forEach((item) => {
    const props = { textContent: `${item.name} - ${item.value}원`, value: item.id, disabled: item.quantity === 0 };
    frag.appendChild($("option", props));
  });

  $productSelect.appendChild(frag);
};

const calculateCart = () => {
  totalAmount = 0;
  itemCount = 0;

  const cartItems = $cartItems.children;
  let subTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (() => {
      let currentItem;
      for (let j = 0; j < PRODUCT_LIST.length; j++) {
        if (PRODUCT_LIST[j].id === cartItems[i].id) {
          currentItem = PRODUCT_LIST[j];
          break;
        }
      }
      const quantity = parseInt(cartItems[i].querySelector("span").textContent.split("x ")[1]);
      const itemTotal = currentItem.value * quantity;
      let discount = 0;
      itemCount += quantity;
      subTotal += itemTotal;
      if (quantity >= 10) {
        if (currentItem.id === "p1") discount = 0.1;
        else if (currentItem.id === "p2") discount = 0.15;
        else if (currentItem.id === "p3") discount = 0.2;
        else if (currentItem.id === "p4") discount = 0.05;
        else if (currentItem.id === "p5") discount = 0.25;
      }
      totalAmount += itemTotal * (1 - discount);
    })();
  }
  let discountRate = 0;
  if (itemCount >= 30) {
    let bulkDiscount = totalAmount * 0.25;
    let itemDiscount = subTotal - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }
  $cartTotal.textContent = "총액: " + Math.round(totalAmount) + "원";
  if (discountRate > 0) {
    const props = { className: "text-green-500 ml-2", textContent: "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)" };
    $cartTotal.appendChild($("span", props));
  }
  updateStockInfo();
  renderBonusPoints();
};

const renderBonusPoints = () => {
  bonusPoints = Math.floor(totalAmount / 1000);
  let pointsTag = $("#loyalty-points");
  if (!pointsTag) {
    pointsTag = $("span", { id: "loyalty-points", className: "text-blue-500 ml-2" });
    $cartTotal.appendChild(pointsTag);
  }
  pointsTag.textContent = "(포인트: " + bonusPoints + ")";
};

const updateStockInfo = () => {
  $stockStatus.textContent = PRODUCT_LIST.filter((i) => i.quantity < 5)
    .map((item) => item.name + ": " + (item.quantity > 0 ? "재고 부족 (" + item.quantity + "개 남음)" : "품절"))
    .join("\n");
};

main();

$addToCart.addEventListener("click", () => {
  const selItem = $productSelect.value;
  const itemToAdd = PRODUCT_LIST.find((p) => p.id === selItem);

  if (!itemToAdd || itemToAdd.quantity <= 0) return;

  const currentItem = $("#" + itemToAdd.id);
  if (currentItem) {
    // 이미 있는 상품
    const newQuantity = parseInt(currentItem.querySelector("span").textContent.split("x ")[1]) + 1;
    if (newQuantity <= itemToAdd.quantity) {
      currentItem.querySelector("span").textContent = itemToAdd.name + " - " + itemToAdd.value + "원 x " + newQuantity;
      itemToAdd.quantity -= 1;
    } else {
      alert("재고가 부족합니다.");
    }
  } else {
    // 장바구니에 새 상품 추가
    const newItem = $("div", { id: itemToAdd.id, className: "flex justify-between items-center mb-2" });
    newItem.innerHTML =
      "<span>" +
      itemToAdd.name +
      " - " +
      itemToAdd.value +
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
    $cartItems.appendChild(newItem);
    itemToAdd.quantity -= 1;
  }
  calculateCart();
  lastSelected = selItem;
});

$cartItems.addEventListener("click", (event) => {
  // 수량 변경, 상품 삭제 이벤트 처리
  const target = event.target;
  if (!target.classList.contains("quantity-change") && !target.classList.contains("remove-item")) return;

  const productId = target.dataset.productId;
  const $item = $("#" + productId);
  const product = PRODUCT_LIST.find((p) => p.id === productId);

  if (target.classList.contains("quantity-change")) {
    // 수량 변경
    const quantityChange = parseInt(target.dataset.change);
    const newQuantity = parseInt($item.querySelector("span").textContent.split("x ")[1]) + quantityChange;

    if (newQuantity > 0 && newQuantity <= product.quantity + parseInt($item.querySelector("span").textContent.split("x ")[1])) {
      $item.querySelector("span").textContent = $item.querySelector("span").textContent.split("x ")[0] + "x " + newQuantity;
      product.quantity -= quantityChange;
    } else if (newQuantity <= 0) {
      $item.remove();
      product.quantity -= quantityChange;
    } else {
      alert("재고가 부족합니다.");
    }
  } else if (target.classList.contains("remove-item")) {
    // 상품 삭제
    const remainQuantity = parseInt($item.querySelector("span").textContent.split("x ")[1]);
    product.quantity += remainQuantity;
    $item.remove();
  }

  calculateCart();
});
