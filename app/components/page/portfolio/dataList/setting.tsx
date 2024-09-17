'use client';
import { Switch } from '@/app/components/switch';
import { useAccount, useMutation, usePrivateQuery } from '@orderly.network/hooks';
import React, { useCallback, useEffect, useState } from 'react';

const Setting: React.FC = (props) => {
	const [maintenanceConfig, setMaintenanceConfig] = useState(true);

	const { state } = useAccount();

	const [mutate] = useMutation('/v1/client/maintenance_config', 'POST');
	const { data, isLoading, error } = usePrivateQuery<any>('/v1/client/info');

	useEffect(() => {
		data && setMaintenanceConfig(data?.maintenance_cancel_orders);
	}, []);

	const handleSwitchConfig = useCallback(async () => {
		try {
			await mutate({
				maintenance_cancel_order_flag: !maintenanceConfig,
			});
			setMaintenanceConfig((prev) => !prev);
		} catch (err) {
			console.error('Error:', error);
		}
	}, [maintenanceConfig]);

	return (
		<div className="orderly-rounded-xl orderly-shadow orderly-text-white orderly-p-6 orderly-bg-gunmetal !orderly-w-full">
			<h3 className="orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg orderly-border-b-2 orderly-border-semiTransparentWhite orderly-pb-4">
				System upgrade
			</h3>
			<div className="orderly-pt-4 orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-gap-4 orderly-font-semibold !orderly-w-full">
				<div className="orderly-box orderly-flex orderly-flex-col orderly-items-start orderly-justify-start !orderly-w-full">
					<div className="orderly-text-white orderly-opacity-80">Cancel open orders during system upgrade</div>
					<div className="orderly-text-[14px] orderly-text-translucent !orderly-w-full">
						During the upgrade period, all open orders will be cancelled to manage your risk in case of high market
						volatility.
					</div>
				</div>
				<div>
					<Switch
						disabled={state.status !== 5}
						className={`!orderly-bg-${maintenanceConfig ? 'paleLime' : 'charcoal'} orderly-w-10 orderly-h-5`}
						thumbClassName={`orderly-w-4 orderly-h-4 !orderly-bg-slateGray`}
						onClick={handleSwitchConfig}
						checked={maintenanceConfig}
					/>
				</div>
			</div>
		</div>
	);
};

export default Setting;
