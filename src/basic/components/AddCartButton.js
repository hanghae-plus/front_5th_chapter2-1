import { updateCart } from '../utils';
import { createElement } from '../utils/elementUtils';
import { selectProduct, cartItems } from '../components';
import { productStore, cartStore } from '../store';

export const addCartButton = {
  $element: null,
  render() {
    const addCartButtonElement = createElement('button', {
      id: 'add-to-cart',
      className: 'bg-blue-500 text-white px-4 py-2 rounded',
      textContent: '추가',
    });

    this.$element = addCartButtonElement;
    this.$element.addEventListener('click', () =>
      this.handleAddCartButtonClick(),
    );

    return this.$element;
  },
  getElement() {
    return this.$element;
  },
  handleAddCartButtonClick() {
    const selectedItem = selectProduct.getElement().value;

    const addItem = productStore.getFindProduct(selectedItem);

    const isAvailableQuantity = (addItem?.quantity ?? 0) > 0;
    if (!isAvailableQuantity) {
      alert('재고가 부족합니다.');
      return;
    }

    const itemElement = document.getElementById(addItem.id);
    if (itemElement) {
      const addQuantity =
        parseInt(itemElement.querySelector('span').textContent.split('x ')[1]) +
        1;

      itemElement.querySelector('span').textContent =
        `${addItem.name} - ${addItem.price}원 x ${addQuantity}`;

      addItem.quantity--;
    } else {
      cartItems.addNewCartItem(addItem);

      addItem.quantity--;
    }

    updateCart();

    cartStore.setSelectedProduct(selectedItem);
  },
};
