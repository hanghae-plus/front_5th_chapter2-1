import {
  calculateProductDiscount,
  calculateCartDiscount,
  calculateTuesdayDiscount,
} from './calculateDiscount.js';

const calculateCartTotal = (cartList, products) => {
  let totalPrice = 0;
  let totalProductCount = 0;
  let totalPriceBeforeDiscount = 0;

  const cartItems = cartList.children;
  for (let i = 0; i < cartItems.length; i++) {
    const currentProduct = products.find((p) => p.id === cartItems[i].id);
    const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
    totalProductCount += quantity;

    const productTotalPrice = currentProduct.price * quantity;
    totalPriceBeforeDiscount += productTotalPrice;

    totalPrice += calculateProductDiscount(currentProduct, quantity);
  }

  let totalCartDiscountRate = calculateCartDiscount(
    totalPrice,
    totalPriceBeforeDiscount,
    totalProductCount,
  );

  const tuesdayDiscount = calculateTuesdayDiscount(totalPrice, totalCartDiscountRate);
  totalPrice = tuesdayDiscount.price;
  totalCartDiscountRate = tuesdayDiscount.discountRate;

  const bonusPoints = Math.floor(totalPrice / 1000);

  return {
    totalPrice,
    discountRate: totalCartDiscountRate,
    bonusPoints,
  };
};

const renderStockStatusMessage = (products, stockStatus) => {
  let stockStatusMessage = '';

  products.forEach(({ name, quantity }) => {
    if (quantity < 5) {
      stockStatusMessage += `${name}: ${quantity > 0 ? `재고 부족 (${quantity}개 남음)` : '품절'}\n`;
    }
  });

  stockStatus.textContent = stockStatusMessage;
};

const getOrCreateRewardPointsElement = (cartTotalPrice) => {
  let $rewardPoints = document.getElementById('loyalty-points');

  if (!$rewardPoints) {
    $rewardPoints = document.createElement('span');
    $rewardPoints.id = 'loyalty-points';
    $rewardPoints.className = 'text-blue-500 ml-2';
    cartTotalPrice.appendChild($rewardPoints);
  }

  return $rewardPoints;
};

const renderCartTotal = (cartTotalPrice, totalPrice, discountRate, bonusPoints) => {
  cartTotalPrice.textContent = `총액: ${Math.round(totalPrice)}원`;

  if (discountRate > 0) {
    const $discountBadge = document.createElement('span');
    $discountBadge.className = 'text-green-500 ml-2';
    $discountBadge.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalPrice.appendChild($discountBadge);
  }

  const $rewardPoints = getOrCreateRewardPointsElement(cartTotalPrice);
  $rewardPoints.textContent = `(포인트: ${bonusPoints})`;
};

const updateCartTotal = (cartList, products, cartTotalPrice, stockStatus) => {
  const { totalPrice, discountRate, bonusPoints } = calculateCartTotal(cartList, products);

  renderCartTotal(cartTotalPrice, totalPrice, discountRate, bonusPoints);
  renderStockStatusMessage(products, stockStatus);
};

export default updateCartTotal;
