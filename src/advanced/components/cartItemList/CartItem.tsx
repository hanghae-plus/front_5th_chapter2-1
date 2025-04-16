import type React from "react";
import { STYLES, DOM_CLASSES } from "@/basic/consts";
import { formatPrice } from "@/advanced/utils/format";
import type { Product } from "@/advanced/types/product";
import { useCart, useProduct } from "@/advanced/context";
import { alertOutOfStock } from "@/advanced/utils/alert";

interface CartItemProps {
  item: Product;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { cartItems, setCartItems } = useCart();
  const { productList, setProductList } = useProduct();

  const handleQuantityChange = (change: number) => {
    const currentQuantity = item.quantity;
    const newQuantity = currentQuantity + change;
    const product = productList.find(p => p.id === item.id);

    if (!product) return;
    
    const maxAllowed = product.quantity + currentQuantity;

    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
      setProductList(productList.map(product => 
        product.id === item.id 
          ? { ...product, quantity: product.quantity + currentQuantity }
          : product
      ));
      return;
    }

    if (newQuantity > maxAllowed) {
      alertOutOfStock();
      return;
    }

    setCartItems(cartItems.map(cartItem => 
      cartItem.id === item.id 
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    ));

    setProductList(productList.map(product => 
      product.id === item.id 
        ? { ...product, quantity: product.quantity - change }
        : product
    ));
  };

  const handleRemove = () => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    setProductList(productList.map(product => 
      product.id === item.id 
        ? { ...product, quantity: product.quantity + item.quantity }
        : product
    ));
  };

  return (
    <div id={item.id} className={STYLES.LAYOUT.FLEX}>
      <span data-value={item.value} data-quantity={item.quantity}>
        {`${item.name} - ${formatPrice(item.value)} x ${item.quantity}`}
      </span>
      <div>
        <button
          type="button"
          className={`${STYLES.BUTTON.PRIMARY} ${STYLES.BUTTON.SMALL} ${DOM_CLASSES.BUTTON.QUANTITY_CHANGE}`}
          data-product-id={item.id}
          onClick={() => handleQuantityChange(-1)}
        >
          -
        </button>
        <button
          type="button"
          className={`${STYLES.BUTTON.PRIMARY} ${STYLES.BUTTON.SMALL} ${DOM_CLASSES.BUTTON.QUANTITY_CHANGE}`}
          data-product-id={item.id}
          onClick={() => handleQuantityChange(1)}
        >
          +
        </button>
        <button
          type="button"
          className={`${STYLES.BUTTON.DANGER} ${DOM_CLASSES.BUTTON.REMOVE_ITEM}`}
          data-product-id={item.id}
          onClick={handleRemove}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
