import { useAvailableStock } from "@advanced/lib/hooks/cart/useAvailableStock";

export function OutOfStockIndicator() {
  const { inventoryWithAvailableStock } = useAvailableStock();

  return (
    <div id="stock-status" className="text-sm text-gray-500">
      {inventoryWithAvailableStock.map(({ name, availableStock }) => (
        <OutOfStockIndicator.Info key={name} name={name} availableStock={availableStock} />
      ))}
    </div>
  );
}

OutOfStockIndicator.Info = ({ name, availableStock }: { name: string; availableStock: number }) => {
  if (availableStock >= 5) return "";

  if (availableStock > 0) return `${name}: 재고 부족 (${availableStock}개 남음)\n`;

  return `${name}: 품절\n`;
};
