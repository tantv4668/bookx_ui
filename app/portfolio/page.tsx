import { FC, useContext } from 'react';
import { TopNavbar } from './common/topNavbar';
import { Layout } from '../components/layout';
import { Header } from '../components/layout/header';
import { Content } from '../components/layout/content';
import { DataList } from '../components/page/portfolio/dataList';
import { Footer } from '../components/layout/footer';
import { SystemStatusBar } from '../components/block/systemStatusBar';
import { OrderlyAppContext } from '../components/provider';
// import { Footer } from "@/layout/footer";
// import { SystemStatusBar } from "@/block/systemStatusBar";
// import { OrderlyAppContext } from "@/provider";
// import { DataList } from "./dataList";

// const { Header, Content } = Layout;

const Portfolio: FC = (props) => {
	// const { footerStatusBarProps } = useContext(OrderlyAppContext);

	return (
		<Layout>
			<Header className="orderly-app-trading-header orderly-border-b orderly-border-divider">
				<TopNavbar />
			</Header>

			<Layout style={{ paddingBottom: '42px' }}>
				<Content className="orderly-overflow-hidden orderly-pt-[20px] orderly-pb-[32px] orderly-px-[60px] desktop:orderly-px-[40px]">
					<DataList />
				</Content>
			</Layout>

			{/* <Footer
				fixed
				className="orderly-bg-base-900 orderly-flex orderly-items-center orderly-px-4 orderly-w-full orderly-h-[42px] orderly-justify-between orderly-border-t-[1px] orderly-border-base-500 orderly-z-50"
			>
				<SystemStatusBar
					xUrl={footerStatusBarProps?.xUrl}
					telegramUrl={footerStatusBarProps?.telegramUrl}
					discordUrl={footerStatusBarProps?.discordUrl}
				/>
			</Footer> */}
		</Layout>
	);
};

export default Portfolio;
