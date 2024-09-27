'use client';
import { FC, memo } from "react";
import { useFundingRate } from "@orderly.network/hooks";
import { Statistic } from "@/app/components/statistic";
import { Numeral } from "@/app/components/text";

interface Props {
  symbol: string;
}

const FundingRate: FC<Props> = (props) => {
  const data = useFundingRate(props.symbol);

  return (
    <Statistic
      label={"Pred. funding rate"}
      value={
        <div className="orderly-flex flex-nowrap">
          <Numeral
            className="orderly-text-warning"
            unit="%"
            precision={4}
            padding
          >
            {data.est_funding_rate}
          </Numeral>
          <span className="orderly-ml-1 orderly-break-normal orderly-whitespace-nowrap">{`in ${data.countDown}`}</span>
        </div>
      }
      hint="Funding rates are payments between traders who are long and short. When positive, long positions pay short positions funding. When negative, short positions pay long positions."
    />
  );
};

export const MemoizedCompnent = memo(FundingRate);
