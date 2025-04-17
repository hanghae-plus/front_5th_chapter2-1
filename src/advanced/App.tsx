import { CartContainer } from "@advanced/components/cart/CartContainer";
import { CartLayout } from "@advanced/components/cart/CartLayout";
import { AppLayout } from "@advanced/components/common/AppLayout";
import { CartProvider } from "@advanced/lib/contexts/CartProvider";

export function App() {
  return (
    <AppLayout>
      <CartLayout>
        <CartProvider>
          <CartContainer />
        </CartProvider>
      </CartLayout>
    </AppLayout>
  );
}
