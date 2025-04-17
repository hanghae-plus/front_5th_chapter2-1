import React, { HTMLAttributes } from 'react';

export const MainLayout: React.FC<HTMLAttributes<HTMLDivElement>> = ({
	...props
}) => {
	return (
		<div className="bg-gray-100 p-8" {...props}>
			{props.children}
		</div>
	);
};
