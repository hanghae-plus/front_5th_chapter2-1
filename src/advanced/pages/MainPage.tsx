import Cart from '../components/Cart';
import Products from '../components/Products';
import { useFlashDiscount } from '../hooks/useFlashDiscount';
import { useSuggestedDiscount } from '../hooks/useSuggestedDiscount';

const MainPage: React.FC = () => {
  useFlashDiscount();
  useSuggestedDiscount();

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <Cart />
        <Products />
      </div>
    </div>
  );
};

export default MainPage;
