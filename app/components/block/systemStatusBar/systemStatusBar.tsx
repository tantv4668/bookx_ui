'use client';
import { FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { NetworkStatus } from './networkStatus';
import { CommunityDiscord, CommunityX, CommunityTG } from './communityIcon';
import { OrderlyLogo } from './orderlyLogo';
import React from 'react';
import { Divider } from '../../divider';

export interface FooterStatusBarProps {
	xUrl?: string;
	telegramUrl?: string;
	discordUrl?: string;
	commutitylist?: React.ReactNode[];
	powerBy?: string | React.ReactNode;
}

export const SystemStatusBar: FC<FooterStatusBarProps> = (props) => {
	const { xUrl, telegramUrl, discordUrl, commutitylist, powerBy = <OrderlyLogo /> } = props;

	const children = useMemo(() => {
		if (commutitylist !== undefined) {
			return commutitylist;
		}

		const children: React.ReactNode[] = [];
		if (telegramUrl !== undefined) {
			children.push(
				<button
					onClick={() => {
						window.open(telegramUrl, '_blank');
					}}
				>
					<CommunityTG />
				</button>,
			);
		}
		if (discordUrl !== undefined) {
			children.push(
				<button
					onClick={() => {
						window.open(discordUrl, '_blank');
					}}
				>
					<CommunityDiscord />
				</button>,
			);
		}
		if (xUrl !== undefined) {
			children.push(
				<button
					onClick={() => {
						window.open(xUrl, '_blank');
					}}
				>
					<CommunityX />
				</button>,
			);
		}

		return children;
	}, [xUrl, telegramUrl, discordUrl, commutitylist]);

	return (
		<>
			<div id="orderly-bottom-navigation-bar" className="orderly-flex orderly-items-center">
				<NetworkStatus />

				<div className="orderly-border-l orderly-border-semiTransparentWhite orderly-h-5 orderly-mx-2" />

				<span className="orderly-text-translucent orderly-text-[11px] orderly-font-semibold orderly-pr-2">
					Join our community
				</span>

				{children.map((item) => item)}
			</div>

			<div className="orderly-flex orderly-items-center">
				<span className="orderly-text-translucent orderly-text-[11px] orderly-font-semibold orderly-pr-2 orderly-justify-end">
					Powered by
				</span>
				{powerBy}
			</div>
		</>
	);
};
