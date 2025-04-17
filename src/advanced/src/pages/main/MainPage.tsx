import { H1 } from '@/shared/ui/typography';
import { Wrapper } from '@/shared/ui/wrapper';
import { MainContainer } from '@/widgets/main';
import React from 'react';

export const MainPage: React.FC = () => {
	return (
		<Wrapper>
			<H1>장바구니</H1>
			<MainContainer />
		</Wrapper>
	);
};
