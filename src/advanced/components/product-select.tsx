import { useState } from 'react';
import { useProductList } from '../context/product';

export const ProductSelect = () => {
  const { productList, setProductList, setLastAddedProductId } =
    useProductList();

  const [selectedProductId, setSelectedProductId] = useState(productList[0].id);

  return (
    <>
      <select
        id="product-select"
        data-testid="product-select"
        className="border rounded p-2 mr-2"
        value={selectedProductId}
        onChange={(e) => {
          const selectedId = e.target.value;
          setSelectedProductId(selectedId);
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
            (product) => product.id === selectedProductId,
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
              setLastAddedProductId(productToAdd.id);
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
