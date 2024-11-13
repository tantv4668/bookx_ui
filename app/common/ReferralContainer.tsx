'use client';

import { ReferralProvider } from '@orderly.network/referral';
import { useRouter } from 'next/navigation';
import { Layout } from '../components/layout';
import { Header } from '../components/layout/header';
import { TopNavbar } from '../portfolio/common/topNavbar';
import { Content } from '../components/layout/content';
import { Footer } from '../components/layout/footer';
import { SystemStatusBar } from '../components/block/systemStatusBar';
import { useEffect } from 'react';

const ReferralContainer: React.FC = (props) => {
	const router = useRouter();
	const isProd = process.env.NEXT_PUBLIC_IS_PROD === 'true';
	const referralLinkUrl = isProd ? 'https://app.bookx.trade' : 'https://testnet-app.bookx.trade';

	useEffect(() => {
		const element = Array.from(document.querySelectorAll('div')).find(
			(el) => el.textContent !== null && el.textContent.trim() === '0%~20%',
		);

		if (element) {
			element.textContent = '0%~20%++';
		}
	});

	return (
		<Layout>
			<Header className="orderly-app-trading-header orderly-border-b orderly-border-semiTransparentWhite orderly-bg-gunmetal">
				<TopNavbar />
			</Header>
			<Layout>
				<Content className="orderly-bg-richBlack orderly-overflow-hidden orderly-pb-[32px]">
					<ReferralProvider
						becomeAnAffiliateUrl="https://bit.ly/bookx-affiliate"
						learnAffiliateUrl="https://docs.bookx.trade/trading-basics/affiliates"
						referralLinkUrl={referralLinkUrl}
						bindReferralCodeState={(isSuccess, _error, hide, params) => {
							if (isSuccess) {
								// push to dashboard page
								router.push(getFullPath('/referral/dashboard', params));
							}
							hide();
						}}
						showReferralPage={() => {
							// push to referral page
							router.push('/referral');
						}}
						onEnterAffiliatePage={(params) => {
							// push to dashboard page
							router.push(getFullPath('/referral/dashboard', params));
						}}
						onEnterTraderPage={(params) => {
							// push to dashboard page
							router.push(getFullPath('/referral/dashboard', params));
						}}
					>
						{props.children}
					</ReferralProvider>
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

export default ReferralContainer;

export function getFullPath(path: string, params: any) {
	const searchParams = new URLSearchParams(params || {});
	const queryString = searchParams.toString();
	const fullPath = queryString.length > 0 ? `${path}?${queryString}` : path;
	return fullPath;
}
