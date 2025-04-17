import { MainLayout } from '../apps/layouts';
import { MainPage } from '../pages/main';
import { CartProvider } from './providers/cart';
import { ProductProvider } from './providers/product';

export const App: React.FC = () => {
	return (
		<ProductProvider>
			<CartProvider>
				<MainLayout>
					<MainPage />
				</MainLayout>
			</CartProvider>
		</ProductProvider>
	);
};
