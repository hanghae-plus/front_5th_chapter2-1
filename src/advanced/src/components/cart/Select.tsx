import { Product } from "../../constants";

export const Select = ({
  products,
  setSelectedProduct,
}: {
  products: Product[];
  setSelectedProduct: React.Dispatch<React.SetStateAction<{ id: string }>>;
}) => {
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    setSelectedProduct({ id: productId });
  };

  return (
    <select
      id="product-select"
      className="border rounded p-2 mr-2"
      onChange={onChangeSelect}
    >
      {products.map((product) => (
        <option
          key={`select-options-${product.id}`}
          value={product.id}
          disabled={product.quantity === 0}
        >
          {product.name} - {product.val}원
        </option>
      ))}
    </select>
  );
};
