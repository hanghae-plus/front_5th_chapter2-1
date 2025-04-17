import { HTMLAttributes } from 'react';

export const H1: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
	...props
}) => {
	return (
		<h1 className={`text-2xl font-bold mb-4 ${props.className}`} {...props}>
			{props.children}
		</h1>
	);
};
