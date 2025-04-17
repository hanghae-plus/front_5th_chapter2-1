import { useState } from 'react';
import { useProductList } from '../context/product';
import { Product } from '../data/products';

export const ProductSelect = () => {
  const { productList, setProductList, lastSelectedOption } = useProductList();

  const [selectedProduct, setSelectedProduct] = useState<Product>(
    productList[0],
  );

  return (
    <>
      <select
        id="product-select"
        data-testid="product-select"
        className="border rounded p-2 mr-2"
        value={selectedProduct.id}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedProduct = productList.find(
            (product) => product.id === selectedId,
          );
          if (selectedProduct) {
            setSelectedProduct(selectedProduct);
          }
        }}
      >
        {productList.map((product) => (
          <option
            key={product.id}
            disabled={product.stockQuantity === 0}
            value={product.id}
          >
            {product.name} - {product.price}원
          </option>
        ))}
      </select>
      <button
        id="add-to-cart"
        data-testid="add-to-cart"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          const productToAdd = productList.find(
            (product) => product.id === selectedProduct.id,
          );
          if (productToAdd) {
            if (productToAdd.stockQuantity > 0) {
              setProductList((prev) =>
                prev.map((product) =>
                  product.id === productToAdd.id
                    ? {
                        ...product,
                        cartQuantity: product.cartQuantity + 1,
                        stockQuantity: product.stockQuantity - 1,
                      }
                    : product,
                ),
              );
              lastSelectedOption.current = productToAdd;
            } else {
              alert('재고가 부족합니다.');
            }
          }
        }}
      >
        추가
      </button>
    </>
  );
};
