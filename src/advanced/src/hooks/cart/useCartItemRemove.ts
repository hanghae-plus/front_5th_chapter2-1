import { useAtom } from "jotai";
import { cartAtom } from "../../state";

export const useCartItemRemove = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const handleCartItemRemove = (productId: string) => {
    const removedCartItem = cart.cartList.find((item) => item.id === productId);
    if (!removedCartItem)
      return {
        updatedProductList: cart.productList,
        updatedCartList: cart.cartList,
        newTotalPrice: cart.totalPrice,
      };

    // 상품 정보를 productList에서 찾습니다.
    const product = cart.productList.find((item) => item.id === productId);
    if (!product)
      return {
        updatedProductList: cart.productList,
        updatedCartList: cart.cartList,
        newTotalPrice: cart.totalPrice,
      };

    // cartList에서 해당 상품을 필터링하여 제거합니다.
    const updatedCartList = cart.cartList.filter((item) => item.id !== productId);

    const newTotalPrice = updatedCartList.reduce((acc: number, item) => acc + item.price * (item.count || 1), 0);

    // 제거된 상품의 count만큼 상품의 재고를 증가시킵니다.
    const updatedProductList = cart.productList.map((item) =>
      item.id === productId ? { ...item, count: item.count + removedCartItem.count } : item,
    );

    setCart({
      ...cart,
      productList: updatedProductList,
      cartList: updatedCartList,
      totalPrice: newTotalPrice,
    });
  };

  return { handleCartItemRemove };
};
