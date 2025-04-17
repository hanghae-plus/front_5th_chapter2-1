import { useState } from 'react';

//components
import Title from './components/Title';

import usePromotion from './hooks/usePromotion';
import useSelect from './hooks/useSelect';

import ITEMS from './constants/items';
import { Item } from './types/items';

const App = () => {
  usePromotion();

  const { selectedItemId, handleItemSelect, selectedItem } = useSelect();

  const [cartCount] = useState(1);

  const isSelectedItem = (p: Item, selectedItemId: string) => {
    return p.id === selectedItemId;
  };

  const getSelectedItem = (selectedItemId: string) => {
    return ITEMS.find((id) => isSelectedItem(id, selectedItemId));
  };

  const isItemAvailable = (selecedItem: Item) => {
    return selecedItem && selecedItem.stock > 0;
  };

  const handleAddToCart = () => {
    // setIsClickAddButton(!isClickAddButton);

    let selectedItem = getSelectedItem(selectedItemId);
    console.log('id는', selectedItemId);
    if (!selectedItem) return;
    if (!isItemAvailable(selectedItem)) return;
  };

  return (
    <>
      <div className="bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <Title />
          {/* <Cart /> */}
          <div id="cart-items">
            {selectedItem && (
              <div id={selectedItem.id} className="flex justify-between items-center mb-2">
                <span>
                  {selectedItem.name} - {selectedItem.price}원 x {cartCount}
                </span>
                <div>
                  <button
                    className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                    data-product-id={selectedItem.id}
                    data-change="-1"
                  >
                    -
                  </button>
                  <button
                    className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
                    data-product-id={selectedItem.id}
                    data-change="1"
                  >
                    +
                  </button>
                  <button
                    className="remove-item bg-red-500 text-white px-2 py-1 rounded"
                    data-product-id={selectedItem.id}
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* <CartTotal /> */}
          <div id="cart-total" className="text-xl font-bold my-4"></div>

          {/* <ItemSelect selectedItemId={selectedItemId} onSelectItem={handleItemSelect} /> */}
          <select
            id="product-select"
            className="border rounded p-2 mr-2"
            value={selectedItemId || ''}
            onChange={handleItemSelect}
          >
            <option value="" disabled>
              상품을 선택하세요
            </option>
            {ITEMS.map((item: Item) => (
              <option key={item.id} value={item.id} disabled={item.stock === 0}>
                {item.name} - {item.price}원
              </option>
            ))}
          </select>

          {/* <AddCartButton selectedItemId={selectedItemId} /> */}
          <button
            id="add-to-cart"
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            추가
          </button>
          {/* <Stock /> */}
          <div id="stock-status" className="text-sm text-gray-500 mt-2"></div>
        </div>
      </div>
    </>
  );
};

export default App;
