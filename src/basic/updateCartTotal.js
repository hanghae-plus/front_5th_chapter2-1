const DISCOUNT_POLICIES = {
  PRODUCT: {
    RATES: {
      p1: 0.1,
      p2: 0.15,
      p3: 0.2,
      p4: 0.05,
      p5: 0.25,
    },
    MIN_QUANTITY: 10,
  },
  CART: {
    BULK_THRESHOLD: 30,
    BULK_RATE: 0.25,
  },
  TUESDAY: {
    RATE: 0.1,
  },
};

const calculateProductDiscount = (product, quantity) => {
  const discountRate =
    quantity >= DISCOUNT_POLICIES.PRODUCT.MIN_QUANTITY
      ? DISCOUNT_POLICIES.PRODUCT.RATES[product.id] || 0
      : 0;

  return product.price * quantity * (1 - discountRate);
};

const calculateCartDiscount = (totalPrice, totalPriceBeforeDiscount, totalProductCount) => {
  if (totalProductCount < DISCOUNT_POLICIES.CART.BULK_THRESHOLD) {
    return (totalPriceBeforeDiscount - totalPrice) / totalPriceBeforeDiscount;
  }

  const bulkDiscount = totalPrice * DISCOUNT_POLICIES.CART.BULK_RATE;
  const itemDiscount = totalPriceBeforeDiscount - totalPrice;

  if (bulkDiscount > itemDiscount) {
    totalPrice = totalPriceBeforeDiscount * (1 - DISCOUNT_POLICIES.CART.BULK_RATE);

    return DISCOUNT_POLICIES.CART.BULK_RATE;
  }

  return (totalPriceBeforeDiscount - totalPrice) / totalPriceBeforeDiscount;
};

const calculateTuesdayDiscount = (price, currentDiscountRate) => {
  if (new Date().getDay() === 2) {
    return {
      price: price * (1 - DISCOUNT_POLICIES.TUESDAY.RATE),
      discountRate: Math.max(currentDiscountRate, DISCOUNT_POLICIES.TUESDAY.RATE),
    };
  }

  return { price, discountRate: currentDiscountRate };
};

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

  const bonusPts = Math.floor(totalPrice / 1000);

  return {
    totalPrice,
    discountRate: totalCartDiscountRate,
    bonusPts,
  };
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

const renderCartTotal = (cartTotalPrice, totalPrice, discountRate, bonusPts) => {
  cartTotalPrice.textContent = `총액: ${Math.round(totalPrice)}원`;

  if (discountRate > 0) {
    const discountBadge = document.createElement('span');
    discountBadge.className = 'text-green-500 ml-2';
    discountBadge.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalPrice.appendChild(discountBadge);
  }

  let ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    cartTotalPrice.appendChild(ptsTag);
  }

  ptsTag.textContent = `(포인트: ${bonusPts})`;
};

const updateCartTotal = (cartList, products, cartTotalPrice, stockStatus) => {
  const { totalPrice, discountRate, bonusPts } = calculateCartTotal(cartList, products);

  renderCartTotal(cartTotalPrice, totalPrice, discountRate, bonusPts);
  updateStockInfo(products, stockStatus);
};

export default updateCartTotal;
