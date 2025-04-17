import createState from "./state";
import { App } from "./components";
import { beginThunderDiscount, beginAdditionalDiscount } from "./handler";
import { calcCart } from "./utils";

const render = () => {
  const { totalAmount, discountRate } = calcCart();

  renderTotalAmount(totalAmount);
  renderDiscountInfo(discountRate);
  renderStockInfo();
  renderLoyaltyPoints(totalAmount);
  renderCart();
};

export let { cartState, state } = createState(render);

const $ = (query) => document.querySelector(query);

const main = () => {
  const $root = $("#app");
  $root.replaceWith(App($root));

  render();
  renderSelOpts();

  beginThunderDiscount();
  beginAdditionalDiscount();
};

const getCartElement = ({ id, name, price, quantity }) => {
  const template = document.getElementById("cart-item");
  const $element = template.content.firstElementChild.cloneNode(true);

  $element.id = id;
  $element.querySelector("span").textContent =
    name + " - " + price + "원 x " + quantity;
  Array.from($element.querySelectorAll("button")).forEach((btn) => {
    btn.setAttribute("data-product-id", id);
  });

  return $element;
};

const renderCart = () => {
  const $cartItems = $("#cart-items");
  $cartItems.innerHTML = "";

  Object.entries(cartState)
    .filter(([_, quantity]) => quantity > 0)
    .map(([prodId, quantity]) => {
      return getCartElement({
        ...state.stock[prodId],
        id: prodId,
        quantity: quantity,
      });
    })
    .forEach(($element) => {
      console.log($element);
      $cartItems.appendChild($element);
    });
};

const renderTotalAmount = (totalAmount) => {
  const $cartTotal = $("#cart-total");
  $cartTotal.textContent = "총액: " + Math.round(totalAmount) + "원";
};

const renderDiscountInfo = (discountRate) => {
  if (isNaN(discountRate) || discountRate <= 0) return;
  const $cartTotal = $("#cart-total");
  let span = document.createElement("span");
  span.className = "text-green-500 ml-2";
  span.textContent = "(" + (discountRate * 100).toFixed(1) + "% 할인 적용)";
  $cartTotal.appendChild(span);
};

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

const renderStockInfo = () => {
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
};

export const renderSelOpts = () => {
  const $productSelect = $("#product-select");
  $productSelect.innerHTML = "";
  Object.entries(state.stock).forEach(([prodId, prodInfo]) => {
    const opt = document.createElement("option");
    opt.value = prodId;
    opt.textContent = prodInfo.name + " - " + prodInfo.price + "원";
    if (prodInfo.quantity === 0) opt.disabled = true;
    $productSelect.appendChild(opt);
  });
};

main();
