//components
import Title from './components/Title';
import Cart from './components/Cart';
import CartTotal from './components/CartTotal';
import ItemSelect from './components/ItemSelect';
import AddCartButton from './components/AddCartButton';
import Stock from './components/Stock';

//constants

import usePromotion from './hooks/usePromotion';
import useSelect from './hooks/useSelect';

const App = () => {
  usePromotion();
  const { selectedItemId, handleItemSelect } = useSelect();

  return (
    <>
      <div className="bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <Title />
          <Cart />
          <CartTotal />
          <ItemSelect selectedItemId={selectedItemId} onSelectItem={handleItemSelect} />
          <AddCartButton />
          <Stock />
        </div>
      </div>
    </>
  );
};

export default App;
