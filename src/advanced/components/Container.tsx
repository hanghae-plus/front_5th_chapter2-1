import { STYLES } from "../lib/styles";
import AddToCart from "./AddToCart";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";
import ProductSelect from "./ProductSelect";
import StockStatus from "./StockStatus";

export const Container = () => {
  return (
    <div className={STYLES.CONTAINER}>
      <div className={STYLES.WRAPPER}>
        <h1 className={STYLES.TITLE}>{"장바구니"}</h1>
        <CartItems />
        <CartTotal />
        <ProductSelect />
        <AddToCart />
        <StockStatus />
      </div>
    </div>
  );
};
