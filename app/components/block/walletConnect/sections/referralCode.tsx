'use client';
import { CircleCloseIcon } from '@/app/components/assets/icons/circleClose';
import { Input } from '@/app/components/globals/input';
import { OrderlyAppContext } from '@/app/components/provider';
import { cn } from '@/app/components/utils/css';
import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';

export const ReferralCode: FC<{
	className?: string;
	refCode?: string;
	setRefCode: any;
	isExist?: boolean;
}> = (props) => {
	const { className, refCode, setRefCode, isExist } = props;

	const { referral } = useContext(OrderlyAppContext);

	const localRefCode = localStorage.getItem('referral_code');

	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (referral?.saveRefCode === true && inputRef) {
			inputRef?.current?.focus();
			inputRef?.current?.setSelectionRange(inputRef?.current.value.length, inputRef.current.value.length);
		}
	}, [referral?.saveRefCode, refCode, inputRef]);

	const errorInfo = useMemo(() => {
		const length = refCode?.length || 0;
		if (length === 0) return '';
		if (length < 4 || length > 10) {
			return 'The referral_code must be 4 to 10 characters long, only accept upper case roman characters and numbers';
		}

		return isExist ? '' : 'This referral code does not exist.';
	}, [refCode]);

	const isError = useMemo(() => {
		const length = refCode?.length || 0;
		if (length === 0) return false;
		if (length < 4 || length > 10) {
			return true;
		}

		return isExist === false;
	}, [refCode, isExist]);

	if (referral?.saveRefCode !== true || (localRefCode?.length || 0) <= 0) return <></>;

	return (
		<div className={cn('orderly-text-2xs orderly-text-base-contrast-80', props.className)}>
			<div>Referral code (optional)</div>
			<div className="orderly-pt-3">
				<Input
					ref={inputRef}
					tooltipClassName="orderly-max-w-[370px] desktop:orderly-max-w-[350px]"
					containerClassName="orderly-h-[40px] orderly-bg-base-700"
					value={refCode}
					onChange={(e) => {
						setRefCode(e.target.value.replace(/[^A-Z0-9]/g, ''));
					}}
					error={isError}
					helpText={errorInfo}
					autoFocus
					autoComplete="off"
					suffix={
						<button
							className="orderly-mr-2"
							onClick={(e) => {
								e.stopPropagation();
								setRefCode('');
							}}
						>
							{/* <CircleCloseIcon
                size={18}
                fillOpacity={1}
                className="orderly-fill-base-contrast-20 hover:orderly-fill-base-contrast-54"
              /> */}
						</button>
					}
				/>
			</div>
		</div>
	);
};
