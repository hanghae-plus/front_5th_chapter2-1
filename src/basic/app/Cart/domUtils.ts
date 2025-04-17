import { ElementIds } from '../../../shared/app/constants';
import { Product } from '../../../shared/store/productList';

export function createCartItemElement(itemToAdd: Product, quantity: number = 1): HTMLDivElement {
  const $newItem = document.createElement('div');
  $newItem.id = itemToAdd.id;
  $newItem.className = 'flex justify-between items-center mb-2';
  $newItem.innerHTML =
    `<span>${itemToAdd.name} - ${itemToAdd.val}원 x ${quantity}</span>` +
    `<div><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>` +
    `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>` +
    `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button></div>`;

  return $newItem;
}

export function updateCartItemQuantity(productId: string, newQuantity: number): void {
  const item = document.getElementById(productId);
  if (item) {
    const span = item.querySelector('span');
    if (span) {
      const [name, price] = span.textContent?.split(' - ') || [];
      if (name && price) {
        span.textContent = `${name} - ${price.split('x')[0]}x ${newQuantity}`;
      }
    }
  }
}

export function removeCartItemElement(productId: string): void {
  const item = document.getElementById(productId);
  if (item) {
    item.remove();
  }
}

export function updateBonusPointElement(totalAmt: number, bonusPts: number): void {
  const $sum = document.getElementById(ElementIds.SUM);
  let $ptsTag = document.getElementById(ElementIds.LOYALTY_POINTS);

  if (!$ptsTag && $sum) {
    $ptsTag = document.createElement('span');
    $ptsTag.id = ElementIds.LOYALTY_POINTS;
    $sum.appendChild($ptsTag);
  }

  if ($ptsTag) {
    $ptsTag.textContent = `(포인트: ${bonusPts})`;
  }
}

export function updateStockInfoElement(stockMessage: string): void {
  const $stockInfo = document.getElementById(ElementIds.STOCK_INFO);
  if ($stockInfo) {
    $stockInfo.textContent = stockMessage;
  }
} 