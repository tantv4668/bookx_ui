'use client';
import { PropsWithChildren, useCallback } from 'react';
import { ConnectorProvider } from '@orderly.network/web3-onboard';
import { OrderlyAppProvider } from '@orderly.network/react';
import { OrderlyConfig } from '@/app/config';
import { CustomConfigStore, ENV_NAME } from './CustomConfigStore';
import NavbarTab from './NavbarTab';
import { _orderlySymbolKey } from '../constant';
import { useRouter } from 'next/navigation';
import Protect from 'react-app-protect';
import 'react-app-protect/dist/index.css';
import { LogoIcon } from '../components/assets/icons/logo';
import { TopLeftNavbar } from '../components/layout/topLeftNavbar';
// import { CustomContractManager } from './CustomContract';
// import { ARBITRUM_TESTNET_CHAINID, MANTLE_TESTNET_CHAINID } from '@orderly.network/types';
export type NetworkId = 'testnet' | 'mainnet';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';

const HostEnvMap: Record<string, ENV_NAME> = {
	'dev-sdk-demo.orderly.network': 'dev',
	'qa-sdk-demo.orderly.network': 'qa',
	'sdk-demo-iap.orderly.network': 'staging',
	'localhost': 'staging',
};

type OrderlyContainerProps = PropsWithChildren<{
	symbol?: string;
}>;

const OrderlyContainer: React.FC<OrderlyContainerProps> = (props) => {
	const networkId = (localStorage.getItem('orderly-networkId') ?? 'mainnet') as NetworkId;
	const router = useRouter();
	const isProd = process.env.NEXT_PUBLIC_IS_PROD === 'true';
	const { onboard, app } = OrderlyConfig();

	const onChainChanged = useCallback(
		(chainId, isTestnet) => {
			localStorage.setItem('orderly-networkId', isTestnet ? 'testnet' : 'mainnet');
			setTimeout(() => {
				window.location.reload();
			}, 100);
		},
		[props.symbol],
	);

	const env = networkId === 'mainnet' ? 'prod' : HostEnvMap[window.location.hostname] || 'staging';

	const configStore = new CustomConfigStore({ networkId, env });
	// const contracts = new CustomContractManager(configStore);

	const symbol = localStorage.getItem(_orderlySymbolKey) ?? 'PERP_ETH_USDC';

	return (
		<ConnectorProvider options={onboard as any}>
			<OrderlyAppProvider
				configStore={configStore}
				// contracts={contracts}
				networkId={networkId}
				brokerId={app.brokerId}
				brokerName={app.brokerName}
				appIcons={app.appIcons}
				onChainChanged={onChainChanged}
				footerStatusBarProps={app.footerStatusBarProps}
				shareOptions={app.shareOptions}
				chainFilter={
					isProd
						? {
								testnet: [],
						  }
						: {
								mainnet: [],
						  }
				}
				topBarProps={{
					nav: <NavbarTab />,
					left: (
						<div className="orderly-flex orderly-items-center">
							<LogoIcon className="orderly-w-[157px] orderly-h-[28px] orderly-mx-3" />
						</div>
					),
				}}
				topBar={
					<div>
						<div className="orderly-flex orderly-border-b orderly-border-semiTransparentWhite orderly-mb-3">
							<div className="orderly-flex orderly-items-center">
								<Link href={`/perp/${symbol}`}>
									<LogoIcon className="orderly-w-[157px] orderly-h-[28px] orderly-mx-3" />
								</Link>
							</div>

							<NavbarTab />
							<div className="orderly-ml-[auto]">
								<TopLeftNavbar />
							</div>
						</div>
						<div className="orderly-w-full orderly-min-h-10 orderly-bg-lightPurple orderly-text-[#16141C] orderly-text-center orderly-flex orderly-justify-center orderly-items-center orderly-text-[15px] orderly-font-[600]">
							<Marquee>Become BookX affiliate and get up to 60% trading fee commission 💸</Marquee>
						</div>
					</div>
				}
				referral={{
					saveRefCode: true,
					onBoundRefCode: (success: boolean, error: any) => {
						const path = window.location.pathname;
						if ((path.endsWith('/dashboard') || path.endsWith('/referral')) && success) {
							router.push('/referral/dashboard');
						}
					},
					onClickReferral: () => {
						router.push('/referral/dashboard');
					},
				}}
				theme={undefined}
			>
				{props.children}
			</OrderlyAppProvider>
		</ConnectorProvider>
	);
};

export default OrderlyContainer;
