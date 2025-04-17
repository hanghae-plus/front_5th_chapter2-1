import BasicLayout from "#advanced/components/layouts/basic/BasicLayout";

import ProductsProvider from "./_providers/ProductsProvider";
import CartProvider from "./_providers/CartProvider";
import CartHeader from "./_components/CartHeader";
import CartTable from "./_components/CartTable";
import ProductSelectForm from "./_components/ProductSelectForm";
import ShoppingHelp from "./_components/ShoppingHelp";

const MainPage: React.FC = () => {
  return (
    <BasicLayout className="flex items-center justify-center">
      <ProductsProvider>
        <CartProvider>
          <article className="flex w-full max-w-5xl min-w-xl flex-col gap-4 rounded-xl bg-white p-8 shadow-md">
            <CartHeader />
            <ProductSelectForm />
            <CartTable />
            <ShoppingHelp />
          </article>
        </CartProvider>
      </ProductsProvider>
    </BasicLayout>
  );
};

export default MainPage;
