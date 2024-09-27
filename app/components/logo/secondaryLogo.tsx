'use client';
import { FC, useContext } from 'react';
import { OrderlyAppContext } from '../provider';
import { NetworkImage } from '../assets/icons/networkImage';
import { Size } from '../utils/getSize';

interface Props {
	size?: Size | number;
}

export const SecondaryLogo: any = (props: any) => {
	const { appIcons } = useContext(OrderlyAppContext);

	if (!appIcons) return null;

	const { secondary } = appIcons;

	if (secondary?.component) {
		return secondary.component;
	}

	if (secondary?.img) {
		return <NetworkImage size={props.size} type={'path'} rounded path={secondary.img} />;
	}

	return null;
};
