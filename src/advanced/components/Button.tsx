import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`text-white rounded ${className}`} {...props}>
      {children}
    </button>
  );
}
