import { SelectHTMLAttributes } from 'react';

export const ProductSelect: React.FC<
	SelectHTMLAttributes<HTMLSelectElement>
> = ({ value, ...props }) => {
	return (
		<select
			id="product-select"
			className="border rounded p-2 mr-2"
			value={value}
			{...props}
		>
			{props.children}
		</select>
	);
};
