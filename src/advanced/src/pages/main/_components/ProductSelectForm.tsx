import { useState } from "react";

import type { IProduct } from "#advanced/pages/main/_types";
import { PRODUCTS } from "#advanced/pages/main/_constants";

interface IProps {
  handleAddProduct: (product: IProduct) => void;
}

const ProductSelectForm: React.FC<IProps> = ({ handleAddProduct }) => {
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const formData = new FormData(e.target);
    const productId = Number(formData.get("product-select"));
    if (isNaN(productId)) return;

    const selectedProduct = products.find((product) => product.id === productId);
    if (!selectedProduct) return;

    handleAddProduct(selectedProduct);
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        return { ...product, stock: product.stock - 1 };
      }),
    );
  };

  return (
    <form className="flex justify-between" onSubmit={handleSubmit}>
      <select name="product-select" className="rounded border-2 px-1 py-2 focus:outline-none">
        {products.map((product) => (
          <option key={product.id} value={product.id} disabled={product.stock === 0}>
            ({product.stock}개) {product.name} - {product.price.toLocaleString()}원
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="cursor-pointer rounded bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none active:bg-indigo-700 active:ring-2 active:ring-indigo-500 active:ring-offset-2"
      >
        추가
      </button>
    </form>
  );
};

export default ProductSelectForm;
