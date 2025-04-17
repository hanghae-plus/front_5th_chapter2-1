import { useCart, useProducts } from '../../context';

const Select: React.FC = () => {
  const { products, getProductById, updateQuantity } = useProducts();
  const { addToCart, setLastSelectedProductId } = useCart();

  const getStockInfoMessage = () => {
    let infoMsg = '';

    products.forEach(({ name, quantity }) => {
      const isSoldOut = quantity === 0;
      const isLowStock = quantity > 0 && quantity < 5;

      if (isSoldOut) {
        infoMsg += `${name}: 품절 `;
      }

      if (isLowStock) {
        infoMsg += `${name}: 재고 부족 (${quantity}개 남음) `;
      }
    });

    return infoMsg;
  };

  const handleAddToCart = () => {
    const selectElement = document.getElementById('product-select') as HTMLSelectElement;
    if (!selectElement) return;

    const selectedProductId = selectElement.value;
    const selectedProduct = getProductById(selectedProductId);

    if (!(selectedProduct && selectedProduct.quantity > 0)) {
      alert('재고가 부족합니다.');
      return;
    }

    addToCart(selectedProductId, 1);

    updateQuantity(selectedProductId, -1);

    setLastSelectedProductId(selectedProductId);
  };

  return (
    <>
      <select id="product-select" className="border rounded p-2 mr-2" defaultValue="">
        <option value="" disabled>
          상품을 선택하세요
        </option>

        {products.map((product) => (
          <option key={product.id} value={product.id} disabled={product.quantity === 0}>
            {product.name} - {product.price}원
          </option>
        ))}
      </select>

      <button id="add-to-cart" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddToCart}>
        추가
      </button>

      <div id="stock-status" className="text-sm text-gray-500 mt-2">
        {getStockInfoMessage()}
      </div>
    </>
  );
};

export default Select;
