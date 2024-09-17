'use client';
export const CustomTooltip = ({ active, payload, label, className, isPerformance, formatter }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="orderly-bg-[#333] orderly-rounded-lg orderly-text-translucent orderly-p-3">
				<div className="orderly-text-[12px]">
					<span
						className={`${className} ${
							isPerformance &&
							(+payload[0].value > 0 ? 'orderly-text-paleLime' : +payload[0].value < 0 && 'orderly-text-lightPurple')
						}`}
					>
						{isPerformance && +payload[0].value > 0 && '+'}
						{Number(payload[0].value.toFixed(2))}
					</span>{' '}
					USDC
				</div>
				<div className="orderly-text-[10px]">{payload[0].payload.name}</div>
			</div>
		);
	}

	return null;
};
