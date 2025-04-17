import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useReducer,
} from 'react';
import { INITIAL_PRODUCT_LIST } from '../../data/products';
import { StockContextType } from 'src/advanced/config/types';
import { getCartSummary } from '../../utils/product';
import { stockReducer } from './reducer';

const StockContext = createContext<StockContextType | undefined>(undefined);

export const StockProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stockList, dispatch] = useReducer(stockReducer, INITIAL_PRODUCT_LIST);
  const [lastAddedProductId, setLastAddedProductId] = useState<
    string | undefined
  >();

  const cartList = stockList.filter((product) => product.cartQuantity > 0);
  const summary = getCartSummary(cartList);

  return (
    <StockContext.Provider
      value={{
        stockList,
        dispatch,
        lastAddedProductId,
        setLastAddedProductId,
        cartList,
        summary,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = (): StockContextType => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};
