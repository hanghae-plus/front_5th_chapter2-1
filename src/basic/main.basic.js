let $productSelect, $addBtn, $cart, $cartTotal, $stockInfo;
let lastSelectedItem,
  bonusPoints = 0,
  totalAmount = 0;

const products = [
  { id: "p1", name: "상품1", value: 10000, quantity: 50 },
  { id: "p2", name: "상품2", value: 20000, quantity: 30 },
  { id: "p3", name: "상품3", value: 30000, quantity: 20 },
  { id: "p4", name: "상품4", value: 15000, quantity: 0 },
  { id: "p5", name: "상품5", value: 25000, quantity: 10 },
];

function main() {
  let $root = document.getElementById("app");

  let $cont = document.createElement("div");
  $cont.className = "bg-gray-100 p-8";

  let $wrap = document.createElement("div");
  $wrap.className =
    "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";

  let $hTxt = document.createElement("h1");
  $hTxt.className = "text-2xl font-bold mb-4";
  $hTxt.textContent = "장바구니";

  $cart = document.createElement("div");
  $cart.id = "cart-items";

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

  updateSelectOptions();

  $wrap.appendChild($hTxt);
  $wrap.appendChild($cart);
  $wrap.appendChild($cartTotal);
  $wrap.appendChild($productSelect);
  $wrap.appendChild($addBtn);
  $wrap.appendChild($stockInfo);
  $cont.appendChild($wrap);
  $root.appendChild($cont);

  calculateCart();

  setTimeout(function () {
    setInterval(function () {
      let luckyItem = products[Math.floor(Math.random() * products.length)];

      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.value = Math.round(luckyItem.value * 0.8);
        alert("번개세일! " + luckyItem.name + "이(가) 20% 할인 중입니다!");
        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedItem) {
        let suggest = products.find(function (item) {
          return item.id !== lastSelectedItem && item.quantity > 0;
        });
        if (suggest) {
          alert(
            suggest.name + "은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!",
          );
          suggest.value = Math.round(suggest.value * 0.95);
          updateSelectOptions();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function updateSelectOptions() {
  $productSelect.innerHTML = "";

  products.forEach(function (item) {
    let $option = document.createElement("option");
    $option.value = item.id;
    $option.textContent = item.name + " - " + item.value + "원";

    if (item.quantity === 0) $option.disabled = true;

    $productSelect.appendChild($option);
  });
}

function calculateCart() {
  totalAmount = 0;
  let itemCount = 0;
  let cartItems = $cart.children;
  let subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let currentItem;

      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          currentItem = products[j];
          break;
        }
      }

      let quantity = parseInt(
        cartItems[i].querySelector("span").textContent.split("x ")[1],
      );
      let itemTotal = currentItem.value * quantity;
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
    const BUCK_DISCOUNT_RATE = 0.25;
    let bulkDiscount = totalAmount * BUCK_DISCOUNT_RATE;
    let itemDisc = subTotal - totalAmount;

    if (bulkDiscount > itemDisc) {
      totalAmount = subTotal * (1 - BUCK_DISCOUNT_RATE);
      discountRate = BUCK_DISCOUNT_RATE;
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
    let $span = document.createElement("span");
    $span.className = "text-green-500 ml-2";
    $span.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
    $cartTotal.appendChild($span);
  }

  updateStockInfo();
  renderBonusPoints();
}

const renderBonusPoints = () => {
  bonusPoints = Math.floor(totalAmount / 1000);

  let $pointsTag = document.getElementById("loyalty-points");

  if (!$pointsTag) {
    $pointsTag = document.createElement("span");
    $pointsTag.id = "loyalty-points";
    $pointsTag.className = "text-blue-500 ml-2";
    $cartTotal.appendChild($pointsTag);
  }

  $pointsTag.textContent = "(포인트: " + bonusPoints + ")";
};

function updateStockInfo() {
  let infoMessage = "";

  products.forEach(function (item) {
    if (item.quantity < 5) {
      infoMessage +=
        item.name +
        ": " +
        (item.quantity > 0
          ? "재고 부족 (" + item.quantity + "개 남음)"
          : "품절") +
        "\n";
    }
  });

  $stockInfo.textContent = infoMessage;
}

main();

$addBtn.addEventListener("click", function () {
  const selectedItem = $productSelect.value;
  let itemToAdd = products.find(function (product) {
    return product.id === selectedItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    let $item = document.getElementById(itemToAdd.id);

    if ($item) {
      let newQuantity =
        parseInt($item.querySelector("span").textContent.split("x ")[1]) + 1;

      if (newQuantity <= itemToAdd.quantity) {
        $item.querySelector("span").textContent =
          itemToAdd.name + " - " + itemToAdd.value + "원 x " + newQuantity;
        itemToAdd.quantity--;
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      let $newItem = document.createElement("div");
      $newItem.id = itemToAdd.id;
      $newItem.className = "flex justify-between items-center mb-2";
      $newItem.innerHTML =
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

      $cart.appendChild($newItem);
      itemToAdd.quantity--;
    }

    calculateCart();
    lastSelectedItem = selectedItem;
  }
});

$cart.addEventListener("click", function (event) {
  let { target } = event;

  if (
    target.classList.contains("quantity-change") ||
    target.classList.contains("remove-item")
  ) {
    let productId = target.dataset.productId;
    let $item = document.getElementById(productId);
    let product = products.find(function (product) {
      return product.id === productId;
    });

    if (target.classList.contains("quantity-change")) {
      let qtyChange = parseInt(target.dataset.change);
      let newQuantity =
        parseInt($item.querySelector("span").textContent.split("x ")[1]) +
        qtyChange;

      if (
        newQuantity > 0 &&
        newQuantity <=
          product.quantity +
            parseInt($item.querySelector("span").textContent.split("x ")[1])
      ) {
        $item.querySelector("span").textContent =
          $item.querySelector("span").textContent.split("x ")[0] +
          "x " +
          newQuantity;
        product.quantity -= qtyChange;
      } else if (newQuantity <= 0) {
        $item.remove();
        product.quantity -= qtyChange;
      } else {
        alert("재고가 부족합니다.");
      }
    } else if (target.classList.contains("remove-item")) {
      let removedQuantity = parseInt(
        $item.querySelector("span").textContent.split("x ")[1],
      );
      product.quantity += removedQuantity;
      $item.remove();
    }
    calculateCart();
  }
});
