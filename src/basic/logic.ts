import { prodList } from "./main.basic.js";

const ElementIds = {
  SUM: "cart-total",
  SEL: "product-select",
  ADD_BTN: "add-to-cart",
  STOCK_INFO: "stock-status",
  LOYALTY_POINTS: "loyalty-points",
  CART_DISP: "cart-items",
};
function updateSelOpts(sel) {
  sel.innerHTML = "";
  prodList.forEach(function (item) {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.val + "원";
    if (item.q === 0) opt.disabled = true;
    sel.appendChild(opt);
  });
}

export function createRootChildren({ cartDisp, sum, sel, addBtn, stockInfo }) {
  const cont = document.createElement("div");
  const wrap = document.createElement("div");
  const hTxt = document.createElement("h1");
  cartDisp = document.createElement("div");
  sum = document.createElement("div");
  sel = document.createElement("select");
  addBtn = document.createElement("button");
  stockInfo = document.createElement("div");
  cartDisp.id = ElementIds.CART_DISP;
  sum.id = ElementIds.SUM;
  sel.id = ElementIds.SEL;
  addBtn.id = ElementIds.ADD_BTN;
  stockInfo.id = ElementIds.STOCK_INFO;
  cont.className = "bg-gray-100 p-8";
  wrap.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
  hTxt.className = "text-2xl font-bold mb-4";
  sum.className = "text-xl font-bold my-4";
  sel.className = "border rounded p-2 mr-2";
  addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  stockInfo.className = "text-sm text-gray-500 mt-2";
  hTxt.textContent = "장바구니";
  addBtn.textContent = "추가";
  updateSelOpts(sel);
  wrap.appendChild(hTxt);
  wrap.appendChild(cartDisp);
  wrap.appendChild(sum);
  wrap.appendChild(sel);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);
  cont.appendChild(wrap);
  return cont;
}

const renderBonusPts = (totalAmt) => {
  const sum = document.getElementById(ElementIds.SUM);

  const bonusPts = Math.floor(totalAmt / 1000);
  let ptsTag = document.getElementById(ElementIds.LOYALTY_POINTS);
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = ElementIds.LOYALTY_POINTS;
    ptsTag.className = "text-blue-500 ml-2";
    sum?.appendChild(ptsTag);
  }

  ptsTag.textContent = "(포인트: " + bonusPts + ")";
};

function updateStockInfo() {
  const stockInfo = document.getElementById(ElementIds.STOCK_INFO);
  let infoMsg = "";
  prodList.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name +
        ": " +
        (item.q > 0 ? "재고 부족 (" + item.q + "개 남음)" : "품절") +
        "\n";
    }
  });
  if (stockInfo) {
    stockInfo.textContent = infoMsg;
  }
}

export function calcCart() {
  let totalAmt = 0;
  let itemCnt = 0;
  const cartDisp = document.getElementById(ElementIds.CART_DISP);
  const cartItems = cartDisp?.children;
  let subTot = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem;
      for (let j = 0; j < prodList.length; j++) {
        if (prodList[j].id === cartItems[i].id) {
          curItem = prodList[j];
          break;
        }
      }
      const q = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1]
      );
      const itemTot = curItem.val * q;
      let disc = 0;
      itemCnt += q;
      subTot += itemTot;
      if (q >= 10) {
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
  const sum = document.getElementById(ElementIds.SUM);
  if (sum) {
    sum.textContent = "총액: " + Math.round(totalAmt) + "원";
  }

  if (discRate > 0) {
    const span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
    sum?.appendChild(span);
  }
  updateStockInfo();
  renderBonusPts(totalAmt);
}
