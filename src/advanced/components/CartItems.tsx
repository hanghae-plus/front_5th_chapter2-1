import { CartItemType } from "../types";

type Props = {
    items: CartItemType[];
    addToCart: (item: CartItemType) => void;
    removeFromCart: (item: CartItemType) => void;
    deleteAllFromCart: (item: CartItemType) => void;
}

const CartItems = ({ items, addToCart, removeFromCart, deleteAllFromCart }: Props) => {

    const addNumber = (item: CartItemType) => {

        if(item.count >= item.quantity) {
            alert('재고가 부족합니다.');
            return;
        }
        const newItem = { ...item, count: item.count + 1 };
        addToCart(newItem);
    }

    const removeNumber = (item: CartItemType) => {
        console.log('item:', item);
        const newItem = { ...item, count: item.count - 1 };
        removeFromCart(newItem);
    }

    return (
        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', flexDirection: 'column' }} id="cart-items">
            {items.length === 0 ? (
                <p>장바구니에 상품이 없습니다.</p>
            ) : (
                items.map((item, index) => (
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        justifyContent: "space-between",
                    }} key={index} className="cart-item">
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 10,
                        }}>
                            <h2>{item.name}</h2>
                            <p>- {item.price} 원</p>
                            <p>x {item.count}</p>
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 10,
                        }}>
                            <button id={item.id} onClick={() => removeNumber(item)} style={{
                                backgroundColor: "blue",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "5px",
                            }}>
                                -
                            </button>
                            <button id={item.id} onClick={() => addNumber(item)} style={{
                                backgroundColor: "blue",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "5px",
                            }}>
                                +
                            </button>
                            <button onClick={() => deleteAllFromCart(item)} style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "5px",
                            }}>
                                삭제
                            </button>
                        </div>

                    </div>
                ))
            )}
        </div>
    );
};

export default CartItems;