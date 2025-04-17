import { DOM } from '../elements';
import { DAY_OF_WEEK } from '../lib';
import { PRODUCT, CART } from '../store';

const updateStockInfo = () => {
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
};

const renderBonusPoint = () => {
  const bonusPoint = Math.floor(CART.getTotalAmount() / 1000);

  const pointTag = () => {
    const existingTag = document.getElementById('loyalty-points');

    if (existingTag) {
      return existingTag;
    }

    const newTag = document.createElement('span');

    newTag.id = 'loyalty-points';
    newTag.className = 'text-blue-500 ml-2';

    DOM.appendElement('summary', newTag);

    return newTag;
  };

  pointTag().textContent = `(포인트: ${bonusPoint})`;
};

const getOriginalTotalAmount = (cartItems, allProducts) => {
  let originalTotalAmount = 0;

  Array.from(cartItems).forEach((item) => {
    let currentItem;

    allProducts.forEach((product) => {
      if (product.id !== item.id) return;

      currentItem = product;
    });

    const quantity = parseInt(item.querySelector('span').textContent.split('x ')[1]);
    const totalAmount = currentItem.price * quantity;
    const discountRate = quantity >= 10 ? PRODUCT.getDiscountRate(currentItem.id) : 0;

    originalTotalAmount += totalAmount;

    CART.setItemCount(CART.getItemCount() + quantity);
    CART.setTotalAmount(CART.getTotalAmount() + totalAmount * (1 - discountRate));
  });

  return originalTotalAmount;
};

const getDiscountRate = (originalTotalAmount) => {
  let discountRate = 0;

  const bulkDiscount = CART.getTotalAmount() * 0.25;
  const itemDiscount = originalTotalAmount - CART.getTotalAmount();

  const isBulkDiscount = CART.getItemCount() >= 30 && bulkDiscount > itemDiscount;

  if (isBulkDiscount) {
    CART.setTotalAmount(CART.getTotalAmount() * (1 - 0.25));

    discountRate = 0.25;
  } else {
    discountRate = itemDiscount / originalTotalAmount;
  }

  if (new Date().getDay() === DAY_OF_WEEK.TUESDAY) {
    CART.setTotalAmount(CART.getTotalAmount() * (1 - 0.1));

    discountRate = Math.max(discountRate, 0.1);
  }

  return discountRate;
};

const setDiscountTag = (discountRate) => {
  if (!discountRate) return;

  const discountTag = document.createElement('span');

  discountTag.className = 'text-green-500 ml-2';
  discountTag.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;

  DOM.appendElement('summary', discountTag);
};

export const calculateCart = () => {
  CART.resetCalculation();

  const allProducts = PRODUCT.getAll();
  const cartItems = DOM.getElement('cartItemContainer').children;

  const originalTotalAmount = getOriginalTotalAmount(cartItems, allProducts);
  const discountRate = getDiscountRate(originalTotalAmount);

  DOM.getElement('summary').textContent = `총액: ${Math.round(CART.getTotalAmount())}원`;

  setDiscountTag(discountRate);

  updateStockInfo();
  renderBonusPoint();
};

export const updateSelectOptions = () => {
  DOM.getElement('select').innerHTML = '';

  PRODUCT.getAll().forEach(({ id, name, price, quantity }) => {
    const option = document.createElement('option');

    option.value = id;
    option.textContent = `${name} - ${price}원`;
    option.disabled = quantity === 0;

    DOM.appendElement('select', option);
  });
};
