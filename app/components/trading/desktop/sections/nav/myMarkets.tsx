'use client';
import React from 'react';

const MyMarkets = ({ onClose }: { onClose: () => void }) => {
	// const { data } = useMarketsStream();
	// const { markets: markets } = useMarkets(MarketsType.ALL);
	// console.log("markets data", data);

	// return <MarketsFull maxHeight={300} onClose={onClose} />;
	return <></>;
};

export const MemoizedMarkets = React.memo(MyMarkets);
