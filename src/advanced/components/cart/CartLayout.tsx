interface CartLayoutProps extends React.PropsWithChildren {}

export function CartLayout({ children }: CartLayoutProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      {children}
    </div>
  );
}
