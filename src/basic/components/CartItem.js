/**
 * 장바구니 아이템 컴포넌트
 * @param {Object} product - 상품 정보 객체
 * @param {number} quantity - 상품의 수량
 */
const CartItem = (product, quantity) => {
  return `
    <div id="${product.id}" class="flex justify-between items-center mb-2">
      <span>${product.name} - ${product.price}원 x ${quantity}</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
      </div>
    </div>
  `.replace(/\n\s*/g, "");
};

export default CartItem;
