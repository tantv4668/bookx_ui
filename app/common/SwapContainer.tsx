import { Layout } from '../components/layout';
import { Header } from '../components/layout/header';
import { TopNavbar } from '../swap/common/topNavbar';
import { Content } from '../components/layout/content';
import { Footer } from '../components/layout/footer';
import { SystemStatusBar } from '../components/block/systemStatusBar';
import { LiFiWidget, WidgetConfig } from '@lifi/widget';
import { useEffect } from 'react';

const SwapContainer: React.FC = () => {
	const widgetConfig: WidgetConfig = {
		theme: {
			palette: {
				primary: { main: '#AC93DB' },
				secondary: { main: '#E19578' },
			},
			typography: { fontFamily: 'Manrope' },
			container: { borderRadius: '16px', display: 'flex' },
		},
		variant: 'wide',
		appearance: 'dark',
		integrator: 'book_x',
	};

	useEffect(() => {
		const buttonIdsToHide = [
			'orderly-bottom-nav-bar-connect-button',
			'orderly-desktop-botom-bar-switch-chain-button',
			'orderly-top-nav-bar-not-connect',
		];

		buttonIdsToHide.forEach((id) => {
			const button = document.getElementById(id);
			if (button) button.style.display = 'none';
		});
	}, []);

	return (
		<Layout className="orderly-flex orderly-flex-col orderly-gap-12 orderly-bg-richBlack orderly-h-[1200px]">
			<Header className="orderly-app-trading-header orderly-border-b orderly-border-semiTransparentWhite orderly-bg-gunmetal">
				<TopNavbar />
			</Header>
			<Layout>
				<Content>
					<LiFiWidget integrator="Your dApp/company name" config={widgetConfig} />
				</Content>
			</Layout>
			<Footer
				fixed
				className="orderly-bg-gunmetal orderly-flex orderly-items-center orderly-px-4 orderly-w-full orderly-h-[42px] orderly-justify-between orderly-border-t-[1px] orderly-border-semiTransparentWhite orderly-z-50"
			>
				<SystemStatusBar
					xUrl="https://x.com/BookX_Trade"
					telegramUrl="https://t.me/BookX_Community"
					discordUrl={undefined}
				/>
			</Footer>
		</Layout>
	);
};

export default SwapContainer;
