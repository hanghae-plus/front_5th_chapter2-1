import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductsContext';
import type { Product } from '../types/product';
import type { Item } from '../context/CartContext';

export default function CartItems() {
  const { products, updateProduct } = useProducts();
  const { items, increaseCartItem, decreaseCartItem, deleteFromCart } =
    useCart();

  // 장바구니 내 상품 수량이나 상품의 재고 수량을 수정합니다.
  const changeProductQuantityInCart = (
    change: number,
    item: Item,
    product: Product,
  ) => {
    const productId = product.id;
    const newQuantity = item?.quantity + change;

    // 변경될 수량이 0과 같거나 작다면 장바구니에서 해당 상품을 제거하고 재고를 업데이트합니다.
    if (newQuantity <= 0) {
      deleteFromCart(product.id);
      updateProduct(product.id, {
        quantity: product.quantity - change,
      });
    } else if (change <= product.quantity) {
      // 상품 재고가 충분하다면 장바구니 속 상품 수량을 변경합니다.
      if (change === 1) {
        increaseCartItem({
          id: productId,
          name: product.name,
          price: product.price,
        });
      } else {
        decreaseCartItem(productId);
      }
      // 상품의 재고 수량을 변경합니다.
      updateProduct(productId, { quantity: product.quantity - change });
    } else {
      // 재고가 부족하다면 알림창을 표시합니다.
      alert('재고가 부족합니다.');
    }
  };

  // 장바구니 내 상품 영역을 클릭했을 때 실행되는 핸들러 함수입니다.
  const handleClick = (event: any) => {
    const target = event.target;

    if (
      target.classList.contains('quantity-change') ||
      target.classList.contains('remove-item')
    ) {
      const productId = target.dataset.productId;
      const product = products.find((product) => product.id === productId);
      const item = items.find((item) => item.id === productId);

      if (!item || !product) {
        alert('상품이 잘못 선택 되었습니다.');
        return;
      }
      // 상품 수량 변경 버튼을 클릭했을 때 장바구니 속 상품 수량과 상품 재고 수량을 변경합니다.
      if (target.classList.contains('quantity-change')) {
        const changeQuantity = parseInt(target.dataset.change);
        changeProductQuantityInCart(changeQuantity, item, product);
      } else if (target.classList.contains('remove-item')) {
        // 상품 제거 버튼을 클릭했을 때 장바구니에서 상품을 제거하고 재고 수량을 변경합니다.
        const itemElement = document.getElementById(productId);
        itemElement?.remove();
        deleteFromCart(productId);
        updateProduct(productId, {
          quantity: product.quantity + item.quantity,
        });
      }
    }
  };

  return (
    <div id='cart-items' onClick={handleClick}>
      {items.map(({ id, name, price, quantity }) => (
        <div id={id} className='flex justify-between items-center mb-2'>
          <span>
            ${name} - ${price}원 x ${quantity}
          </span>
          <div>
            <button
              className='quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1'
              data-product-id={id}
              data-change='-1'
            >
              -
            </button>
            <button
              className='quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1'
              data-product-id={id}
              data-change='1'
            >
              +
            </button>
            <button
              className='remove-item bg-red-500 text-white px-2 py-1 rounded'
              data-product-id={id}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
