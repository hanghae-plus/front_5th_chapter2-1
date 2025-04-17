import PRODUCT_LIST from "./constants/constant.js";

let productList = PRODUCT_LIST;
let cartList, addProductBtn, cartContainer, totalPrice, stockInfo;
let lastSel,
  bonusPoints = 0,
  totalAmount = 0,
  itemCount = 0;
function main() {
  let root = document.getElementById("app");

  let mainContainer = document.createElement("div");
  mainContainer.className = "bg-gray-100 p-8";

  let wrapper = document.createElement("div");
  wrapper.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

  let headerTitle = document.createElement("h1");
  headerTitle.className = "text-2xl font-bold mb-4";
  headerTitle.textContent = "장바구니";

  cartContainer = document.createElement("div");
  cartContainer.id = "cart-items";

  totalPrice = document.createElement("div");
  totalPrice.id = "cart-total";
  totalPrice.className = "text-xl font-bold my-4";

  cartList = document.createElement("select");
  cartList.id = "product-select";
  cartList.className = "border rounded p-2 mr-2";

  addProductBtn = document.createElement("button");
  addProductBtn.id = "add-to-cart";
  addProductBtn.className = "bg-blue-500 text-white px-4 py-2 rounded";
  addProductBtn.textContent = "추가";

  stockInfo = document.createElement("div");
  stockInfo.id = "stock-status";
  stockInfo.className = "text-sm text-gray-500 mt-2";

  updateProductList();
  wrapper.appendChild(headerTitle);
  wrapper.appendChild(cartContainer);
  wrapper.appendChild(totalPrice);
  wrapper.appendChild(cartList);
  wrapper.appendChild(addProductBtn);
  wrapper.appendChild(stockInfo);
  mainContainer.appendChild(wrapper);
  root.appendChild(mainContainer);
  calcCart();
  setTimeout(function () {
    setInterval(function () {
      let luckyItem =
        productList[Math.floor(Math.random() * productList.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateProductList();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        let suggest = productList.find(function (item) {
          return item.id !== lastSel && item.quantity > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggest.price = Math.round(suggest.price * 0.95);
          updateProductList();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateProductList() {
  cartList.innerHTML = "";
  productList.forEach(function (item) {
    let opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name + " - " + item.price + "원";
    if (item.quantity === 0) opt.disabled = true;
    cartList.appendChild(opt);
  });
}

function calcCart() {
  totalAmount = 0;
  itemCount = 0;
  let cartItems = cartContainer.children;
  let subTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let currentItem;
      for (let j = 0; j < productList.length; j++) {
        if (productList[j].id === cartItems[i].id) {
          currentItem = productList[j];
          break;
        }
      }
      let quantity = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1],
      );
      let itemTotal = currentItem.price * quantity;
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
  let discRate = 0;
  if (itemCount >= 30) {
    let bulkDisc = totalAmount * 0.25;
    let itemDisc = subTotal - totalAmount;
    if (bulkDisc > itemDisc) {
      totalAmount = subTotal * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discRate = (subTotal - totalAmount) / subTotal;
  }
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  totalPrice.textContent = "총액: " + Math.round(totalAmount) + "원";
  if (discRate > 0) {
    let span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
    totalPrice.appendChild(span);
  }
  updateStockInfo();
  renderBonusPoints();
}

const renderBonusPoints = () => {
  bonusPoints = Math.floor(totalAmount / 1000);
  let pointsTag = document.getElementById("loyalty-points");
  if (!pointsTag) {
    pointsTag = document.createElement("span");
    pointsTag.id = "loyalty-points";
    pointsTag.className = "text-blue-500 ml-2";
    totalPrice.appendChild(pointsTag);
  }
  pointsTag.textContent = "(포인트: " + bonusPoints + ")";
};

function updateStockInfo() {
  let infoMsg = "";
  productList.forEach(function (item) {
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
  stockInfo.textContent = infoMsg;
}

main();

// 상품담기 버튼 이벤트 핸들러
addProductBtn.addEventListener("click", function () {
  let selectProduct = cartList.value;
  let productToAdd = productList.find(function (p) {
    return p.id === selectProduct;
  });
  if (productToAdd && productToAdd.quantity > 0) {
    let item = document.getElementById(productToAdd.id);
    if (item) {
      let newQuantity =
        parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
      if (newQuantity <= productToAdd.quantity) {
        item.querySelector("span").textContent =
          productToAdd.name +
          " - " +
          productToAdd.price +
          "원 x " +
          newQuantity;
        productToAdd.quantity--;
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      let newItem = document.createElement("div");
      newItem.id = productToAdd.id;
      newItem.className = "flex justify-between items-center mb-2";
      newItem.innerHTML =
        "<span>" +
        productToAdd.name +
        " - " +
        productToAdd.price +
        "원 x 1</span><div>" +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        productToAdd.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        productToAdd.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        productToAdd.id +
        '">삭제</button></div>';
      cartContainer.appendChild(newItem);
      productToAdd.quantity--;
    }
    calcCart();
    lastSel = selectProduct;
  }
});

// 상품 선택 옵션 업데이트
cartContainer.addEventListener("click", function (event) {
  let target = event.target;
  if (
    target.classList.contains("quantity-change") ||
    target.classList.contains("remove-item")
  ) {
    let productId = target.dataset.productId;
    let productElement = document.getElementById(productId);
    let product = productList.find(function (p) {
      return p.id === productId;
    });
    if (target.classList.contains("quantity-change")) {
      let quantityChange = parseInt(target.dataset.change);
      let newQuantity =
        parseInt(
          productElement.querySelector("span").textContent.split("x ")[1],
        ) + quantityChange;
      if (
        newQuantity > 0 &&
        newQuantity <=
          product.quantity +
            parseInt(
              productElement.querySelector("span").textContent.split("x ")[1],
            )
      ) {
        productElement.querySelector("span").textContent =
          productElement.querySelector("span").textContent.split("x ")[0] +
          "x " +
          newQuantity;
        product.quantity -= quantityChange;
      } else if (newQuantity <= 0) {
        productElement.remove();
        product.quantity -= quantityChange;
      } else {
        alert("재고가 부족합니다.");
      }
    } else if (target.classList.contains("remove-item")) {
      let removeQuantity = parseInt(
        productElement.querySelector("span").textContent.split("x ")[1],
      );
      product.quantity += removeQuantity;
      productElement.remove();
    }
    calcCart();
  }
});
