import { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";

interface CartItemsProps {
    items: CartItemType[];
    onQuantityChange: (productId: string, change: number) => void;
    onRemove: (productId: string) => void;
}
const CartItems = ({items, onQuantityChange, onRemove}: CartItemsProps) => {
    if (items.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                장바구니가 비어있습니다
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {items.map(({ product, quantity }) => (
                <CartItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    onQuantityChange={(change) => onQuantityChange(product.id, change)}
                    onRemove={() => onRemove(product.id)}
                />
            ))}
        </div>
    );

}
export default CartItems;