let lastSelectedProduct,
  totalAmount = 0;

const DISCOUNT_RATIO = {
  THUNDER: 0.8,
  ADDITIONAL: 0.95
}
const isTuesDay = new Date().getDay() === 2 ? true : false

const prodList = [
  { id: "p1", name: "상품1", price: 10000, quantity: 50 },
  { id: "p2", name: "상품2", price: 20000, quantity: 30 },
  { id: "p3", name: "상품3", price: 30000, quantity: 20 },
  { id: "p4", name: "상품4", price: 15000, quantity: 0 },
  { id: "p5", name: "상품5", price: 25000, quantity: 10 },
];

const $ = (query) => document.querySelector(query)

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
  `

  renderSelOpts();
  calcCart();

  // 30초 간격으로 번개세일 20% 진행
  setTimeout(function () {
    setInterval(function () {
      const luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * DISCOUNT_RATIO.THUNDER); 
        // alert
        console.log(
          "번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!"
        );
        renderSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  // 1분 간격으로 5% 추가 할인
  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedProduct) {
        const suggest = prodList.find(function (item) {
          return item.id !== lastSelectedProduct && item.quantity > 0;
        });
        if (suggest) {
          // alert
          console.log(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!"
          );
          suggest.price = Math.round(suggest.price * DISCOUNT_RATIO.ADDITIONAL);
          renderSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function renderSelOpts() {
  const $productSelect = $('#product-select')
  $productSelect.innerHTML = "";
  prodList.forEach(function (item) {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.price + "원";
    if (item.quantity === 0) opt.disabled = true;
    $productSelect.appendChild(opt);
  });
}

function calcCart() {
  const $cartItems = $('#cart-items')
  totalAmount = 0;
  let itemCnt = 0;
  const cartItems = $cartItems.children;
  let subTot = 0;
  // 카트 상품 목록 순회
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;
      // 전체 제품 목록 순회해서 순회 중인 상품의 정보(price, id)를 알아냄
      for (let j = 0; j < prodList.length; j++) {
        if (prodList[j].id === cartItems[i].id) {
          curItem = prodList[j];
          break;
        }
      }
      const quantity = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1]
      );
      const itemTot = curItem.price * quantity;
      let discount = 0;
      itemCnt += quantity;
      subTot += itemTot;
      /**
       * 상품1 > 10개 이상 구매 시 10% 할인
       * 상품2 > 10개 이상 구매 시 15% 할인
       * 상품3 > 10개 이상 구매 시 20% 할인
       */
      if (quantity >= 10) {
        if (curItem.id === "p1") discount = 0.1;
        else if (curItem.id === "p2") discount = 0.15;
        else if (curItem.id === "p3") discount = 0.2;
        else if (curItem.id === "p4") discount = 0.05;
        else if (curItem.id === "p5") discount = 0.25;
      }
      totalAmount += itemTot * (1 - discount);
    })();
  }
  
  // 상품 종류와 상관 없이, 30개 이상 구매할 경우 25% 할인
  let discountRate = 0;
  if (itemCnt >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subTot - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTot * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTot - totalAmount) / subTot;
    }
  } else {
    discountRate = (subTot - totalAmount) / subTot;
  }

  // 화요일에는 특별할인 10%
  if (isTuesDay) {
    totalAmount *= (1 - 0.1);
    discountRate = Math.max(discountRate, 0.1);
  }
  const $cartTotal = $('#cart-total')
  $cartTotal.textContent = "총액: " + Math.round(totalAmount) + "원";

  if (discountRate > 0) {
    let span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
    $cartTotal.appendChild(span);
  }

  renderStockInfo();
  renderBonusPoints();
}

const renderBonusPoints = () => {
  const bonusPoints = Math.floor(totalAmount / 1000);
  const $cartTotal = $('#cart-total')
  let ptsTag = document.getElementById("loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    $cartTotal.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + bonusPoints + ")";
};

function renderStockInfo() {
  let infoMsg = "";
  prodList.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ": " +
        (item.quantity > 0
          ? "재고 부족 (" + item.quantity + "개 남음)"
          : "품절") +
        "\n";
    }
  });
  const $stockStatus = $('#stock-status')
  $stockStatus.textContent = infoMsg;
}

main();

const $addBtn = $('#add-to-cart')
$addBtn.addEventListener("click", function () {
  const $productSelect = $('#product-select')
  const selItem = $productSelect.value;
  const itemToAdd = prodList.find(function (p) {
    return p.id === selItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    const item = document.getElementById(itemToAdd.id);
    if (item) {
      const newQty =
        parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;

      if (newQty <= itemToAdd.quantity) {
        item.querySelector("span").textContent =
          itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;
        itemToAdd.quantity--;
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      const newItem = document.createElement("div");
      const $cartItems = $('#cart-items')

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
      $cartItems.appendChild(newItem);
      itemToAdd.quantity--;
    }

    calcCart();
    lastSelectedProduct = selItem;
  }
});


const $cartItems = $('#cart-items')
$cartItems.addEventListener("click", function (event) {
  const tgt = event.target;
  if (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  ) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);

    const prod = prodList.find(function (p) {
      return p.id === prodId;
    });

    if (tgt.classList.contains("quantity-change")) {
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
        prod.quantity -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.quantity -= qtyChange;
      } else {
        alert("재고가 부족합니다.");
      }

    } else if (tgt.classList.contains("remove-item")) {
      const remQty = parseInt(
        itemElem.querySelector("span").textContent.split("x ")[1]
      );

      prod.quantity += remQty;
      itemElem.remove();
    }

    calcCart();
  }
});
