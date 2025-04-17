import { useCallback } from "react";
import { useCart, useProduct } from "@/advanced/context";
import { getCartCalculation } from "@/advanced/logic";

interface UseAddCartItemReturn {
  handleAddButtonClick: () => void;
}

export const useAddCartItem = (): UseAddCartItemReturn => {
  const { cartItems, setCartItems, setCart } = useCart();
  const { selectedProductId, productList, setProductList } = useProduct();

  const handleAddButtonClick = useCallback(() => {
    if (!selectedProductId) return;

    const itemToAdd = productList.find((product) => product.id === selectedProductId);

    if (!itemToAdd) return;

    const existingItemIndex = cartItems.findIndex((item) => item.id === itemToAdd.id);

    if (existingItemIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
      getCartCalculation(newCartItems, setCart);
    } else {
      setCartItems([...cartItems, { ...itemToAdd, quantity: 1 }]);
      getCartCalculation([...cartItems, { ...itemToAdd, quantity: 1 }], setCart);
    }

    setProductList(
      productList.map((product) =>
        product.id === itemToAdd.id ? { ...product, quantity: product.quantity - 1 } : product,
      ),
    );
  }, [cartItems, selectedProductId, productList, setCartItems, setCart, setProductList]);

  return { handleAddButtonClick };
};
