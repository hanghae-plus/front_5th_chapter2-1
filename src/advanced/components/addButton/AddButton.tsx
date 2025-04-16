import type React from "react";
import { STYLES } from "@/basic/consts/styles";
import { DOM_IDS } from "@/basic/consts/dom";
import { useCart, useProduct } from "@/advanced/context";
export const AddButton: React.FC = () => {

  const { cartItems, setCartItems } = useCart();
  const { selectedProductId, productList } = useProduct();

  const handleClick = () => {
    if (!selectedProductId) return;

    const itemToAdd = productList.find(
      (product) => product.id === selectedProductId
    );

    if (!itemToAdd) return;

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === itemToAdd.id
    );

    if (existingItemIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...itemToAdd, quantity: 1 }]);
    }
  };

  return (
    <button 
      type="button"
      id={DOM_IDS.PRODUCT.ADD_BUTTON} 
      className={STYLES.BUTTON.PRIMARY}
      onClick={handleClick}
    >
      추가
    </button>
  );
};
