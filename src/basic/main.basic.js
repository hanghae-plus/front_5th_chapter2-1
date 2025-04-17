import {DISCOUNT_RATIO} from './fixture'
import createState from './state'
import App from './components/App';
import {beginThunderDiscount, beginAdditionalDiscount} from './handler';

export let {cartState, state} = createState(render)

const isTuesDay = () => (new Date().getDay() === 2 ? true : false);

const $ = (query) => document.querySelector(query);

function main() {
  const root = $("#app");
  root.replaceWith(App(root))

  render();

  beginThunderDiscount();
  beginAdditionalDiscount();
}

function getDiscountRatioWhenProductOver10(quantity, id) {
  if (quantity >= DISCOUNT_RATIO.EACH_PRODUCT.QUANTITY) {
    if (id === "p1") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
    else if (id === "p2") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
    else if (id === "p3") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
    else if (id === "p4") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
    else if (id === "p5") return DISCOUNT_RATIO.EACH_PRODUCT.RATIO[id];
  }
  return 0;
}

function calcCart() {
  let itemCnt = Object.values(cartState).reduce((acc, count) => {
    return acc + count;
  }, 0);


  let subTot = Object.entries(cartState).reduce((acc, [prodId, quantity]) => {
    return acc + state.stock[prodId].price * quantity;
  }, 0);

  let totalAmount = Object.entries(cartState).reduce(
    (acc, [prodId, quantity]) => {
      const itemTot = state.stock[prodId].price * quantity;
      let discount = getDiscountRatioWhenProductOver10(quantity, prodId);
      return acc + itemTot * (1 - discount);
    },
    0
  );

  let discountRate = (subTot - totalAmount) / subTot; 
  if (itemCnt >= DISCOUNT_RATIO.ALL_PRODUCT.QUANTITY) {
    const bulkDiscount = totalAmount * DISCOUNT_RATIO.ALL_PRODUCT.RATIO; 
    const itemDiscount = subTot - totalAmount; 
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTot * (1 - DISCOUNT_RATIO.ALL_PRODUCT.RATIO);
      discountRate = DISCOUNT_RATIO.ALL_PRODUCT.RATIO;
    }
  }

  if (isTuesDay()) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  return {
    totalAmount,
    discountRate,
  };
}

function render() {
  const { totalAmount, discountRate } = calcCart();

  renderTotalAmount(totalAmount);
  renderDiscountInfo(discountRate);
  renderStockInfo();
  renderLoyaltyPoints(totalAmount);
  renderCart();
  renderSelOpts();
}

function getCartElement({ id, name, price, quantity }) {
  return `
    <div id="${id}" class="flex justify-between items-center mb-2">
      <span>${name + " - " + price + "원 x " + quantity}</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button>
      </div>
    </div>
  `;
}

function renderCart() {
  const $cartItems = $("#cart-items");

  const cartElements = Object.entries(cartState)
    .filter(([_, quantity]) => quantity > 0)
    .map(([prodId, quantity]) => {
      return getCartElement({
        ...state.stock[prodId],
        id: prodId,
        quantity: quantity,
      });
    })
    .join("");

  $cartItems.innerHTML = cartElements;
}

function renderTotalAmount(totalAmount) {
  const $cartTotal = $("#cart-total");
  $cartTotal.textContent = "총액: " + Math.round(totalAmount) + "원";
}

function renderDiscountInfo(discountRate) {
  if (isNaN(discountRate) || discountRate <= 0) return;
  const $cartTotal = $("#cart-total");
  let span = document.createElement("span");
  span.className = "text-green-500 ml-2";
  span.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
  $cartTotal.appendChild(span);
}

const renderLoyaltyPoints = (totalAmount) => {
  const loyaltyPoints = Math.floor(totalAmount / 1000);
  const $cartTotal = $("#cart-total");
  let ptsTag = $("#loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    $cartTotal.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + loyaltyPoints + ")";
};

function renderStockInfo() {
  const msg = Object.entries(state.stock)
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

export function renderSelOpts() {
  const $productSelect = $("#product-select");
  $productSelect.innerHTML = "";
  Object.entries(state.stock).forEach(([prodId, prodInfo]) => {
    const opt = document.createElement("option");
    opt.value = prodId;
    opt.textContent = prodInfo.name + " - " + prodInfo.price + "원";
    if (prodInfo.quantity === 0) opt.disabled = true;
    $productSelect.appendChild(opt);
  });
}


main();
