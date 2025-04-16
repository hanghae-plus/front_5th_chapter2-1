import BasicLayout from "#advanced/components/layouts/basic/BasicLayout";

import CartHeader from "./_components/CartHeader";
import CartSummary from "./_components/CartSummary";
import CartTable from "./_components/CartTable";
import ProductSelector from "./_components/ProductSelector";
import ShoppingHelp from "./_components/ShoppingHelp";

const MainPage: React.FC = () => {
  return (
    <BasicLayout className="flex items-center justify-center">
      <article className="flex w-full max-w-5xl min-w-md -translate-y-1/2 flex-col gap-4 rounded-xl bg-indigo-400 p-8 shadow-md">
        <CartHeader />
        <CartTable />
        <CartSummary />
        <ProductSelector />
        <ShoppingHelp />
      </article>
    </BasicLayout>
  );
};

export default MainPage;
