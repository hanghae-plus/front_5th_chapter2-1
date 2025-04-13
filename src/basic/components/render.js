import { discountService } from "../services/DiscountService";
import { productService } from "../services/ProductService";
import { CartItem } from "./CartItem";
import { ProductSelectItem } from "./ProductSelectItem";
import { StockInfo } from "./StockInfo";

export function renderTotalPrice(totalPrice) {
  const sum = document.getElementById("cart-total");
  sum.textContent = `총액: ${Math.round(totalPrice)}원`;

  if (discountService.discountRate > 0) {
    const discountSpan = document.createElement("span");
    discountSpan.classList.add("text-green-500", "ml-2");
    discountSpan.textContent = `(${(discountService.discountRate * 100).toFixed(1)}% 할인 적용)`;
    sum.appendChild(discountSpan);
  }
}

export function renderNewItem(item) {
  const newItem = CartItem({
    id: item.id,
    name: item.name,
    price: item.val,
    quantity: 1,
  });

  const cartDisp = document.getElementById("cart-items");
  cartDisp.appendChild(newItem);

  item.q--;
}

export function renderBonusPts(bonusPoints) {
  let ptsTag = document.getElementById("loyalty-points");
  if (!ptsTag) {
    ptsTag = document.createElement("span");
    ptsTag.id = "loyalty-points";
    ptsTag.className = "text-blue-500 ml-2";
    const sum = document.getElementById("cart-total");
    sum.appendChild(ptsTag);
  }
  ptsTag.textContent = "(포인트: " + bonusPoints + ")";
}

export function renderStockInfo() {
  let infoMsg = "";
  productService.productList.forEach((item) => {
    infoMsg += StockInfo({
      name: item.name,
      quantityLeft: item.q,
    });
  });

  const stockInfo = document.getElementById("stock-status");
  stockInfo.textContent = infoMsg;
}

export function renderProductList() {
  const productSelector = document.getElementById("product-select");
  productSelector.innerHTML = "";

  productService.productList.forEach((item) => {
    const selectItem = ProductSelectItem({
      id: item.id,
      name: item.name,
      price: item.val,
      quantity: item.q,
    });
    productSelector.appendChild(selectItem);
  });
}
