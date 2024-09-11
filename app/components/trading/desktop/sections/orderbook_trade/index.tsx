'use client';
import { FC, useState } from 'react';
import { MemorizedTradeHistoryFull } from './tradingHistory';
import { MemorizedOrderBook } from './orderbook';
import { SymbolProvider } from '@/app/components/provider';
import { TabPane, Tabs } from '@/app/components/tab';

interface Props {
	symbol: string;
}

export const MyOrderBookAndTrade: FC<Props> = (props) => {
	const [value, setValue] = useState('orderbook');

	return (
		<SymbolProvider symbol={props.symbol}>
			<Tabs
				value={value}
				onTabChange={(value: any) => setValue(value)}
				allowUngroup
				fullWidth
				keepAlive
				autoFit
				minWidth={300}
				tabBarClassName="orderly-h-[48px] orderly-text-sm"
			>
				<TabPane title="Orderbook" value="orderbook">
					<MemorizedOrderBook symbol={props.symbol} className={'orderly-pl-3'} />
				</TabPane>
				<TabPane title="Last trades" value="tradeHistory">
					<MemorizedTradeHistoryFull symbol={props.symbol} />
				</TabPane>
			</Tabs>
		</SymbolProvider>
	);
};
