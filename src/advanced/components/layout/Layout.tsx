import { STYLES } from "@/basic/consts/styles";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={STYLES.CONTAINER.MAIN}>
      <div className={STYLES.CONTAINER.WRAPPER}>
        <h1 className={STYLES.HEADER.TITLE}>장바구니</h1>
        {children}
      </div>
    </div>
  );
};
