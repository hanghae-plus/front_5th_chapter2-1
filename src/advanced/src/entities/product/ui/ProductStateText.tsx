import { HTMLAttributes } from 'react';

export const ProductStateText: React.FC<HTMLAttributes<HTMLDivElement>> = ({
	...props
}) => {
	return (
		<div
			id="stock-status"
			className={`text-sm text-gray-500 mt-2 ${props.className}`}
			{...props}
		>
			{props.children}
		</div>
	);
};
