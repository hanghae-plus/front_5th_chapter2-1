var $productSelect, $addBtn, $cartItems, $cartTotal, $stockInfo;
var lastSelectedProduct,
  bonusPoints = 0,
  totalAmount = 0;

const DISCOUNT_RATIO = {
  THUNDER: 0.8,
  ADDITIONAL: 0.95
}
const isTuesDay = new Date().getDay() === 3 ? true : false

const prodList = [
  { id: "p1", name: "상품1", price: 10000, quantity: 50 },
  { id: "p2", name: "상품2", price: 20000, quantity: 30 },
  { id: "p3", name: "상품3", price: 30000, quantity: 20 },
  { id: "p4", name: "상품4", price: 15000, quantity: 0 },
  { id: "p5", name: "상품5", price: 25000, quantity: 10 },
];
function main() {
  const root = document.getElementById("app");

  const container = document.createElement("div");
  container.className = "bg-gray-100 p-8";

  const wrap = document.createElement("div");
  wrap.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

  let hTxt = document.createElement("h1");
  hTxt.className = "text-2xl font-bold mb-4";
  hTxt.textContent = "장바구니";

  $cartItems = document.createElement("div");
  $cartItems.id = "cart-items";

  $cartTotal = document.createElement("div");
  $cartTotal.id = "cart-total";
  $cartTotal.className = "text-xl font-bold my-4";

  $productSelect = document.createElement("select");
  $productSelect.id = "product-select";
  $productSelect.className = "border rounded p-2 mr-2";

  $addBtn = document.createElement("button");
  $addBtn.id = "add-to-cart";
  $addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  $addBtn.textContent = "추가";

  $stockInfo = document.createElement("div");
  $stockInfo.id = "stock-status";
  $stockInfo.className = "text-sm text-gray-500 mt-2";

  updateSelOpts();

  wrap.appendChild(hTxt);
  wrap.appendChild($cartItems);
  wrap.appendChild($cartTotal);
  wrap.appendChild($productSelect);
  wrap.appendChild($addBtn);
  wrap.appendChild($stockInfo);
  container.appendChild(wrap);
  root.appendChild(container);

  calcCart();

  // 30초 간격으로 번개세일 진행
  setTimeout(function () {
    setInterval(function () {
      var luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * DISCOUNT_RATIO.THUNDER); 
        // alert
        console.log(
          "번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!"
        );
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  // 1분 간격으로 5% 추가 할인
  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedProduct) {
        var suggest = prodList.find(function (item) {
          return item.id !== lastSelectedProduct && item.quantity > 0;
        });
        if (suggest) {
          // alert
          console.log(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!"
          );
          suggest.price = Math.round(suggest.price * DISCOUNT_RATIO.ADDITIONAL);
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelOpts() {
  $productSelect.innerHTML = "";
  prodList.forEach(function (item) {
    var opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.price + "원";
    if (item.quantity === 0) opt.disabled = true;
    $productSelect.appendChild(opt);
  });
}

function calcCart() {
  totalAmount = 0;
  let itemCnt = 0;
  var cartItems = $cartItems.children;
  var subTot = 0;
  // 카트 상품 목록 순회
  for (var i = 0; i < cartItems.length; i++) {
    (function () {
      var curItem;
      // 전체 제품 목록 순회해서 순회 중인 상품의 정보(price: 가격, id)를 알아냄
      for (var j = 0; j < prodList.length; j++) {
        if (prodList[j].id === cartItems[i].id) {
          curItem = prodList[j];
          break;
        }
      }
      var quantity = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1]
      );
      var itemTot = curItem.price * quantity;
      var discount = 0;
      itemCnt += quantity;
      subTot += itemTot;
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
  let discountRate = 0;
  if (itemCnt >= 30) {
    var bulkDisc = totalAmount * 0.25;
    var itemDisc = subTot - totalAmount;
    if (bulkDisc > itemDisc) {
      totalAmount = subTot * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTot - totalAmount) / subTot;
    }
  } else {
    discountRate = (subTot - totalAmount) / subTot;
  }
  if (isTuesDay) {
    totalAmount *= (1 - 0.1);
    discountRate = Math.max(discountRate, 0.1);
  }
  $cartTotal.textContent = "총액: " + Math.round(totalAmount) + "원";
  if (discountRate > 0) {
    var span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
    $cartTotal.appendChild(span);
  }
  updateStockInfo();
  renderBonusPoints();
}

const renderBonusPoints = () => {
  bonusPoints = Math.floor(totalAmount / 1000);
  var ptsTag = document.getElementById("loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    $cartTotal.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + bonusPoints + ")";
};

function updateStockInfo() {
  var infoMsg = "";
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
  $stockInfo.textContent = infoMsg;
}

main();

$addBtn.addEventListener("click", function () {
  var selItem = $productSelect.value;
  var itemToAdd = prodList.find(function (p) {
    return p.id === selItem;
  });
  if (itemToAdd && itemToAdd.quantity > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty =
        parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
      if (newQty <= itemToAdd.quantity) {
        item.querySelector("span").textContent =
          itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;
        itemToAdd.quantity--;
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
      $cartItems.appendChild(newItem);
      itemToAdd.quantity--;
    }
    calcCart();
    lastSelectedProduct = selItem;
  }
});
$cartItems.addEventListener("click", function (event) {
  var tgt = event.target;
  if (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  ) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = prodList.find(function (p) {
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
      var remQty = parseInt(
        itemElem.querySelector("span").textContent.split("x ")[1]
      );
      prod.quantity += remQty;
      itemElem.remove();
    }
    calcCart();
  }
});
