import { STOCK_WARNING_LIMIT } from "../config/constants";
import { useProduct } from "../hooks/use-product";
import { STYLES } from "../lib/styles";

const StockStatus = () => {
  const { products } = useProduct();
  return (
    <div id={"stock-status"} className={STYLES.STOCK_STATUS}>
      {products
        .filter((i) => i.quantity < STOCK_WARNING_LIMIT)
        .map((item) => {
          const hasStock = item.quantity > 0;
          return `${item.name}: ${hasStock ? `재고 부족 (${item.quantity}개 남음)` : `품절`}`;
        })}
    </div>
  );
};

export default StockStatus;
