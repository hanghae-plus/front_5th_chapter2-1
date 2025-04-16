import { DOM } from '../elements';
import { PRODUCT, CART } from '../store';

export function calculateCart() {
  CART.resetCalculation();

  const allProducts = PRODUCT.getAll();
  const cartItems = DOM.getElement('cartItemContainer').children;

  let originalTotalAmount = 0;

  for (let i = 0; i < cartItems.length; i++) {
    let currentItem;

    for (let j = 0; j < allProducts.length; j++) {
      if (allProducts[j].id === cartItems[i].id) {
        currentItem = allProducts[j];

        break;
      }
    }

    const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
    const totalAmount = currentItem.price * quantity;
    const discountRate = quantity >= 10 ? PRODUCT.getDiscountRate(currentItem.id) : 0;

    CART.setItemCount(CART.getItemCount() + quantity);

    originalTotalAmount += totalAmount;

    CART.setTotalAmount(CART.getTotalAmount() + totalAmount * (1 - discountRate));
  }

  let discountRate = 0;

  if (CART.getItemCount() >= 30) {
    const bulkDiscount = CART.getTotalAmount() * 0.25;
    const itemDisc = originalTotalAmount - CART.getTotalAmount();

    if (bulkDiscount > itemDisc) {
      CART.setTotalAmount(CART.getTotalAmount() * (1 - 0.25));
      discountRate = 0.25;
    }
  } else {
    discountRate = (originalTotalAmount - CART.getTotalAmount()) / originalTotalAmount;
  }

  const isTuesday = new Date().getDay() === 2;

  if (isTuesday) {
    CART.setTotalAmount(CART.getTotalAmount() * (1 - 0.1));

    discountRate = Math.max(discountRate, 0.1);
  }

  DOM.getElement('summary').textContent = `총액: ${Math.round(CART.getTotalAmount())}원`;

  if (discountRate > 0) {
    const discountTag = document.createElement('span');

    discountTag.className = 'text-green-500 ml-2';
    discountTag.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;

    DOM.getElement('summary').appendChild(discountTag);
  }

  updateStockInfo();
  renderBonusPoint();
}

export function updateStockInfo() {
  let infoMsg = '';

  PRODUCT.getAll().forEach(({ name, quantity }) => {
    const isSoldOut = quantity === 0;
    const isLowStock = quantity > 0 && quantity < 5;

    if (isSoldOut) {
      infoMsg += `${name}: 품절`;
    }

    if (isLowStock) {
      infoMsg += `${name}: 재고 부족 (${quantity}개 남음)`;
    }
  });

  DOM.getElement('stockInfo').textContent = infoMsg;
}

export function renderBonusPoint() {
  const bonusPoint = Math.floor(CART.getTotalAmount() / 1000);

  const pointTag = () => {
    const existingTag = document.getElementById('loyalty-points');

    if (existingTag) {
      return existingTag;
    }

    const newTag = document.createElement('span');

    newTag.id = 'loyalty-points';
    newTag.className = 'text-blue-500 ml-2';

    DOM.getElement('summary').appendChild(newTag);

    return newTag;
  };

  pointTag().textContent = `(포인트: ${bonusPoint})`;
}

export function updateSelectOptions() {
  DOM.getElement('select').innerHTML = '';

  PRODUCT.getAll().forEach((item) => {
    const option = document.createElement('option');

    option.value = item.id;
    option.textContent = `${item.name} - ${item.price}원`;

    if (item.quantity === 0) {
      option.disabled = true;
    }

    DOM.getElement('select').appendChild(option);
  });
}
