import { OptionHTMLAttributes } from 'react';

export const ProductSelectOption: React.FC<
	OptionHTMLAttributes<HTMLOptionElement>
> = ({ ...props }) => {
	return <option {...props}>{props.children}</option>;
};
