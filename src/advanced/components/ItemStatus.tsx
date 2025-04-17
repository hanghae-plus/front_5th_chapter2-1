import { CartItemType } from "../types";

type Props = {
    cartList: CartItemType[];
}

const ItemStatus = ({ cartList }: Props) => {
    // console.log('cartList:', cartList);


    return (
        <div id="stock-status" className="text-sm text-gray-500 mt-2">
            {cartList.length > 0 ? (
                <div>
                    {cartList.map((item) => {
                        // console.log('item in map:', item);
                        if(item.quantity - item.count > 5) {
                            return null;
                        } else if (item.quantity - item.count < 5 && item.quantity - item.count > 0) {
                            return (
                                <div key={item.id}>
                                    {item.name} - {item.quantity - item.count}개 남음
                                </div>
                            )
                        } else if (item.quantity - item.count <= 0) {
                            return (
                                <div key={item.id}>
                                    {item.name} - 품절
                                </div>
                            )
                        }
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default ItemStatus;