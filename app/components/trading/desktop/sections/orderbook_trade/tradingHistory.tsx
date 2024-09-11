'use client';
import { FC, memo } from "react";
import { useMarketTradeStream } from "@orderly.network/hooks";
import { useTabContext } from "@/app/components/tab/tabContext";

interface TradeHistoryProps {
  symbol: string;
}

export const TradeHistoryFull: FC<TradeHistoryProps> = (props) => {
  const { symbol } = props;

  const { data, isLoading } = useMarketTradeStream(symbol);
  const { height } = useTabContext();

  return (
    <div
      className="orderly-overflow-y-auto orderly-px-3"
      style={{ height: `${height?.content}px` }}
    >
      {/* <TradeHistory
        dataSource={data}
        loading={isLoading}
        headerClassName="orderly-py-[5px]"
      /> */}
    </div>
  );
};

export const MemorizedTradeHistoryFull = memo(TradeHistoryFull);
