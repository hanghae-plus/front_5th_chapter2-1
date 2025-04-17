import { Product, CartItem } from '../types/product';

type Props = {
    productList: Product[];
};
export const StockStatus = ({ productList }: Props) => {

    return (
        <>
            {productList.map((item) => {
                return item.stock === 0 ? item.name + ': 품절' : ''
            }
            )}
        </>
    );
}

export default StockStatus;