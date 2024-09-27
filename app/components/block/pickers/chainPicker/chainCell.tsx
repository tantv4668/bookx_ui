'use client';
import { NetworkImage } from "@/app/components/assets/icons/networkImage";
import { Tag } from "@/app/components/tag";
import { Circle } from "lucide-react";
import { FC } from "react";

export interface ChainCellProps {
  name: string;
  id: number;
  bridgeless?: boolean;
  selected?: boolean;
  onClick?: (chain: any) => void;
}

export const ChainCell: FC<ChainCellProps> = (props) => {
  const { id, bridgeless, onClick, name, selected } = props;
  return (
    <div
      className="orderly-flex orderly-items-center orderly-p-4 hover:orderly-bg-base-contrast/5 orderly-cursor-pointer orderly-rounded orderly-font-semibold desktop:orderly-p-3"
      onClick={() => {
        onClick?.({
          id,
          name,
        });
      }}
    >
      <div className="orderly-flex-1 orderly-flex orderly-items-center orderly-space-x-3 orderly-text-3xs orderly-text-base-contrast-80 desktop:orderly-space-x-2">
        <NetworkImage type="chain" id={id} rounded />
        <span className="orderly-chain-symbol-name orderly-whitespace-nowrap">
          {name}
        </span>
        {bridgeless && <Tag color="primary">Bridgeless</Tag>}
      </div>
      {selected && (
        // @ts-ignore
        <Circle className="orderly-fill-primary-light orderly-stroke-none orderly-w-[8px] orderly-h-[8px] desktop:orderly-ml-1" />
      )}
    </div>
  );
};
