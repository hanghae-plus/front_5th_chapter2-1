// 할인율 상수 관리 객체
const DISCOUNT_RATIO = {
  THUNDER: 0.2, // 번개 20%
  ADDITIONAL: 0.05, // 추가 5%
  EACH_PRODUCT: {
    // 각 제품 10개 이상이면 할인
    QUANTITY: 10,
    RATIO: {
      p1: 0.1,
      p2: 0.15,
      p3: 0.2,
      p4: 0.05,
      p5: 0.25,
    },
  },
  ALL_PRODUCT: {
    // 제품 관계없이 total 30개 이상이면 할인
    QUANTITY: 30,
    RATIO: 0.25,
  },
};

const isTuesDay = () => (new Date().getDay() === 2 ? true : false);

const $ = (query) => document.querySelector(query);

const target = {
  lastSelectedProduct: null,
  totalAmount: 0,
  cart: {
    p1: { name: "상품1", price: 10000, quantity: 0 },
    p2: { name: "상품2", price: 20000, quantity: 0 },
    p3: { name: "상품3", price: 30000, quantity: 0 },
    p4: { name: "상품4", price: 15000, quantity: 0 },
    p5: { name: "상품5", price: 25000, quantity: 0 },
  },
  prodList: {
    p1: { name: "상품1", price: 10000, quantity: 50 },
    p2: { name: "상품2", price: 20000, quantity: 30 },
    p3: { name: "상품3", price: 30000, quantity: 20 },
    p4: { name: "상품4", price: 15000, quantity: 0 },
    p5: { name: "상품5", price: 25000, quantity: 10 },
  },
};

const handler = {
  get(target, prop) {
    // console.log("get:", target, prop);
    return Reflect.get(target, prop);
  },
  set: function (target, prop, value) {
    console.log("set:", target, "// prop:", prop, "// value:", value);
    if (prop === "currentItem") {
      target.currentItem = value;
    }
    return Reflect.set(target, prop, value);
  },
};

let state = new Proxy(target, handler);

function main() {
  const root = $("#app");
  root.innerHTML = `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items">
        </div>
        <div id="cart-total" class="text-xl font-bold my-4">
        </div>
        <select id="product-select" class="border rounded p-2 mr-2">
        </select>
        <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">
          추가
        </button>
        <div id="stock-status" class="text-sm text-gray-500 mt-2">
        </div>
      </div>
    </div>
  `;

  renderSelOpts();
  calcCart();

  const $addBtn = root.querySelector("#add-to-cart");
  $addBtn.addEventListener("click", handleClickAdd);

  const $cartItems = root.querySelector("#cart-items");
  $cartItems.addEventListener("click", handleRemoveItem);
  $cartItems.addEventListener("click", handleClickQuantityChange);

  // 랜덤 할인 시작
  beginThunderDiscount();
  beginAdditionalDiscount();
}

function beginThunderDiscount() {
  // 30초 간격으로 번개세일 20% 진행
  setTimeout(function () {
    setInterval(function () {
      const luckyItem =
        state.prodList[
          "p" +
            (
              Math.floor(Math.random() * Object.keys(state.prodList).length) + 1
            ).toString()
        ];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(
          luckyItem.price * (1 - DISCOUNT_RATIO.THUNDER)
        );
        // alert
        console.log(
          "번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!"
        );
        renderSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);
}

function beginAdditionalDiscount() {
  // 1분 간격으로 5% 추가 할인
  setTimeout(function () {
    setInterval(function () {
      if (state.lastSelectedProduct) {
        const suggest = Object.entries(state.prodList)
          .map(([prodId, prodInfo]) => {
            return { id: prodId, ...prodInfo };
          })
          .find(function (item) {
            return item.id !== state.lastSelectedProduct && item.quantity > 0;
          });
        if (suggest) {
          // alert
          console.log(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!"
          );
          suggest.price = Math.round(
            suggest.price * (1 - DISCOUNT_RATIO.ADDITIONAL)
          );
          renderSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function renderSelOpts() {
  const $productSelect = $("#product-select");
  $productSelect.innerHTML = "";
  Object.entries(state.prodList).forEach(([prodId, prodInfo]) => {
    const opt = document.createElement("option");
    opt.value = prodId;
    opt.textContent = prodInfo.name + " - " + prodInfo.price + "원";
    if (prodInfo.quantity === 0) opt.disabled = true;
    $productSelect.appendChild(opt);
  });
}

function getDiscountRatioWhenProductOver10(quantity, currentItem) {
  /**
   * 상품1 > 10개 이상 구매 시 10% 할인
   * 상품2 > 10개 이상 구매 시 15% 할인
   * 상품3 > 10개 이상 구매 시 20% 할인
   */
  if (quantity >= DISCOUNT_RATIO.EACH_PRODUCT.QUANTITY) {
    if (currentItem.id === "p1")
      return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[currentItem.id];
    else if (currentItem.id === "p2")
      return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[currentItem.id];
    else if (currentItem.id === "p3")
      return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[currentItem.id];
    else if (currentItem.id === "p4")
      return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[currentItem.id];
    else if (currentItem.id === "p5")
      return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[currentItem.id];
  }
  return 0;
}

// 장바구니 계산
function calcCart() {
  const cartItems = $("#cart-items")?.children || [];
  state.totalAmount = 0;
  let itemCnt = 0;
  let subTot = 0;
  // 장바구니에 담긴 상품 각각에 대해 10개 이상이면 할인 적용한 가격을 totalAmount에 재할당
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      const prodId = cartItems[i].id;
      let curItem = { id: prodId, ...state.prodList[prodId] };

      const quantity = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1]
      );
      const itemTot = curItem.price * quantity; // 카트에 담긴 상품 개수만큼의 가격
      let discount = getDiscountRatioWhenProductOver10(quantity, curItem);
      itemCnt += quantity; // 카트에 담긴 모든 상품의 개수
      subTot += itemTot; // 카트에 담긴 모든 상품에 대한 가격(할인 미적용)
      state.totalAmount += itemTot * (1 - discount); // 카트에 담긴 모든 상품에 대한 가격(할인 적용)
    })();
  }

  // 상품 종류와 상관 없이, 30개 이상 구매할 경우 25% 할인
  // 10개 할인율과 비교해 할인율이 큰 쪽으로 적용
  let discountRate = (subTot - state.totalAmount) / subTot; // 현재 카트의 할인율
  if (itemCnt >= DISCOUNT_RATIO.ALL_PRODUCT.QUANTITY) {
    // 카트에 담긴 상품전체의 개수가 30보다 클 경우
    const bulkDiscount = state.totalAmount * DISCOUNT_RATIO.ALL_PRODUCT.RATIO; // 이미 할인된 가격의 25%
    const itemDiscount = subTot - state.totalAmount; // 원가 - 할인가
    if (bulkDiscount > itemDiscount) {
      // 25% 할인이 현재 할인보다 더 클 경우, 25% 할인 적용
      state.totalAmount = subTot * (1 - DISCOUNT_RATIO.ALL_PRODUCT.RATIO);
      discountRate = DISCOUNT_RATIO.ALL_PRODUCT.RATIO;
    }
  }

  // 화요일에는 특별할인 10%
  if (isTuesDay()) {
    state.totalAmount *= 1 - 0.1; // 화요일 추가 할인가 적용
    discountRate = Math.max(discountRate, 0.1); // 현재 할인율과 10% 할인율 비교해 큰 할인율 적용
  }
  const $cartTotal = $("#cart-total");
  $cartTotal.textContent = "총액: " + Math.round(state.totalAmount) + "원"; // 총액 렌더링

  if (discountRate > 0) {
    // 할인이 적용된 경우, 할인률 렌더링
    let span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
    $cartTotal.appendChild(span);
  }

  renderStockInfo();
  renderBonusPoints();
}

// 보너스 포인트 렌더링
const renderBonusPoints = () => {
  const bonusPoints = Math.floor(state.totalAmount / 1000);
  const $cartTotal = $("#cart-total");
  let ptsTag = $("#loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    $cartTotal.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + bonusPoints + ")";
};

// 5개 이하 재고 부족, 0개 품절 렌더링
function renderStockInfo() {
  const msg = Object.entries(state.prodList)
    .filter(([_, prodInfo]) => {
      return prodInfo.quantity < 5;
    })
    .map(([_, prodInfo]) => {
      if (prodInfo.quantity > 0) {
        return `${prodInfo.name}: 재고 부족 (${prodInfo.quantity}개 남음)`;
      } else {
        return `${prodInfo.name}: 품절`;
      }
    })
    .join("\n");

  const $stockStatus = $("#stock-status");
  $stockStatus.textContent = msg;
}

main();

function handleClickAdd() {
  const $productSelect = $("#product-select");
  const selItem = $productSelect.value; // p1 | p2 | p3 | p4 | p5

  // 현재 선택된 상품을 상품리스트에서 찾기
  const itemToAdd = { id: selItem, ...state.prodList[selItem] };

  // 현재 선택된 상품이 재고가 없는 경우 알림
  if (!itemToAdd || itemToAdd.quantity <= 0) {
    alert("재고가 부족합니다.");
    return;
  }

  const item = document.getElementById(itemToAdd.id);
  // 이미 장바구니에 있는 경우 갯수 추가
  if (item) {
    const newQty =
      parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;

    item.querySelector("span").textContent =
      itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;

    // 장바구니에 없으면 신규 엘리먼트 추가
  } else {
    renderNewItemOnCart(itemToAdd);
  }
  state.prodList[selItem].quantity--;
  state.cart[selItem].quantity++;

  calcCart();
  state.lastSelectedProduct = selItem;
}

function renderNewItemOnCart(itemToAdd) {
  const newItem = getElementForCart(itemToAdd);
  const $cartItems = $("#cart-items");
  $cartItems.innerHTML = newItem;
}

function getElementForCart({ id, name, price }) {
  return `
    <div id="${id}" class="flex justify-between items-center mb-2">
      <span>
        ${name + " - " + price + "원 x 1"}
      </span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
      </div>
    </div>
  `;
}

function handleRemoveItem(event) {
  const tgt = event.target;
  if (tgt.classList.contains("remove-item")) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);

    const prod = state.prodList[prodId];

    const remQty = parseInt(
      itemElem.querySelector("span").textContent.split("x ")[1]
    );

    state.prodList[prodId].quantity += remQty;
    itemElem.remove();

    calcCart();
  }
}

function handleClickQuantityChange(event) {
  const tgt = event.target;
  if (tgt.classList.contains("quantity-change")) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);

    const prod = state.prodList[prodId];

    const qtyChange = parseInt(tgt.dataset.change);
    const newQty =
      parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) +
      qtyChange;

    if (
      newQty > 0 &&
      newQty <=
        prod.quantity +
          parseInt(itemElem.querySelector("span").textContent.split("x ")[1])
    ) {
      itemElem.querySelector("span").textContent =
        itemElem.querySelector("span").textContent.split("x ")[0] +
        "x " +
        newQty;
      state.prodList[prodId].quantity -= qtyChange;
    } else if (newQty <= 0) {
      itemElem.remove();
      state.prodList[prodId].quantity -= qtyChange;
    } else {
      alert("재고가 부족합니다.");
    }
    calcCart();
  }
}
