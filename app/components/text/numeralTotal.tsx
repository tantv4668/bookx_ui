'use client';
import { FC, useMemo } from 'react';
import { Decimal } from '@orderly.network/utils';
import { Numeral, NumeralProps } from './numeral';

export interface NumeralTotalProps extends Omit<NumeralProps, 'children'> {
	price: number | string;
	quantity: number | string;
}

export const NumeralTotal: FC<NumeralTotalProps> = (props) => {
	const { price, quantity, ...rest } = props;
	//

	const children = useMemo(() => {
		if (!price || !quantity) {
			return 0;
		}
		return new Decimal(props.price).mul(props.quantity).toNumber();
	}, [price, quantity]);

	return <Numeral {...rest}>{children}</Numeral>;
};
