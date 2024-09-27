'use client';
import { FC, useMemo, useState } from 'react';
import { API, MEDIA_TABLET } from '@orderly.network/types';
import { useMediaQuery } from '@orderly.network/hooks';
import { MobileTokenSelect } from './tokenSelect.mobile';
import { DesktopTokenSelect } from './tokenSelect.desktop';
import { NetworkImage } from '@/app/components/assets/icons/networkImage';
import { cn } from '@/app/components/utils/css';
import { ArrowDownIcon } from '@/app/components/assets/icons/arrowDown';

interface TokenSelectProps {
	disabled?: boolean;
	tokens: API.TokenInfo[];
	token?: API.TokenInfo;
	onTokenChange?: (token: API.TokenInfo) => void;
	fetchBalance: (token: string, decimals: number) => Promise<any>;
	onClosed?: () => void;
}

export const TokenSelect: FC<TokenSelectProps> = (props) => {
	const { tokens } = props;
	const [open, setOpen] = useState<boolean>(false);

	const isMobile = useMediaQuery(MEDIA_TABLET);

	const token = useMemo(() => {
		if (!!props.token) {
			return props.token;
		}

		// default show USDC when no token selected
		return {
			symbol: 'USDC',
		} as API.TokenInfo;
	}, [props.token]);

	const disabled = (tokens?.length ?? 0) < 2 || props.disabled;

	const trigger = useMemo(() => {
		return (
			<button
				disabled={disabled}
				className={
					'orderly-token-select orderly-flex orderly-items-center orderly-gap-2 orderly-text-3xs orderly-text-base-contrast-80 orderly-mr-2 desktop:orderly-text-xs'
				}
				onClick={(event) => {
					event.preventDefault();
					event.stopPropagation();
					setOpen(!open);
				}}
			>
				<NetworkImage type={token ? 'token' : 'placeholder'} name={token?.symbol} size={'small'} rounded />
				<span>{token?.symbol}</span>
				{tokens && tokens.length > 1 && (
					<ArrowDownIcon
						className={cn('orderly-transition orderly-duration-300', open ? 'orderly-rotate-180' : 'orderly-rotate-0')}
						size={16}
					/>
				)}
			</button>
		);
	}, [tokens, token, disabled, open]);

	const commonProps = {
		open,
		onOpenChange: setOpen,
		trigger,
		tokens: props.tokens,
		fetchBalance: props.fetchBalance,
		onTokenChange: props.onTokenChange,
		disabled,
	};

	if (isMobile) {
		return <MobileTokenSelect {...commonProps} />;
	}

	return <DesktopTokenSelect {...commonProps} />;
};
