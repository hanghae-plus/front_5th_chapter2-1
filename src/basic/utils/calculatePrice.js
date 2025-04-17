import { PRODUCT_LIST } from '../components/product/ProductList.constant.js';

export function calculatePrice(cartItems) {
  let totalAfterDiscount = 0;
  let totalQuantity = 0;
  let totalBeforeDiscount = 0;

  // 장바구니에 추가한 상품 찾기
  for (const cartItemElement of cartItems) {
    const productId = cartItemElement.id;
    const selectedProduct = PRODUCT_LIST.find(
      (product) => product.id === productId
    );
    if (!selectedProduct) continue;

    const quantity = parseInt(
      cartItemElement.querySelector('span').textContent.split('x ')[1]
    );
    const itemTotal = selectedProduct.price * quantity;

    let discount = 0;
    if (quantity >= 10) {
      discount = selectedProduct.discount || 0;
    }

    totalAfterDiscount += itemTotal * (1 - discount);
    totalQuantity += quantity;
    totalBeforeDiscount += itemTotal;
  }

  // 할인율 계산
  let discountRate = 0;

  const bulkDiscount = totalQuantity >= 30 ? totalBeforeDiscount * 0.25 : 0;
  const itemDiscount = totalBeforeDiscount - totalAfterDiscount;

  // 대량 구매 할인율 계산
  if (bulkDiscount > itemDiscount) {
    totalAfterDiscount = totalBeforeDiscount * 0.75;
    discountRate = 0.25;
  } else {
    discountRate = itemDiscount / totalBeforeDiscount;
  }

  // 화요일 할인 계산
  if (new Date().getDay() === 2) {
    totalAfterDiscount *= 0.9;
    discountRate = Math.max(discountRate, 0.1);
  }

  return {
    totalPrice: Math.round(totalAfterDiscount),
    discountRate,
    itemCount: totalQuantity,
    subTotal: totalBeforeDiscount,
  };
}
