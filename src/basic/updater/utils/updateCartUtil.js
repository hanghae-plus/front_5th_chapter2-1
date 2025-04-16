import $cart from '../../components/Cart';
import $cartTotal from '../../components/CartTotal';
import ITEMS from '../../constants/items';

const DISCOUNT_RATES = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};
const BIG_DISCOUNT_COUNT = 30;
const BIG_DISCOUNT_RATE = 0.25;

//Section1: 할인율 계산

const calculateCartItems = (totalPrice) => {
  let cartItems = $cart.children;
  let itemCount = 0;
  let subTotalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const currentItem = ITEMS.find((item) => item.id === cartItem.id);

    if (!currentItem) continue;

    const stock = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
    const itemTotalPrice = currentItem.price * stock;

    itemCount += stock;
    subTotalPrice += itemTotalPrice;

    let discount = 0;
    if (stock >= 10) {
      discount = DISCOUNT_RATES[currentItem.id] || 0;
    }

    totalPrice.set(totalPrice.get() + itemTotalPrice * (1 - discount));
  }

  return { itemCount, subTotalPrice };
};

const isBigDiscount = (itemCount) => {
  return itemCount >= BIG_DISCOUNT_COUNT;
};

const getBigDiscountRate = (totalPrice, subTotalPrice, discountRate) => {
  let bigDiscount = totalPrice.get() * BIG_DISCOUNT_RATE;
  let itemDiscount = subTotalPrice - totalPrice.get();

  if (bigDiscount > itemDiscount) {
    totalPrice.set(subTotalPrice * (1 - BIG_DISCOUNT_RATE));
    discountRate = BIG_DISCOUNT_RATE;
  }

  return discountRate;
};

const getDefaultDiscountRate = (subTotalPrice, totalPrice) => {
  const discountRate = (subTotalPrice - totalPrice.get()) / subTotalPrice;
  return discountRate;
};

const isTuesDay = () => {
  return new Date().getDay() === 2;
};

const getTuseDayDiscount = (totalPrice, discountRate) => {
  totalPrice.set(totalPrice.get() * (1 - 0.1));
  discountRate = Math.max(discountRate, 0.1);
  return discountRate;
};

//할인율을 계산합니다.
const calculateDiscountRate = (totalPrice) => {
  const { itemCount, subTotalPrice } = calculateCartItems(totalPrice);

  let discountRate = 0;

  // 대량 구매 또는 기본 할인율 계산
  discountRate = isBigDiscount(itemCount)
    ? getBigDiscountRate(totalPrice, subTotalPrice, discountRate)
    : getDefaultDiscountRate(subTotalPrice, totalPrice);

  // 화요일 할인 적용
  if (isTuesDay()) {
    discountRate = getTuseDayDiscount(totalPrice, discountRate);
  }

  return discountRate;
};

//Section2: 장바구니 업데이트

const updateCartTotalPrice = (totalPrice) => {
  $cartTotal.textContent = '총액: ' + Math.round(totalPrice.get()) + '원';
};

const updateCartTotalPoint = (discountRate) => {
  let span = document.createElement('span');
  span.className = 'text-green-500 ml-2';
  span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
  $cartTotal.appendChild(span);
};

//장바구니 UI를 업데이트합니다.
const updateCartUI = (totalPrice, discountRate) => {
  updateCartTotalPrice(totalPrice);

  if (discountRate > 0) {
    updateCartTotalPoint(discountRate);
  }
};

export { calculateDiscountRate, updateCartUI };
