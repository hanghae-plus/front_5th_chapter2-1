import React, { createContext, useContext, ReactNode } from 'react';
import { useStock } from '../stock';

export interface SelectContextType {
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const SelectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { stockList } = useStock();
  const [selectedId, setSelectedId] = React.useState(stockList[0].id);

  return (
    <SelectContext.Provider
      value={{
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const useSelect = (): SelectContextType => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelect must be used within a SelectProvider');
  }
  return context;
};
