import { ALERT_MESSAGE } from '../constant/alertMessage';
import { calculateCart } from '../service/calculateCart';
import { globalStore } from '../store/globalStore';
import { createElement } from '../utils/createElement';

const { getState, setState } = globalStore;
const { prodList } = getState();

// getElementById 클로저로 구현하는게 좋나? 안좋을것 같은데 메모리에 별로일것 같음
// qna : 유틸성이 아니라 가독성 및 유지보수를 용이하게 하기 위해 로직 일부를 함수로 뺐는데 이런것도 유효한 방법인지 궁금하다.
const updateCartItemQuantity = (selectedItemElement, productItem) => {
  // qna : updateCartItemQuantity addNewCartItem 모두 단일책임은 아니고 render업데이트, 전역 state 업데이트 모두 하고 있는데 적절한지 궁금
  const newQuantity = parseInt(selectedItemElement.querySelector('span').textContent.split('x ')[1]) + 1;

  if (newQuantity <= productItem.quantity) {
    selectedItemElement.querySelector('span').textContent =
      `${productItem.name} - ${productItem.price}원 x ${newQuantity}`;
    productItem.quantity--;

    const updatedProdList = prodList.map((prod) => (prod.id === productItem.id ? productItem : prod));
    setState({ prodList: updatedProdList });
  } else {
    alert(ALERT_MESSAGE.OUT_OF_STOCK);
  }
};

const addNewCartItem = (productItem) => {
  const orderedList = document.getElementById('cart-items');
  if (!orderedList) return;

  const newItemInnerHTML = `<span>${productItem.name} - ${productItem.price}원 x 1</span><div><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${productItem.id}" data-change="-1">-</button><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${productItem.id}" data-change="1">+</button><button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${productItem.id}">삭제</button></div>`;

  const newItem = createElement('div', {
    id: productItem.id,
    className: 'flex justify-between items-center mb-2',
    innerHTML: newItemInnerHTML,
  });

  orderedList.appendChild(newItem);

  productItem.quantity--;
  const updatedProdList = prodList.map((prod) => (prod.id === productItem.id ? productItem : prod));
  setState({ prodList: updatedProdList });
};

export const setAddButtonEvent = () => {
  const addProdBtn = document.getElementById('add-to-cart');
  const prodSelect = document.getElementById('product-select');

  if (!addProdBtn || !prodSelect) return;

  addProdBtn.addEventListener('click', () => {
    const selItem = prodSelect.value;
    const itemToAdd = prodList.find((p) => p.id === selItem);

    if (!itemToAdd || itemToAdd.quantity <= 0) return;

    const selectedItem = document.getElementById(itemToAdd.id);
    if (selectedItem) {
      updateCartItemQuantity(selectedItem, itemToAdd);
    } else {
      addNewCartItem(itemToAdd);
    }
    calculateCart();
    setState({ lastSelectedItemId: selItem });
  });
};
