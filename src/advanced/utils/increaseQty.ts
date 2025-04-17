import { useCartStore } from '../store/cartStore';

const { cart, setCart, products } = useCartStore(); // ← products도 가져와야 함

const increaseQty = (id: string) => {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const newCart = cart.map((item) => {
    if (item.id !== id) return item;

    if (item.qty + 1 > product.q) {
      alert(
        `⚠️ ${product.name}의 재고를 초과할 수 없습니다. (남은 재고: ${product.q})`
      );
      return item;
    }

    return { ...item, qty: item.qty + 1 };
  });

  setCart(newCart);
};

export default increaseQty;
