import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { useProductContext } from '../context/ProductContext';
import { isOutOfStock, isShortageOfStock } from '../utils';
import { ALERTS } from '../constants';

const Products = () => {
  const { getCartItemById, addToCart, changeCartItemQuantity } = useCartContext();
  const { products, getProductById, decreaseStock, setLastSelectedProductId } = useProductContext();

  const [selected, setSelected] = useState<string>(products[0].id);

  const handleClickAdd = () => {
    const selectedProduct = getProductById(selected);
    if (!selectedProduct) return;

    if (isOutOfStock(selectedProduct.stock)) {
      alert(ALERTS.OUT_OF_STOCK);
      return;
    }

    const existingCartItem = getCartItemById(selectedProduct.id);

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + 1;
      if (selectedProduct.stock < newQuantity) {
        alert(ALERTS.OUT_OF_STOCK);
        return;
      }
      changeCartItemQuantity(selectedProduct.id, newQuantity);
    } else {
      addToCart({ ...selectedProduct, quantity: 1 });
    }

    decreaseStock(selectedProduct.id);
    setLastSelectedProductId(selectedProduct.id);
  };

  return (
    <>
      <select className="border rounded p-2 mr-2" value={selected} onChange={(e) => setSelected(e.target.value)}>
        {products.map((product) => (
          <option key={product.id} value={product.id} disabled={isOutOfStock(product.stock)}>
            {product.name} - {product.price}원
          </option>
        ))}
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClickAdd}>
        추가
      </button>
      <div className="text-sm text-gray-500 mt-2">
        {products
          .filter((product) => isShortageOfStock(product.stock))
          .map((product) => (
            <>
              {product.name}: {isOutOfStock(product.stock) ? '품절' : `재고 부족 (${product.stock}개 남음)`}
              <br />
            </>
          ))}
      </div>
    </>
  );
};

export default Products;
