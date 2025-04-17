import { useState } from 'react';
import { ProdListContext } from './ProdListContext';
import { initProdList, ProdListType } from '../../constants/initialValue';

const ProdListProvider = ({ children }: { children: React.ReactNode }) => {
  const [prodList, setProdList] = useState<ProdListType[]>(() => initProdList);

  const value = { prodList, setProdList };

  return <ProdListContext.Provider value={value}>{children}</ProdListContext.Provider>;
};

export default ProdListProvider;
