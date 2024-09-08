
'use client';
import { FC, useCallback } from "react";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader } from "./dialog";
import Button from "../button";
import { useModal } from "../modal";


export interface AlertDialogProps {
  title?: string;
  message?: string;
  onOk?: () => Promise<any>;
}

export const AlertDialog: FC<AlertDialogProps> = (props) => {
  const { title, message } = props;
  const { visible, hide, resolve, reject, onOpenChange } = useModal();

  const onOk = useCallback(() => {
    hide();
  }, [props.onOk]);
  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogHeader>{title}</DialogHeader>

      <DialogContent>
        <DialogBody>{message}</DialogBody>
      </DialogContent>

      <DialogFooter>
        <Button onClick={onOk}>Ok</Button>
      </DialogFooter>
    </Dialog>
  );
};
