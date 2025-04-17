import Title from './components/Title';
import Cart from './components/Cart';
import CartTotal from './components/CartTotal';
import ItemSelect from './components/ItemSelect';
import AddCartButton from './components/AddCartButton';
import Stock from './components/Stock';
import { useState } from 'react';

import usePromotion from './hooks/usePromotion';
import ITEMS from './constants/items';

const App = () => {
  usePromotion();

  const [selectedItemId, setSelectedItemId] = useState('p1');

  const handleItemSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItemId(event.target.value);
  };

  return (
    <>
      <div className="bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <Title />
          <Cart />
          <CartTotal />
          <ItemSelect
            items={ITEMS}
            selectedItemId={selectedItemId}
            onSelectItem={handleItemSelect}
          />
          <AddCartButton />
          <Stock />
        </div>
      </div>
    </>
  );
};

export default App;
