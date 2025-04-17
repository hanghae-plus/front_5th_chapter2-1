import { createContext, useContext } from 'react';
import { ProdListType } from '../../constants/initialValue';

interface ProdListContextType {
  prodList: ProdListType[];
  setProdList: React.Dispatch<React.SetStateAction<ProdListType[]>>;
}

export const ProdListContext = createContext<ProdListContextType | null>(null);

export const useProdListContext = () => {
  const context = useContext(ProdListContext);

  if (!context) {
    throw new Error('ProdList Context가 없습니다');
  }
  return context;
};
