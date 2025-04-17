import { useAtom } from "jotai";
import { cartAtom } from "../../state";
import { calculateDiscountRate, calculateTotalPrice, updateCartList, updateProductList } from "../../utils";

export const useAddToCart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const handleAddToCart = (selectedProductId: string) => {
    const selectedProduct = cart.productList.find((product) => product.id === selectedProductId);

    if (!selectedProduct) {
      alert("상품을 찾을 수 없습니다.");
      return;
    }

    // 재고가 없으면 중단
    if (selectedProduct.count <= 0) {
      alert("재고가 부족합니다.");
      return;
    }

    const updatedProduct = {
      ...selectedProduct,
      count: selectedProduct.count - 1,
    };
    const updatedProductList = updateProductList(cart.productList, selectedProductId, -1);

    const updatedCartList = updateCartList(cart.cartList, updatedProduct, 1);

    const newTotalPrice = calculateTotalPrice(updatedCartList);
    const { finalDiscountRate, finalDiscountPrice } = calculateDiscountRate(newTotalPrice, updatedCartList);

    setCart({
      ...cart,
      productList: updatedProductList,
      cartList: updatedCartList,
      totalPrice: finalDiscountPrice,
      lastSelectedProduct: updatedProduct,
      totalDiscountRate: finalDiscountRate,
    });
  };

  return { handleAddToCart };
};
