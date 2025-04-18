import {
  CartItemContainer,
  ProductSelect,
  StockStatus,
  TotalAmount,
} from './components';
import { useLuckyDraw } from './hooks/use-lucky-draw';
import { useSuggestion } from './hooks/use-suggestion';

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Main: React.FC<MainProps> = (props) => {
  useLuckyDraw();
  useSuggestion();

  return (
    <div className="bg-gray-100 p-8" {...props}>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartItemContainer />
        <TotalAmount />
        <ProductSelect />
        <StockStatus />
      </div>
    </div>
  );
};
