'use client';
import { Switch } from '@/app/components/switch';
import { useMutation, usePrivateQuery } from '@orderly.network/hooks';
import React, { useCallback, useEffect, useState } from 'react';

const Setting: React.FC = (props) => {
	const [maintenanceConfig, setMaintenanceConfig] = useState(true);

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
		<div className="orderly-card-root orderly-card orderly-rounded-xl orderly-shadow orderly-text-white orderly-p-6 orderly-bg-gunmetal">
			<h3 className="orderly-card-header-title orderly-font-semibold orderly-leading-none orderly-tracking-tight orderly-text-lg orderly-border-b-2 orderly-border-semiTransparentWhite orderly-pb-4">
				System upgrade
			</h3>
			<div className="orderly-box orderly-pt-4 orderly-size-width orderly-flex orderly-flex-row orderly-items-center orderly-justify-start orderly-flex-nowrap orderly-gap-4 orderly-font-semibold">
				<div className="orderly-box orderly-flex orderly-flex-col orderly-items-start orderly-justify-start orderly-flex-nowrap orderly-flex-1">
					<span className="orderly-text-white orderly-opacity-80">Cancel open orders during system upgrade</span>
					<span className="orderly-text-sm orderly-text-translucent">
						During the upgrade period, all open orders will be cancelled to manage your risk in case of high market
						volatility.
					</span>
				</div>
				<div>
					<Switch
						color="charcoal"
						className="!orderly-bg-charcoal orderly-w-9 orderly-h-5"
						thumbClassName="orderly-w-4 orderly-h-4 orderly-bg-slateGray"
						onClick={handleSwitchConfig}
						checked={maintenanceConfig}
					/>
				</div>
			</div>
		</div>
	);
};

export default Setting;
