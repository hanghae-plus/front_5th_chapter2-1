import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className='bg-gray-100 p-8'>{children}</div>;
}

export default Container;
