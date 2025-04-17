import { dom } from './store';
import { productList } from './mock/product-list';
import { calcCart } from './cart';
export function setupEventHandlers() {
  dom.addBtn.addEventListener('click', () => {
    const selItem = dom.sel.value;
    const itemToAdd = productList.find((p) => p.id === selItem);
    if (!itemToAdd || itemToAdd.stock <= 0) return;

    const existing = document.getElementById(itemToAdd.id);
    if (existing) {
      const qty =
        parseInt(existing.querySelector('span').textContent.split('x ')[1]) + 1;
      if (qty > itemToAdd.stock) {
        alert('재고가 부족합니다');
        return;
      }
      existing.querySelector('span').textContent =
        `${itemToAdd.name} - ${itemToAdd.val}원 x ${qty}`;
      itemToAdd.stock--;
    } else {
      const newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML = `
        <span>${itemToAdd.name} - ${itemToAdd.val}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button>
        </div>
      `;
      dom.cartDisp.appendChild(newItem);
      itemToAdd.stock--;
    }
    calcCart();
  });

  dom.cartDisp.addEventListener('click', (e) => {
    const btn = e.target;
    const isQty = btn.classList.contains('quantity-change');
    const isRemove = btn.classList.contains('remove-item');
    if (!isQty && !isRemove) return;

    const prodId = btn.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const prod = productList.find((p) => p.id === prodId);
    const span = itemElem.querySelector('span');
    const qty = parseInt(span.textContent.split('x ')[1]);

    if (isQty) {
      const delta = parseInt(btn.dataset.change);
      const newQty = qty + delta;
      const max = prod.stock + qty;

      if (newQty > max) {
        alert('재고가 부족합니다.');
        return;
      }

      if (newQty <= 0) {
        itemElem.remove();
      } else {
        span.innerHTML = `${prod.name} - ${prod.val}원 x ${newQty}`;
      }
      prod.stock -= delta;
    }

    if (isRemove) {
      prod.stock += qty;
      itemElem.remove();
    }

    calcCart();
  });
}
