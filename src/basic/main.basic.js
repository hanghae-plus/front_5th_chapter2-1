var products, select, addBtn, cartDisp, sum, stockInfo;
var lastSelectedProduct,
  totalPrice = 0,
  totalEa = 0;

const main = () => {
  products = [
    { id: "p1", name: "상품1", price: 10000, stock: 50 },
    { id: "p2", name: "상품2", price: 20000, stock: 30 },
    { id: "p3", name: "상품3", price: 30000, stock: 20 },
    { id: "p4", name: "상품4", price: 15000, stock: 0 },
    { id: "p5", name: "상품5", price: 25000, stock: 10 },
  ];

  // HTML elements 생성
  var root = document.getElementById("app");
  let container = document.createElement("div");
  var wrapper = document.createElement("div");
  let titleText = document.createElement("h1");
  cartDisp = document.createElement("div");
  sum = document.createElement("div");
  select = document.createElement("select");
  addBtn = document.createElement("button");
  stockInfo = document.createElement("div");

  // IDs 설정
  cartDisp.id = "cart-items";
  sum.id = "cart-total";
  select.id = "product-select";
  addBtn.id = "add-to-cart";
  stockInfo.id = "stock-status";

  // className 설정
  container.className = "bg-gray-100 p-8";
  wrapper.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  titleText.className = "text-2xl font-bold mb-4";
  sum.className = "text-xl font-bold my-4";
  select.className = "border rounded p-2 mr-2";
  addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  stockInfo.className = "text-sm text-gray-500 mt-2";

  // 텍스트 설정
  titleText.textContent = "장바구니";
  addBtn.textContent = "추가";

  // 이벤트 리스너 설정
  updateSelectOptions();

  // HTML 요소 추가
  wrapper.appendChild(titleText);
  wrapper.appendChild(cartDisp);
  wrapper.appendChild(sum);
  wrapper.appendChild(select);
  wrapper.appendChild(addBtn);
  wrapper.appendChild(stockInfo);
  container.appendChild(wrapper);
  root.appendChild(container);

  // 장바구니 계산
  calcCart();

  // 할인 이벤트 설정
  setTimeout(function () {
    setInterval(function () {
      var luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        // alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  // 추천 상품 이벤트 설정
  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedProduct) {
        var suggestProd = products.find(function (item) {
          return item.id !== lastSelectedProduct && item.stock > 0;
        });
        if (suggestProd) {
          // alert(
          //   suggestProd.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          // );
          suggestProd.price = Math.round(suggestProd.price * 0.95);
          updateSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
};

// 상품 선택 옵션 업데이트
const updateSelectOptions = () => {
  select.innerHTML = "";
  products.forEach(function (item) {
    var opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.price + "원";
    if (item.stock === 0) opt.disabled = true;
    select.appendChild(opt);
  });
};

// 상품 추가 이벤트
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

// 장바구니 계산
const calcCart = () => {
  var cartItems = cartDisp.children;
  var addItemResult = handleAddItem(cartItems);
  var noDiscTotalPrice = addItemResult.noDiscTotalPrice;
  var totalPrice = addItemResult.totalPrice;
  var totalEa = addItemResult.totalEa;

  let totalDiscRate = 0; // 전체 할인율
  var itemDisc = noDiscTotalPrice - totalPrice; // (이미 적용된) 할인 가격
  // 전체 30개 이상 구매 시 할인율 계산
  if (totalEa >= 30) {
    const BULK_DISCOUNT_RATE = 0.25; // 대량 구매 시 할인율
    var bulkDisc = totalPrice * BULK_DISCOUNT_RATE; // 대량 구매 시 할인 가격
    console.log(itemDisc);

    if (bulkDisc > itemDisc) {
      totalPrice = noDiscTotalPrice * (1 - BULK_DISCOUNT_RATE);
      totalDiscRate = BULK_DISCOUNT_RATE;
    } else {
      totalDiscRate = itemDisc / noDiscTotalPrice;
    }
  } else {
    totalDiscRate = itemDisc / noDiscTotalPrice;
  }
  // console.log(totalDiscRate);

  // 화요일 할인율 계산
  if (new Date().getDay() === 2) {
    const TUESDAY_DISCOUNT_RATE = 0.1;
    totalPrice *= 1 - TUESDAY_DISCOUNT_RATE;
    totalDiscRate = Math.max(totalDiscRate, TUESDAY_DISCOUNT_RATE);
  }

  // 총액 표시
  sum.textContent = "총액: " + Math.round(totalPrice) + "원";
  if (totalDiscRate > 0) {
    var span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (totalDiscRate * 100).toFixed(1) + "% 할인 적용)";
    sum.appendChild(span);
  }

  updateStockInfo();
  calcPoints(totalPrice);
};

// 포인트 계산
const calcPoints = (totalPrice) => {
  let points = 0;
  points = Math.floor(totalPrice / 1000);

  var ptsTag = document.getElementById("loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    sum.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + points + ")";
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

// 페이지 로드 시 초기화
main();

// 상품 추가 버튼 클릭 이벤트
addBtn.addEventListener("click", function () {
  var selItem = select.value;
  var itemToAdd = products.find(function (p) {
    return p.id === selItem;
  });
  if (itemToAdd && itemToAdd.stock > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty =
        parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
      if (newQty <= itemToAdd.stock) {
        item.querySelector("span").textContent =
          itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;
        itemToAdd.stock--;
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      var newItem = document.createElement("div");
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
      cartDisp.appendChild(newItem);
      itemToAdd.stock--;
    }
    calcCart();
    lastSelectedProduct = selItem;
  }
});

// 장바구니 아이템 클릭 이벤트
cartDisp.addEventListener("click", function (event) {
  var tgt = event.target;
  if (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  ) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = products.find(function (p) {
      return p.id === prodId;
    });
    if (tgt.classList.contains("quantity-change")) {
      var qtyChange = parseInt(tgt.dataset.change);
      var newQty =
        parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) +
        qtyChange;
      if (
        newQty > 0 &&
        newQty <=
          prod.stock +
            parseInt(itemElem.querySelector("span").textContent.split("x ")[1])
      ) {
        itemElem.querySelector("span").textContent =
          itemElem.querySelector("span").textContent.split("x ")[0] +
          "x " +
          newQty;
        prod.stock -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.stock -= qtyChange;
      } else {
        alert("재고가 부족합니다.");
      }
    } else if (tgt.classList.contains("remove-item")) {
      var remQty = parseInt(
        itemElem.querySelector("span").textContent.split("x ")[1],
      );
      prod.stock += remQty;
      itemElem.remove();
    }
    calcCart();
  }
});
