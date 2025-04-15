let totalPrice = 0;
let totalProductCount = 0;
let bonusPts = 0;

const calculateProductDiscount = (product, quantity) => {
  const productDiscountRates = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  };

  const discountRate = quantity >= 10 ? productDiscountRates[product.id] || 0 : 0;

  return product.price * quantity * (1 - discountRate);
};

const calculateCartDiscount = (totalPrice, totalPriceBeforeDiscount, totalProductCount) => {
  if (totalProductCount < 30) {
    return (totalPriceBeforeDiscount - totalPrice) / totalPriceBeforeDiscount;
  }

  const bulkDiscount = totalPrice * 0.25;
  const itemDiscount = totalPriceBeforeDiscount - totalPrice;

  if (bulkDiscount > itemDiscount) {
    totalPrice = totalPriceBeforeDiscount * (1 - 0.25);

    return 0.25;
  }

  return (totalPriceBeforeDiscount - totalPrice) / totalPriceBeforeDiscount;
};

const calculateTuesdayDiscount = (price, currentDiscountRate) => {
  if (new Date().getDay() === 2) {
    return {
      price: price * (1 - 0.1),
      discountRate: Math.max(currentDiscountRate, 0.1),
    };
  }

  return { price, discountRate: currentDiscountRate };
};

const updateCartTotal = (cartList, products, cartTotalPrice, stockStatus) => {
  totalPrice = 0;
  totalProductCount = 0;
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

  cartTotalPrice.textContent = `총액: ${Math.round(totalPrice)}원`;

  if (totalCartDiscountRate > 0) {
    const discountBadge = document.createElement('span');
    discountBadge.className = 'text-green-500 ml-2';
    discountBadge.textContent = `(${(totalCartDiscountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalPrice.appendChild(discountBadge);
  }

  updateStockInfo(products, stockStatus);
  renderBonusPts(cartTotalPrice);
};

const updateStockInfo = (products, stockStatus) => {
  let infoMsg = '';

  products.forEach(({ name, quantity }) => {
    if (quantity < 5) {
      infoMsg += `${name}: ${quantity > 0 ? `재고 부족 (${quantity}개 남음)` : '품절'}\n`;
    }
  });

  stockStatus.textContent = infoMsg;
};

const renderBonusPts = (cartTotalPrice) => {
  bonusPts = Math.floor(totalPrice / 1000);

  let ptsTag = document.getElementById('loyalty-points');

  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    cartTotalPrice.appendChild(ptsTag);
  }

  ptsTag.textContent = `(포인트: ${bonusPts})`;
};

export default updateCartTotal;
