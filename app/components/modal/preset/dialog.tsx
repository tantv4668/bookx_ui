'use client';
import { FC } from 'react';
import { create } from '../modalHelper';
import { useModal } from "../useModal";
import { DialogBody, SimpleDialog } from "../../dialog";
import { modalActions } from '../modalContext';
// import { DialogBody, SimpleDialog, useModal } from '@orderly.network/react';

export interface DialogProps {
	title: string;
	content: React.ReactNode;
}

const Dialog = create<DialogProps>((props) => {
	const { visible, hide, resolve, reject, onOpenChange } = useModal();
	return (
		<SimpleDialog
			open={visible}
			title={props.title}
			closable
			onOpenChange={onOpenChange}
			// @ts-ignore
			onOk={() => {
				resolve(true);
				hide();
			}}
			onCancel={() => {
				reject(false);
				hide();
			}}
		>
			<DialogBody>
				<div className="orderly-py-5 orderly-text-[12px]">{props.content}</div>
			</DialogBody>
		</SimpleDialog>
	);
});

export const dialog = (props: DialogProps) => {
	return modalActions.show(Dialog, props);
};
