import { prodList } from '../lib/constants';
import { updateCartItems } from '../updates/cartItems';
import { extractCartProductInfo } from '../lib/utils';

export const CartItemContainer = {
  template: () => `<div id="cart-items"></div>`,
  onMount: () => {
    const cartDisp = document.getElementById('cart-items');
    cartDisp.addEventListener('click', function (event) {
      const tgt = event.target;
      const isQuantityButtonClicked = tgt.classList.contains('quantity-change');
      const isRemoveButtonClicked = tgt.classList.contains('remove-item');

      if (!isQuantityButtonClicked && !isRemoveButtonClicked) return;

      const prodId = tgt.dataset.productId;
      const itemElem = document.getElementById(prodId);
      const prod = prodList.find((product) => product.id === prodId);

      const itemStrElem = itemElem.querySelector('span');
      const { name, quantity } = extractCartProductInfo(itemStrElem);

      if (isQuantityButtonClicked) {
        const qtyChange = parseInt(tgt.dataset.change);
        const newQty = quantity + qtyChange;
        if (newQty > 0 && newQty <= prod.quantity + quantity) {
          itemStrElem.textContent = `${name} x ${newQty}`;
          prod.quantity -= qtyChange;
        } else if (newQty <= 0) {
          itemElem.remove();
          prod.quantity -= qtyChange;
        } else {
          alert('재고가 부족합니다.');
        }
      } else if (isRemoveButtonClicked) {
        prod.quantity += quantity;
        itemElem.remove();
      }
      updateCartItems();
    });
  },
};
