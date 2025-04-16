import { useAtom } from "jotai";
import { cartAtom } from "../../state";

export const useQuantityChange = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const handleQuantityChange = (productId: string, change: number) => {
    const cartList = cart.cartList;
    const product = cart.productList.find((product) => product.id === productId);

    if (!product) {
      alert("상품을 찾을 수 없습니다.");
      return;
    }

    if (product.count - change < 0) {
      alert("재고가 부족합니다. ");
      return;
    }
    const updatedProduct = { ...product, count: product.count - change };
    const updatedProductList = cart.productList.map((item) => (item.id === productId ? updatedProduct : item));

    const updatedCartList = cartList
      .map((item) => (item.id === productId ? { ...item, count: item.count + change } : item))
      .filter((item) => item.count > 0);

    const newTotalPrice = updatedCartList.reduce((acc: number, item) => acc + item.price * (item.count || 1), 0);

    setCart({
      ...cart,
      productList: updatedProductList,
      cartList: updatedCartList,
      totalPrice: newTotalPrice,
    });
  };

  return { handleQuantityChange };
};
