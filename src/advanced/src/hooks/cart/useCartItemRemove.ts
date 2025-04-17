import { useAtom } from "jotai";
import { cartAtom } from "../../state";
import { calculateDiscountRate, calculateTotalPrice, updateProductList } from "../../utils";

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

    // 상품 정보를 productList에서 찾음.
    const product = cart.productList.find((item) => item.id === productId);
    if (!product)
      return {
        updatedProductList: cart.productList,
        updatedCartList: cart.cartList,
        newTotalPrice: cart.totalPrice,
      };

    // cartList에서 해당 상품을 필터링하여 제거.
    const updatedCartList = cart.cartList.filter((item) => item.id !== productId);

    const newTotalPrice = calculateTotalPrice(updatedCartList);

    // 제거된 상품의 count만큼 상품의 재고를 증가.
    const updatedProductList = updateProductList(cart.productList, productId, removedCartItem.count);

    const { finalDiscountRate, finalDiscountPrice } = calculateDiscountRate(newTotalPrice, updatedCartList);

    setCart({
      ...cart,
      productList: updatedProductList,
      cartList: updatedCartList,
      totalPrice: finalDiscountPrice,
      totalDiscountRate: finalDiscountRate,
    });
  };

  return { handleCartItemRemove };
};
