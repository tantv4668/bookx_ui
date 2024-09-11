'use client';
export const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="orderly-bg-[#333] orderly-rounded-lg orderly-text-translucent orderly-p-3">
				<div className="orderly-text-[12px]">{payload[0].value} USDC</div>
				<div className="orderly-text-[10px]">{payload[0].payload.name}</div>
			</div>
		);
	}

	return null;
};
