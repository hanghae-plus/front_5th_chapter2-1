import { CartStore } from '../store';
import { TotalAmountContainerDOM, CartItemsContainerDOM } from '../ui';
import { getDiscountRate } from './getDiscountRate';
import { DISCOUNT_TABLE, PRODUCT_LIST } from '../consts';
import { updateStockStatus, renderBonusPoints } from '../render';

export const calculateCart = () => {
  const cartItemsContainer = CartItemsContainerDOM.get();
  const totalAmountContainer = TotalAmountContainerDOM.get();

  const cartItems = [...cartItemsContainer.children];

  const { itemCount, subTotal, totalAmount } = cartItems.reduce(
    (acc, item) => {
      const currentItem = PRODUCT_LIST.find(
        (product) => product.id === item.id,
      );
      if (!currentItem) return acc;

      const quantity = parseInt(item.querySelector('span').dataset.quantity);
      const itemTotal = currentItem.value * quantity;
      const discount =
        quantity >= 10 ? (DISCOUNT_TABLE[currentItem.id] ?? 0) : 0;

      acc.itemCount += quantity;
      acc.subTotal += itemTotal;
      acc.totalAmount += itemTotal * (1 - discount);

      return acc;
    },
    {
      itemCount: 0,
      subTotal: 0,
      totalAmount: 0,
    },
  );

  console.log('calculateCart');
  console.log(itemCount, subTotal, totalAmount);

  CartStore.set('itemCount', itemCount);
  CartStore.set('subTotal', subTotal);
  CartStore.set('totalAmount', totalAmount);

  totalAmountContainer.textContent =
    '총액: ' + Math.round(CartStore.get('totalAmount')) + '원';

  const discountRate = getDiscountRate(CartStore.get('subTotal'));

  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    totalAmountContainer.appendChild(span);
  }

  updateStockStatus();
  renderBonusPoints();
};
