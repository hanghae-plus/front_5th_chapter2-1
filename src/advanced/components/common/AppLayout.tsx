interface AppLayoutProps extends React.PropsWithChildren {}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div id="app">
      <div className="bg-gray-100 p-8">{children}</div>
    </div>
  );
}
