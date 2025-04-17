import { createContext, SelectHTMLAttributes, ReactNode } from 'react';

interface SelectContextType {
  value: string;
  onChange: (value: string) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}

function Select({ value, onChange, children, ...props }: SelectProps) {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      <select value={value} onChange={(e) => onChange(e.target.value)} {...props}>
        {children}
      </select>
    </SelectContext.Provider>
  );
}

interface OptionProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
}

function Option({ value, children, disabled }: OptionProps) {
  return (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  );
}

Select.Option = Option;

export { Select };
