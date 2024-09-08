'use client';
import { useEffect } from 'react';
import { create } from '../modalHelper';
import { useModal } from '../useModal';
import { modalActions } from '../modalContext';
import { ActionSheet, ActionSheetItem } from '../../sheet';

export const InnerActionSheet = create<{ items: ActionSheetItem[] }>((props: any) => {
	const { visible, hide, remove } = useModal();

	useEffect(() => {
		return () => {
			remove();
		};
	}, []);

	return <ActionSheet open={visible} onClose={hide} actionSheets={props.items} />;
});

/**
 * show action sheet
 * @param items
 */
export const actionSheet = (items: ActionSheetItem[]) => {
	return modalActions.show(InnerActionSheet, { items });
};
