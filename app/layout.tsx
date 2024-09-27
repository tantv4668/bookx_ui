import dynamic from 'next/dynamic';
import './globals.css';
const OrderlyContainer = dynamic(() => import('./common/OrderlyContainer'), { ssr: false });

export const viewport = {
	minimumScale: 1.0,
	maximumScale: 1.0,
	userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/png" href="/bookxIcon.png" />
				<link rel="apple-touch-icon" type="image/png" sizes="16x16" href="/bookxIcon.png" />
				{/* <link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700&family=Noto+Sans:wght@500;600;700&family=Oswald:wght@200;300;400;500;600;700;800&display=swap"
					rel="stylesheet"
				/> */}
				<title>BookX - The Unified Multi-chain Perp DEX </title>
				<meta name="description" content="Enjoy low-fee, lightning-fast cross-chain trading on BookX, the Unified Orderbook Perp DEX made for savvy traders. Trade more, spend less!" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				<meta property="og:title" content="BookX - The Unified Multi-chain Perp DEX " />
				<meta property="og:description" content="Enjoy low-fee, lightning-fast cross-chain trading on BookX, the Unified Orderbook Perp DEX made for savvy traders. Trade more, spend less!" />
				<meta property="og:image" content="/SEO.jpg" />
				<meta property="og:type" content="website" />

				<meta name="twitter:title" content="BookX - The Unified Multi-chain Perp DEX " />
				<meta name="twitter:description" content="Enjoy low-fee, lightning-fast cross-chain trading on BookX, the Unified Orderbook Perp DEX made for savvy traders. Trade more, spend less!" />
				<meta name="twitter:image" content="/SEO.jpg" />

			</head>
			<title id="orderly_sdk_demo_title_key">BookX - The Unified Multi-chain Perp DEX</title>
			<meta name="description" content="Enjoy low-fee, lightning-fast cross-chain trading on BookX, the Unified Orderbook Perp DEX made for savvy traders. Trade more, spend less!" />
			<body>
				<OrderlyContainer>{children}</OrderlyContainer>
			</body>
		</html>
	);
}
