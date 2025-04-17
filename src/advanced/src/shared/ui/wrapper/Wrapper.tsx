import { HTMLAttributes } from 'react';

export const Wrapper: React.FC<HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...props
}) => {
	return (
		<div
			className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8 ${className || ''}`}
			{...props}
		>
			{children}
		</div>
	);
};
