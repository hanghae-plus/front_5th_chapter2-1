import { useState } from 'react';
import { CartListType } from '../App';
import { ProductListType } from '../hooks/useProductManagement';

interface CartOptionsProps {
  productList: ProductListType[];
  setCartList: React.Dispatch<React.SetStateAction<CartListType[]>>;
  hasEnoughStock: (productId: string, quantity?: number) => boolean | undefined;
  decreaseStock: (productId: string, quantity?: number) => void;
}

const CartOptions = ({ ...props }: CartOptionsProps) => {
  const { setCartList, productList, hasEnoughStock, decreaseStock } = props;

  const [selectedOpt, setSelectedOpt] = useState<ProductListType>(productList[0]);

  // 상품 선택
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedProduct = productList.find((product) => product.id === selectedValue);
    if (selectedProduct) {
      setSelectedOpt(selectedProduct);
    }
  };

  // 장바구니 추가
  const handleAddCart = () => {
    if (!hasEnoughStock(selectedOpt.id)) {
      alert('재고가 없습니다.');
      return;
    }

    // 장바구니에 추가
    setCartList((prev) => {
      const existing = prev.find((item) => item.id === selectedOpt.id);

      // 이미 담긴 경우
      if (existing) {
        // 추가 재고 확인
        if (!hasEnoughStock(selectedOpt.id, 1)) {
          alert('재고가 부족합니다.');
          return prev;
        }

        return prev.map((item) =>
          item.id === selectedOpt.id
            ? ({ ...item, quantity: item.quantity + 1 } as CartListType)
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: selectedOpt.id,
            name: selectedOpt.name,
            price: selectedOpt.price,
            quantity: 1,
          } as CartListType,
        ];
      }
    });

    // 재고 감소
    decreaseStock(selectedOpt.id);
  };

  return (
    <>
      <select
        id="product-select"
        className="border rounded p-2 mr-2"
        onChange={handleSelect}
        value={selectedOpt.id}
      >
        {productList.map((product) => (
          <option value={product.id} key={product.id} disabled={!hasEnoughStock(product.id)}>
            {product.name} - {product.price}원
          </option>
        ))}
      </select>

      <button
        type="button"
        id="add-to-cart"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        aria-label="장바구니에 추가"
        aria-pressed="true"
        onClick={handleAddCart}
      >
        추가
      </button>
    </>
  );
};

export default CartOptions;
