'use client';
import { FC, useContext } from 'react';
import { TopNavbar } from './common/topNavbar';
import { Layout } from '../components/layout';
import { Header } from '../components/layout/header';
import { Content } from '../components/layout/content';
import { DataList } from '../components/page/portfolio/dataList';
import { Footer } from '../components/layout/footer';
import { SystemStatusBar } from '../components/block/systemStatusBar';
import TopTips from '../components/block/accountStatus/sections/topTips';

const Portfolio: FC = (props) => {
	return (
		<Layout>
			<Header className="orderly-app-trading-header orderly-border-b orderly-border-semiTransparentWhite orderly-bg-gunmetal">
				<TopNavbar />
			</Header>
			
			<TopTips />

			<Layout>
				<Content className="orderly-bg-richBlack orderly-overflow-hidden orderly-pb-[32px]">
					<DataList />
				</Content>
			</Layout>

			<Footer
				fixed
				className="orderly-bg-gunmetal orderly-flex orderly-items-center orderly-px-4 orderly-w-full orderly-h-[42px] orderly-justify-between orderly-border-t-[1px] orderly-border-semiTransparentWhite orderly-z-50"
			>
				<SystemStatusBar
					xUrl={'https://x.com/BookX_Trade'}
					telegramUrl={'https://t.me/BookX_Community'}
					discordUrl={undefined}
				/>
			</Footer>
		</Layout>
	);
};

export default Portfolio;
