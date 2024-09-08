'use client';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { DialogContent, DialogHeader, DialogDescription, Dialog, DialogTitle, DialogFooter } from '../dialog/dialog';
import { useMemo, useState } from 'react';
import { cn } from '../utils/css';
import Button from '../button';

export interface BaseDialogProps {
	open: boolean;
	title: ReactNode;
	closable?: boolean;
	closeableSize?: number;
	onOk?: () => Promise<any>;
	onCancel?: () => void;
	footer?: ReactNode;
	onOpenChange?(open: boolean): void;
	contentClassName?: string;
	maxWidth?: 'xs' | 'sm' | 'lg' | 'xl' | null | undefined;
	okId?: string;
	cancelId?: string;
}

export const SimpleDialog: FC<PropsWithChildren<BaseDialogProps>> = (props) => {
	const [loading, setLoading] = useState(false);
	const actions = useMemo(() => {
		if (props.footer !== undefined) {
			return props.footer;
		}
		if (!props.onCancel && !props.onOk) {
			return null;
		}

		const buttons = [];

		if (typeof props.onCancel === 'function') {
			buttons.push(
				<Button
					id={props.cancelId}
					className="orderly-confirm-dialog-cancal-button orderly-text-xs desktop:orderly-text-xs orderly-font-bold"
					key="cancel"
					type="button"
					variant="contained"
					color="tertiary"
					onClick={props.onCancel}
					disabled={loading}
					fullWidth
				>
					Cancel
				</Button>,
			);
		}

		if (typeof props.onOk === 'function') {
			buttons.push(
				<Button
					id={props.okId}
					className="orderly-confirm-dialog-ok-button orderly-text-xs desktop:orderly-text-xs orderly-font-bold"
					key="ok"
					type="button"
					disabled={loading}
					loading={loading}
					fullWidth
					onClick={() => {
						setLoading(true);
						props.onOk?.().finally(() => setLoading(false));
					}}
				>
					OK
				</Button>,
			);
		}

		return (
			<DialogFooter className={cn(buttons.length > 1 ? 'orderly-grid-cols-2' : 'orderly-grid-cols-1')}>
				{buttons}
			</DialogFooter>
		);
	}, [props.onCancel, props.onOk, loading, props.footer]);

	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogContent
				closable={props.closable}
				closeableSize={props.closeableSize}
				onOpenAutoFocus={(event: any) => event.preventDefault()}
				className={cn('orderly-confirm-dialog', props.contentClassName)}
				maxWidth={props.maxWidth}
			>
				{props.title && (
					<DialogHeader>
						<DialogTitle>{props.title}</DialogTitle>
					</DialogHeader>
				)}
				{props.children}
				{actions}
			</DialogContent>
		</Dialog>
	);
};
