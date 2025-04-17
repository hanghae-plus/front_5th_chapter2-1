import React, { HTMLAttributes, PropsWithChildren } from 'react';

export const Button: React.FC<
	PropsWithChildren<HTMLAttributes<HTMLButtonElement>>
> = ({ ...props }) => {
	return (
		<button
			className={`bg-blue-500 text-white px-4 py-2 rounded ${props.className}`}
			{...props}
		>
			{props.children}
		</button>
	);
};
