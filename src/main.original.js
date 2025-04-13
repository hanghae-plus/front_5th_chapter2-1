// TODO: 상수로 분리
const products = [
  { id: "p1", name: "상품1", price: 10000, units: 50 },
  { id: "p2", name: "상품2", price: 20000, units: 30 },
  { id: "p3", name: "상품3", price: 30000, units: 20 },
  { id: "p4", name: "상품4", price: 15000, units: 0 },
  { id: "p5", name: "상품5", price: 25000, units: 10 },
];

let productSelector, addToCartButton, cartItemList, cartTotal, productStatus;
let lastSel,
  bonusPts = 0,
  totalAmt = 0,
  itemCnt = 0;

main();
addEventListener();

// function
function main() {
  render();
  updateSelOpts();
  calcCart();
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
  productStatus = document.createElement("div");

  // 스타일 적용
  cartItemList.id = "cart-items";
  cartTotal.id = "cart-total";
  productSelector.id = "product-select";
  addToCartButton.id = "add-to-cart";
  productStatus.id = "stock-status";
  cont.className = "bg-gray-100 p-8";
  wrap.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  hTxt.className = "text-2xl font-bold mb-4";
  cartTotal.className = "text-xl font-bold my-4";
  productSelector.className = "border rounded p-2 mr-2";
  addToCartButton.className = "bg-blue-500 text-white px-4 py-2 rounded";
  productStatus.className = "text-sm text-gray-500 mt-2";
  hTxt.textContent = "장바구니";
  addToCartButton.textContent = "추가";

  // ------- 요소에 스타일 적용

  wrap.appendChild(hTxt);
  wrap.appendChild(cartItemList);
  wrap.appendChild(cartTotal);
  wrap.appendChild(productSelector);
  wrap.appendChild(addToCartButton);
  wrap.appendChild(productStatus);
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
        updateSelOpts();
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
          updateSelOpts();
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
      calcCart();
      lastSel = selItem;
    }
  });

  cartItemList.addEventListener("click", function (event) {
    const tgt = event.target;
    if (
      tgt.classList.contains("quantity-change") ||
      tgt.classList.contains("remove-item")
    ) {
      const prodId = tgt.dataset.productId;
      const itemElem = document.getElementById(prodId);
      const prod = products.find(function (p) {
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
            prod.units +
              parseInt(
                itemElem.querySelector("span").textContent.split("x ")[1],
              )
        ) {
          itemElem.querySelector("span").textContent =
            itemElem.querySelector("span").textContent.split("x ")[0] +
            "x " +
            newQty;
          prod.units -= qtyChange;
        } else if (newQty <= 0) {
          itemElem.remove();
          prod.units -= qtyChange;
        } else {
          alert("재고가 부족합니다.");
        }
      } else if (tgt.classList.contains("remove-item")) {
        const remQty = parseInt(
          itemElem.querySelector("span").textContent.split("x ")[1],
        );
        prod.units += remQty;
        itemElem.remove();
      }
      calcCart();
    }
  });
}

function updateSelOpts() {
  productSelector.innerHTML = "";
  products.forEach(function (item) {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.price + "원";
    if (item.units === 0) opt.disabled = true;
    productSelector.appendChild(opt);
  });
}

function calcCart() {
  totalAmt = 0;
  itemCnt = 0;
  const cartItems = cartItemList.children;
  let subTot = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          curItem = products[j];
          break;
        }
      }
      const units = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1],
      );
      const itemTot = curItem.price * units;
      let disc = 0;
      itemCnt += units;
      subTot += itemTot;
      if (units >= 10) {
        if (curItem.id === "p1") disc = 0.1;
        else if (curItem.id === "p2") disc = 0.15;
        else if (curItem.id === "p3") disc = 0.2;
        else if (curItem.id === "p4") disc = 0.05;
        else if (curItem.id === "p5") disc = 0.25;
      }
      totalAmt += itemTot * (1 - disc);
    })();
  }
  let discRate = 0;
  if (itemCnt >= 30) {
    const bulkDisc = totalAmt * 0.25;
    const itemDisc = subTot - totalAmt;
    if (bulkDisc > itemDisc) {
      totalAmt = subTot * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTot - totalAmt) / subTot;
    }
  } else {
    discRate = (subTot - totalAmt) / subTot;
  }
  if (new Date().getDay() === 2) {
    totalAmt *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  cartTotal.textContent = "총액: " + Math.round(totalAmt) + "원";
  if (discRate > 0) {
    const span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
    cartTotal.appendChild(span);
  }
  updateStockInfo();
  renderBonusPts();
}

function renderBonusPts() {
  bonusPts = Math.floor(totalAmt / 1000);
  let ptsTag = document.getElementById("loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    cartTotal.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + bonusPts + ")";
}

function updateStockInfo() {
  let infoMsg = "";
  products.forEach(function (item) {
    if (item.units < 5) {
      infoMsg +=
        item.name +
        ": " +
        (item.units > 0 ? "재고 부족 (" + item.units + "개 남음)" : "품절") +
        "\n";
    }
  });
  productStatus.textContent = infoMsg;
}
