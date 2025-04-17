import { html } from '../utils/dom.js';
import { formatPercent, formatPrice } from '../utils/helpers.js';
import { POINT_PER_1000_WON } from '../data/constants.js';

/*
* 장바구니 아이템 HTML 생성 함수
* */
export function createCartItemElement(product, quantity = 1) {
  return html`
    <li id="${product.id}" class="flex justify-between items-center mb-2">
      <span>${product.name} - ${product.price}원 x ${quantity}</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
      </div>
    </li>
  `;
}

/*
* 총액 표시 업데이트 함수
* */
export function updateTotalDisplay(totalDisplay, totalAmount, discountRate) {
  totalDisplay.textContent = `총액: ${formatPrice(totalAmount)}`;

  // 할인율 표시
  if (discountRate > 0) {
    const discountSpan = html`
      <span class="text-green-500 ml-2">(${formatPercent(discountRate)} 할인 적용)</span>
    `;
    totalDisplay.appendChild(discountSpan);
  }
}

/*
* 포인트 업데이트 함수
* */
export function updateLoyaltyPoints(totalDisplay, totalAmount) {
  const loyaltyPoints = Math.floor(totalAmount * POINT_PER_1000_WON);

  let pointsTag = document.getElementById('loyalty-points');
  if (!pointsTag) {
    pointsTag = html`
      <span id="loyalty-points" class="text-blue-500 ml-2"></span>
    `;
    totalDisplay.appendChild(pointsTag);
  }

  pointsTag.textContent = `(포인트: ${loyaltyPoints})`;
  return loyaltyPoints;
}

/*
* 장바구니 이벤트 처리 함수
* */
export function handleCartAction(event, changeQuantityFn, removeCartItemFn) {
  const target = event.target;
  const productId = target?.dataset?.productId;

  if (!productId) return;

  if (target.classList.contains('quantity-change')) {
    const change = parseInt(target.dataset.change);
    changeQuantityFn(productId, change);
  } else if (target.classList.contains('remove-item')) {
    removeCartItemFn(productId);
  }
}
