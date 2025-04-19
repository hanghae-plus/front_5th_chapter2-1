import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  id?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

function Button({
  children,
  id,
  className,
  type = 'button',
  disabled,
}: ButtonProps) {
  return (
    <button id={id} className={className} type={type} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
