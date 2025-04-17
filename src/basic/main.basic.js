import './utils/alertEvent';
import {
  Title,
  Select,
  NewItem,
  Wrapper,
  AddButton,
  TotalPrice,
  StockStatus,
  CartDisplay,
} from './components';
import { PRODUCT_LIST } from './constant';
import { updateSelectOption, updateCartSummary } from './utils';

function main() {
  const root = document.getElementById('app');
  const wrapper = Wrapper();

  wrapper.appendChild(Title());
  wrapper.appendChild(CartDisplay());
  wrapper.appendChild(TotalPrice());
  wrapper.appendChild(Select());
  wrapper.appendChild(AddButton());
  wrapper.appendChild(StockStatus());
  root.appendChild(wrapper);
  updateSelectOption();
  updateCartSummary();
}

main();

document.getElementById('add-to-cart').addEventListener('click', () => {
  const selectItem = document.getElementById('product-select').value;
  const itemToAdd = PRODUCT_LIST.find((product) => {
    return product.id === selectItem;
  });

  if (itemToAdd && itemToAdd.quantity > 0) {
    const item = document.getElementById(itemToAdd.id);

    if (item) {
      const newQuantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQuantity <= itemToAdd.quantity) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.price + '원 x ' + newQuantity;
        itemToAdd.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      document.getElementById('cart-items').innerHTML += NewItem(itemToAdd);
      itemToAdd.quantity--;
    }
    updateCartSummary();
  }
});

document.getElementById('cart-items').addEventListener('click', (event) => {
  const target = event.target;

  const isQuantityChange = target.classList.contains('quantity-change');
  const isRemoveItem = target.classList.contains('remove-item');

  if (isQuantityChange || isRemoveItem) {
    const prodId = target.dataset.productId;
    const itemElem = document.getElementById(prodId);
    const span = itemElem.querySelector('span');

    const prod = PRODUCT_LIST.find((product) => {
      return product.id === prodId;
    });

    if (isQuantityChange) {
      const quantityChange = parseInt(target.dataset.change);
      const newQty = parseInt(span.textContent.split('x ')[1]) + quantityChange;

      if (newQty > 0 && newQty <= prod.quantity + parseInt(span.textContent.split('x ')[1])) {
        span.textContent = span.textContent.split('x ')[0] + 'x ' + newQty;
        prod.quantity -= quantityChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (isRemoveItem) {
      itemElem.remove();
    }
    updateCartSummary();
  }
});
