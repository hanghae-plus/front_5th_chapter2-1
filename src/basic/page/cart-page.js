import CartSection from '../components/cart-section';
import ProductSection from '../components/product-section';

export default function CartPage() {
    return /* HTML */ `<div class="bg-gray-100 p-8">
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
            <h1 class="text-2xl font-bold mb-4">장바구니</h1>
            ${CartSection()} ${ProductSection()}
        </div>
    </div>`;
}
