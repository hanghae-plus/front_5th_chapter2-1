import { useAtom } from "jotai";
import { cartAtom } from "../../state";

export const SoldOutList = () => {
  const [cart] = useAtom(cartAtom);
  return (
    <div className="text-sm text-gray-500 mt-2">
      {cart.productList
        ?.filter((item) => item.count < 5)
        .map((item) => (item.count === 0 ? `${item.name}: 품절` : `${item.name} 재고 부족 (${item.count}개 남음)`))}
    </div>
  );
};
