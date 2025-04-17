interface PropsType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const ProductSelectItem = ({ id, name, price, quantity }: PropsType) => {
  return (
    <option value={id} disabled={quantity === 0}>
      {`${name} - ${price}원`}
    </option>
  );
};

export default ProductSelectItem;
