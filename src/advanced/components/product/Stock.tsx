import { useCartStore } from "../../hooks/useCart";

export const Stock = () => {
  const { productList } = useCartStore();

  const defaultStock = productList
    .filter((item) => item.stock <= 5)
    .map(
      (item) =>
        `${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : "품절"}`,
    )
    .join("\n");

  const stockStatusMsg = `${defaultStock}\n`;

  return (
    <div id="stock-status" className="mt-2 text-sm text-gray-500">
      {stockStatusMsg}
    </div>
  );
};
