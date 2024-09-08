'use client';
import { FC, useMemo, useRef } from "react";
import { Decimal } from "@orderly.network/utils";
import { type API } from "@orderly.network/types";
import { TokenSelect } from "../pickers/tokenPicker";
import Button from "../../button";
import { Divider } from "../../divider";
import { cn } from "../../utils/css";
import { Spinner } from "../../spinner";
import { parseNumber } from "../../utils/num";

export type InputStatus = "error" | "warning" | "success" | "default";

export interface QuantityInputProps {
  disabled?: boolean;
  maxAmount?: number;
  tokens: API.TokenInfo[];
  token?: API.TokenInfo;
  quantity?: string;
  decimals: number;
  // markPrices: MarkPrices;
  markPrice: number;

  onTokenChange?: (token: API.TokenInfo) => void;
  // onMaxClick?: () => void;
  onValueChange?: (value: { value: string; token: string }) => void;
  className?: string;
  // errorMessages?: string;
  status?: InputStatus;
  hintMessage?: string;
  balanceRevalidating?: boolean;
  fetchBalance: (token: string, decimals: number) => Promise<any>;
  precision?: number;
}
export const QuantityInput: FC<QuantityInputProps> = (props) => {
  const { disabled, precision = 2 } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const amount = useMemo(() => {
    return (
      new Decimal(props.quantity || 0)
        .mul(props.markPrice)
        // .todp(props.decimals)
        .todp(Math.abs(2 - 5))
        .toString()
    );
  }, [props.quantity, props.markPrice]);

  return (
    <>
      <div
        id="orderly-quantity-input-view"
        className={cn(
          "orderly-bg-base-500 dark:orderly-bg-base-100 orderly-rounded orderly-pl-1 orderly-pr-2 orderly-py-2 focus-within:orderly-bg-bg-base-500 focus-within:orderly-outline focus-within:orderly-outline-1 orderly-outline-primary",
          props.className,
          {
            "orderly-outline orderly-outline-1 orderly-outline-danger-light":
              props.status === "error",
            "orderly-outline orderly-outline-1 orderly-outline-warning":
              props.status === "warning",
          }
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="orderly-flex">
          <div className="orderly-flex-1 orderly-flex orderly-justify-between">
            <input
              type="text"
              inputMode="decimal"
              ref={inputRef}
              disabled={disabled}
              value={props.quantity}
              // onChange={onChange}
              onChange={(event) => {
                //
                props?.onValueChange?.({
                  value: event.target.value,
                  token: props.token?.symbol ?? "",
                });
              }}
              className={
                "orderly-quantity-input orderly-bg-transparent orderly-h-full orderly-flex-1 orderly-px-2 focus-visible:orderly-outline-none orderly-font-semibold orderly-text-sm orderly-text-base-contrast placeholder:orderly-text-base-contrast-36 desktop:orderly-text-base"
              }
              placeholder={"Quantity"}
            />

            <Button
              variant={"text"}
              size={"small"}
              className="orderly-quantity-input-max orderly-font-semibold orderly-text-link orderly-px-2 orderly-min-w-[40px] orderly-text-3xs desktop:orderly-text-xs"
              disabled={!props.maxAmount}
              onClick={(event: any) => {
                props?.onValueChange?.({
                  value: parseNumber(props.maxAmount ?? 0, {
                    precision,
                  }),
                  token: props.token?.symbol ?? "",
                });
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              MAX
            </Button>
          </div>
          <Divider vertical />
          <TokenSelect
            tokens={props.tokens}
            token={props.token}
            fetchBalance={props.fetchBalance}
            onTokenChange={props.onTokenChange}
            disabled={disabled}
            onClosed={() => inputRef.current?.focus()}
          />
        </div>
        <div
          className={
            "orderly-flex orderly-items-center orderly-text-4xs orderly-justify-between orderly-px-2 orderly-py-1 orderly-text-base-contrast-36 desktop:orderly-text-3xs orderly-tabular-nums"
          }
        >
          <span>{`$${amount}`}</span>
          <div className="orderly-flex orderly-items-center orderly-space-x-2">
            <span>{`Available: ${
              parseNumber(props.maxAmount ?? 0, {
                precision,
                rule: "price",
              }) ?? "-"
            } ${props.token?.symbol ?? ""}`}</span>
            {props.balanceRevalidating && <Spinner size={"small"} />}
          </div>
        </div>
      </div>
      {props.hintMessage && (
        <div
          className={cn(
            "orderly-mt-2 orderly-text-4xs orderly-relative before:orderly-block orderly-pl-3 before:orderly-w-[4px] before:orderly-rounded-[4px] before:orderly-h-[4px] before:orderly-absolute before:orderly-left-0 before:orderly-top-1/2 before:orderly--translate-y-1/2",
            {
              "orderly-text-danger-light": props.status === "error",
              "orderly-before:bg-danger-light": props.status === "error",
              "orderly-text-warning": props.status === "warning",
            }
          )}
        >
          {props.hintMessage}
        </div>
      )}
    </>
  );
};
