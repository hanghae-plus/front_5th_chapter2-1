import { Cart } from './models/cart';
import { createMainPage } from './pages/main/MainPage';

export function main() {
	const cart = new Cart();
	const root = document.getElementById('app');
	const MainPage = createMainPage({ cart });
	root.appendChild(MainPage);
}
