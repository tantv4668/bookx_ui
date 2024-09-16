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
				// chainFilter={{
				// 	mainnet: [
				// 		{
				// 			id: 5000,
				// 			chainInfo: {
				// 			  chainId: `0x${(5000).toString(16)}`,
				// 			  chainName: "Mantle",
				// 			  nativeCurrency: {
				// 				name: "MNT",
				// 				symbol: "MNT",
				// 				decimals: 6,
				// 				fix: 4,
				// 			  },
				// 			  rpcUrls: ["https://rpc.mantle.xyz/"],
				// 			  blockExplorerUrls: ["https://mantlescan.xyz/"],
				// 			},
				// 			minGasBalance: 0.0002,
				// 			minCrossGasBalance: 0.002,
				// 			maxPrepayCrossGas: 0.03,
				// 			blockExplorerName: "Mantle",
				// 			chainName: "Mantle",
				// 			chainNameShort: "Mantle",
				// 			requestRpc: "https://rpc.mantle.xyz/",
				// 			chainLogo: "",
				// 		  }
				// 	],
				// 	testnet: [],
				// }}
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
							<Marquee>
								BookX Alpha Launch 💸 Free Trading: Zero Maker Fees 💸 From September 16th to October 7th
							</Marquee>
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
				// chainFilter={
				// 	{
				// 		mainnet: [{ id: 42161 }, { id: 8453 }, { id: 10 }, { id: 169 }],
				// 		testnet: [{ id: 421614 }, { id: 421613 }],
				// 	} as any
				// }
				// chainFilter={{
				// 	mainnet: [],
				// 	testnet: [{ id: ARBITRUM_TESTNET_CHAINID }, { id: MANTLE_TESTNET_CHAINID }],
				// }}
			>
				<Protect sha512="7696b2234e4fb4883e4c344cbae61219c639881075f199a18759fffa56a08c66014b1eb3b270ace3e9ce0b15f669a48bac245e3a1021ed9961307a85b56add97">
					{props.children}
				</Protect>
			</OrderlyAppProvider>
		</ConnectorProvider>
	);
};

export default OrderlyContainer;
