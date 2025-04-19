import { useProducts } from "../hooks/useProducts"

export const CartTotal = () => {
    const {products} = useProducts()

    const getTotalAmount = () => {
        return products.reduce((acc, prod) => {
          return acc + prod.cart * prod.price
        }, 0)
    }

    const getLoyaltyPoints = (totalAmount: number) => {
        return Math.floor(totalAmount / 1000);
    }

    return (
        <div id="cart-total" className="text-xl font-bold my-4">
            {`총액: ${Math.round(getTotalAmount())}원`}
            <span id="loyalty-points" className="text-blue-500 ml-2">{`(포인트: ${getLoyaltyPoints(getTotalAmount())})`}</span>
        </div>
    )
}