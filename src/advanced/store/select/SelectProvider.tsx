import React, { useState } from 'react';
import { SelectContext } from './SelectContext';

const SelectProvider = ({ children }: { children: React.ReactNode }) => {
  const [select, setSelect] = useState('p1');
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };
  const value = { select, handleChange };
  return <SelectContext.Provider value={value}>{children}</SelectContext.Provider>;
};

export default SelectProvider;
