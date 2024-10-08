import { Arbitrum, Base, Ethereum, Optimism } from '@orderly.network/types';
import injectedModule from '@web3-onboard/injected-wallets';
import ledgerModule from '@web3-onboard/ledger';
// import trezorModule from '@web3-onboard/trezor'
import walletConnectModule from '@web3-onboard/walletconnect';

export function OrderlyConfig(ctx?: { url: string; domain: string }) {
	const wcV2InitOptions = {
		version: 2,
		projectId: '93dba83e8d9915dc6a65ffd3ecfd19fd',
		requiredChains: [42161],
		optionalChains: [421613, 42161],
		dappUrl: window.location.host,
	};

	const ledgerInitOptions = {
		projectId: '93dba83e8d9915dc6a65ffd3ecfd19fd',
	};
	const walletConnect = walletConnectModule(wcV2InitOptions);
	// @ts-ignore
	const ledger = ledgerModule(ledgerInitOptions);

	return {
		onboard: {
			wallets: [
				injectedModule(),
				walletConnect,
				ledger,
				// trezor,
			],
			appMetadata: {
				name: 'Orderly',
				icon: '/bookxIcon.png',
				description: 'Orderly',
				recommendedInjectedWallets: [
					{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
					{ name: 'MetaMask', url: 'https://metamask.io' },
					{ name: 'Trezor', url: 'https://trezor.io/' },
					{ name: 'Walletconnect', url: 'https://walletconnect.com/' },
					{ name: 'Ledger', url: 'https://www.ledger.com/' },
				],
				agreement: {
					version: '1.0.0',
					termsUrl: 'https://www.blocknative.com/terms-conditions',
					privacyUrl: 'https://www.blocknative.com/privacy-policy',
				},
				gettingStartedGuide: 'https://blocknative.com',
				explore: 'https://blocknative.com',
			},
		},
		app: {
			brokerId: 'book_x',
			brokerName: 'BookX',
			appIcons: {
				main: {
					// component: LogoIcon,
				},
				secondary: {
					// component: LogoIcon,
				},
			},
			chainFilter: { mainnet: [Arbitrum, Optimism, Base, Ethereum] },
			enableSwapDeposit: false,
			footerStatusBarProps: {
				xUrl: 'https://x.com/BookX_Trade',
				telegramUrl: 'https://t.me/BookX_Community',
				// discordUrl: 'https://discord.com/invite/orderlynetwork',
			},
			shareOptions: {
				pnl: {
					backgroundImages: [
						'/images/3-min.png',
						'/images/4-min.png',
						'/images/5-min.png',
						'/images/6-min.png',
						'/images/7-min.png',
						'/images/8-min.png',
						'/images/9-min.png',
						'/images/10-min.png',
						'/images/11-min.png',
					],
				},
			},
		},
		tradingViewConfig: {
			scriptSRC: '/tradingview/charting_library/charting_library.js',
			library_path: '/tradingview/charting_library/',
			customCssUrl: '/tradingview/chart.css',
			overrides: {
				// 	'paneProperties.backgroundType': 'solid',
				// 	'paneProperties.background': '#1D1A26',
				'mainSeriesProperties.candleStyle.upColor': '#e1f578',
				'mainSeriesProperties.candleStyle.downColor': '#ac93db',
				'mainSeriesProperties.candleStyle.borderColor': '#e1f578',
				'mainSeriesProperties.candleStyle.borderUpColor': '#e1f578',
				'mainSeriesProperties.candleStyle.borderDownColor': '#ac93db',
				'mainSeriesProperties.candleStyle.wickUpColor': '#e1f578',
				'mainSeriesProperties.candleStyle.wickDownColor': '#ac93db',
				// 	// GRID lines
				// 	'paneProperties.vertGridProperties.color': '#26232F',
				// 	'paneProperties.horzGridProperties.color': '#26232F',
				// 	// text color
				// 	'scalesProperties.textColor': '#97969B',
				// 	'scalesProperties.lineColor': '#2B2833',
			},
		},
	};
}

export const ORDERLY_SDK_DEMO_TITLE_KEY = 'orderly_sdk_demo_title_key';
