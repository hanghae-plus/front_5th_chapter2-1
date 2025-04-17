import { createContext, useContext } from 'react';

interface SelectContextType {
  select: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select Context가 없습니다');
  }
  return context;
};
