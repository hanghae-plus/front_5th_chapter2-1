import { CartItemInfo } from '../../type';

interface Props {
  props: CartItemInfo;
}

export const ProductItem = ({ props }: Props) => {
  return (
    <span>
      {props.name} - {props.price}원 x {props.currentQuantity}
    </span>
  );
};
