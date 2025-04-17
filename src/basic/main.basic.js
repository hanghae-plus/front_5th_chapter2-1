import productStore from "./store/product.js";

let recentlyAddedCartItemId;
let bonusPoints = 0;
let totalCartItemAmount = 0;
let totalCartItemCount = 0;

const root = document.getElementById("app");

const cont = document.createElement("div");
cont.className = "bg-gray-100 p-8";

const wrap = document.createElement("div");
wrap.className =
  "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

const hTxt = document.createElement("h1");
hTxt.className = "text-2xl font-bold mb-4";
hTxt.textContent = "장바구니";

const cartDisp = document.createElement("div");
cartDisp.id = "cart-items";

const sum = document.createElement("div");
sum.id = "cart-total";
sum.className = "text-xl font-bold my-4";

const sel = document.createElement("select");
sel.id = "product-select";
sel.className = "border rounded p-2 mr-2";

const addBtn = document.createElement("button");
addBtn.id = "add-to-cart";
addBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
addBtn.textContent = "추가";

const stockInfo = document.createElement("div");
stockInfo.id = "stock-status";
stockInfo.className = "text-sm text-gray-500 mt-2";

function main() {
  [
    { id: "p1", name: "상품1", price: 10000, quantity: 50, discountRate: 0.1 },
    { id: "p2", name: "상품2", price: 20000, quantity: 30, discountRate: 0.15 },
    { id: "p3", name: "상품3", price: 30000, quantity: 20, discountRate: 0.2 },
    { id: "p4", name: "상품4", price: 15000, quantity: 0, discountRate: 0.05 },
    { id: "p5", name: "상품5", price: 25000, quantity: 10, discountRate: 0.25 },
  ].forEach(productStore.addProductItem);

  updateSelOpts();

  wrap.appendChild(hTxt);
  wrap.appendChild(cartDisp);
  wrap.appendChild(sum);
  wrap.appendChild(sel);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);
  cont.appendChild(wrap);
  root.appendChild(cont);

  renderCart();

  setTimeout(function () {
    setInterval(function () {
      const productList = productStore.getProductList();
      const luckyItem =
        productList[Math.floor(Math.random() * productList.length)];

      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        productStore.updateProductItem(luckyItem.id, (product) => ({
          ...product,
          val: Math.round(luckyItem.price * 0.8),
        }));
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (recentlyAddedCartItemId) {
        const productList = productStore.getProductList();
        const suggest = productList.find(function (item) {
          return item.id !== recentlyAddedCartItemId && item.quantity > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          productStore.updateProductItem(suggest.id, (product) => ({
            ...product,
            val: Math.round(suggest.price * 0.95),
          }));
          updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelOpts() {
  sel.innerHTML = "";
  const productList = productStore.getProductList();
  productList.forEach(function (item) {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.price + "원";
    if (item.quantity === 0) opt.disabled = true;
    sel.appendChild(opt);
  });
}

function calculateCart() {
  totalCartItemAmount = 0;
  totalCartItemCount = 0;

  const cartItems = cartDisp.children;

  let totalCartItemAmountBeforeDiscount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const currentItem = productStore.getProductItem(cartItems[i].id);

    const cartItemQuantity = parseInt(
      cartItems[i].querySelector("span").textContent.split("x ")[1],
    );
    totalCartItemCount += cartItemQuantity;

    const totalItemAmount = currentItem.price * cartItemQuantity;
    totalCartItemAmountBeforeDiscount += totalItemAmount;

    const discountRate = cartItemQuantity >= 10 ? currentItem.discountRate : 0;

    totalCartItemAmount += totalItemAmount * (1 - discountRate);
  }

  let discountRate = 0;
  if (totalCartItemCount >= 30) {
    const bulkDiscount = totalCartItemAmount * 0.25;
    const itemDiscount =
      totalCartItemAmountBeforeDiscount - totalCartItemAmount;
    if (bulkDiscount > itemDiscount) {
      totalCartItemAmount = totalCartItemAmountBeforeDiscount * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate =
        (totalCartItemAmountBeforeDiscount - totalCartItemAmount) /
        totalCartItemAmountBeforeDiscount;
    }
  } else {
    discountRate =
      (totalCartItemAmountBeforeDiscount - totalCartItemAmount) /
      totalCartItemAmountBeforeDiscount;
  }

  if (new Date().getDay() === 2) {
    totalCartItemAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  sum.textContent = "총액: " + Math.round(totalCartItemAmount) + "원";
  if (discountRate > 0) {
    const span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
    sum.appendChild(span);
  }
}

function renderCart() {
  calculateCart();
  renderStockInfo();
  renderBonusPointInfo();
}

function renderBonusPointInfo() {
  bonusPoints = Math.floor(totalCartItemAmount / 1000);
  let bonusPointInfo = document.getElementById("loyalty-points");
  if (!bonusPointInfo) {
    bonusPointInfo = document.createElement("span");
    bonusPointInfo.id = "loyalty-points";
    bonusPointInfo.className = "text-blue-500 ml-2";
    sum.appendChild(bonusPointInfo);
  }
  bonusPointInfo.textContent = "(포인트: " + bonusPoints + ")";
}

function renderStockInfo() {
  let stockInfoMessage = "";
  const productList = productStore.getProductList();
  productList.forEach((item) => {
    if (item.quantity < 5) {
      if (item.quantity > 0) {
        stockInfoMessage += `${item.name}: 재고 부족 (${item.quantity}개 남음)\n`;
      } else {
        stockInfoMessage += `${item.name}: 품절\n`;
      }
    }
  });

  stockInfo.textContent = stockInfoMessage;
}

main();

addBtn.addEventListener("click", function () {
  const selectedItemId = sel.value;
  const itemToAdd = productStore.getProductItem(selectedItemId);

  if (itemToAdd && itemToAdd.quantity > 0) {
    const item = document.getElementById(itemToAdd.id);
    if (item) {
      const newQty =
        parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
      if (newQty <= itemToAdd.quantity) {
        item.querySelector("span").textContent =
          itemToAdd.name + " - " + itemToAdd.price + "원 x " + newQty;

        productStore.updateProductItem(selectedItemId, (product) => ({
          ...product,
          quantity: itemToAdd.quantity - 1,
        }));
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      const newItem = document.createElement("div");
      newItem.id = itemToAdd.id;
      newItem.className = "flex justify-between items-center mb-2";
      newItem.innerHTML = `
        <span>${itemToAdd.name} - ${itemToAdd.price}원 x 1</span>
        <div>
          <button
            class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
            data-product-id="${itemToAdd.id}" 
            data-change="-1">-</button>
          <button
            class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
            data-product-id="${itemToAdd.id}" 
            data-change="1">+</button>
          <button
            class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
            data-product-id="${itemToAdd.id}">삭제</button>
        </div>
      `;
      cartDisp.appendChild(newItem);
      productStore.updateProductItem(selectedItemId, (product) => ({
        ...product,
        quantity: itemToAdd.quantity - 1,
      }));
    }

    renderCart();
    recentlyAddedCartItemId = selectedItemId;
  }
});

cartDisp.addEventListener("click", function (event) {
  const tgt = event.target;

  if (
    tgt.classList.contains("quantity-change") ||
    tgt.classList.contains("remove-item")
  ) {
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const productItem = productStore.getProductItem(prodId);

    if (tgt.classList.contains("quantity-change")) {
      const qtyChange = parseInt(tgt.dataset.change);
      const newQty =
        parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) +
        qtyChange;

      if (
        newQty > 0 &&
        newQty <=
          productItem.quantity +
            parseInt(itemElem.querySelector("span").textContent.split("x ")[1])
      ) {
        itemElem.querySelector("span").textContent =
          itemElem.querySelector("span").textContent.split("x ")[0] +
          "x " +
          newQty;
        productStore.updateProductItem(prodId, (product) => ({
          ...product,
          quantity: productItem.quantity - qtyChange,
        }));
      } else if (newQty <= 0) {
        itemElem.remove();
        productStore.updateProductItem(prodId, (product) => ({
          ...product,
          quantity: productItem.quantity - qtyChange,
        }));
      } else {
        alert("재고가 부족합니다.");
      }
    }

    if (tgt.classList.contains("remove-item")) {
      const remainingQuantity = parseInt(
        itemElem.querySelector("span").textContent.split("x ")[1],
      );
      productStore.updateProductItem(prodId, (product) => ({
        ...product,
        quantity: productItem.quantity + remainingQuantity,
      }));
      itemElem.remove();
    }

    renderCart();
  }
});
