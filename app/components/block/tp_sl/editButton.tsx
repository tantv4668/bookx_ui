'use client';
import { FC, useEffect } from "react";
import { useTPSLOrderRowContext } from "./tpslOrderRowContext";
// import { TPSLOrderEditButton } from "@/block/commons/tpslOrderEditButton";
// import { useTPSLOrderRowContext } from "@/block/tp_sl/tpslOrderRowContext";

export const EditButton: FC<{}> = (props) => {
  const { order, position } = useTPSLOrderRowContext();

  return (
    // <TPSLOrderEditButton
    //   disabled={!position}
    //   label={"Edit"}
    //   order={order}
    //   position={position!}
    //   maxQty={position?.position_qty ?? 0}
    //   isEditing
    // />
    <></>
  );
};
