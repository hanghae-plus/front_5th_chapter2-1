import { useCartContext } from '../context/cart/CartContext';

const AddButton = ({ selectedOptionId }: { selectedOptionId: string }) => {
    const { addNewCartItem, cartItems, increaseItemQuantity } = useCartContext();

    const handleCartItemAdd = () => {
        const item = cartItems.find((item) => item.productId === selectedOptionId);
        if (!item) {
            return addNewCartItem(selectedOptionId);
        }
        return increaseItemQuantity(selectedOptionId);
    };

    return (
        <button id="add-to-cart" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCartItemAdd}>
            추가
        </button>
    );
};

export default AddButton;
