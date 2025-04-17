import { PRODUCT_INVENTORY } from "@advanced/lib/configs/product";
import { useAvailableStock } from "@advanced/lib/hooks/cart/useAvailableStock";
import { useProductSelector } from "@advanced/lib/hooks/cart/useProductSelector";
import type { Product } from "@advanced/lib/types";

export function ProductSelector() {
  const { selectedProduct, handleProductSelect, handleAddToCart } = useProductSelector();
  const { inventoryWithAvailableStock } = useAvailableStock();

  return (
    <div>
      <select
        id="product-select"
        className="border rounded p-2 mr-2"
        value={selectedProduct.id}
        onChange={(e) =>
          handleProductSelect(
            PRODUCT_INVENTORY.find((product) => product.id === e.target.value) ?? PRODUCT_INVENTORY[0],
          )
        }
      >
        {inventoryWithAvailableStock.map((product) => {
          return <ProductSelector.Item key={product.id} {...product} />;
        })}
      </select>
      <button
        id="add-to-cart"
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddToCart}
      >
        추가
      </button>
    </div>
  );
}

ProductSelector.Item = ({ id, name, price, availableStock }: Product & { availableStock: number }) => {
  return (
    <option value={id} disabled={availableStock === 0}>
      {name} - {price}원
    </option>
  );
};
