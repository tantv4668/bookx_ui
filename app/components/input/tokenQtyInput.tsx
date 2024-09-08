
"use client";
import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";
import { Divider } from "../divider";
import { Decimal, commify } from "@orderly.network/utils";
import { API } from "@orderly.network/types";
import { Spinner } from "../spinner";
import { NetworkImage } from "../assets/icons/networkImage";
import { Input, InputProps } from ".";
import { InputMask } from "./inputMask";

export interface TokenQtyInputProps extends InputProps {
  token: Partial<API.TokenInfo>;

  amount?: string;
  fee: number;

  loading?: boolean;

  needCalc?: boolean;

  onTokenChange?: (token: string) => void;
  onValueChange?: (value: { value: string; token: string }) => void;
}

export const TokenQtyInput: FC<TokenQtyInputProps> = (props) => {
  const {
    onChange,
    onValueChange,
    onTokenChange,
    token,
    loading,
    needCalc = false,
    ...rest
  } = props;

  const amount = useMemo(() => {
    if (!props.amount) return "";
    const num = Number(props.amount);
    if (isNaN(num)) return "";
    if (num <= 0) return "";
    if (needCalc) {
      return commify(new Decimal(props.amount).sub(props.fee).toFixed(2));
    }
    return commify(new Decimal(props.amount).toFixed(2));
    // return commify(props.amount);
  }, [props.amount, props.fee, needCalc]);

  return (
    <Input
      {...rest}
      // onChange={_onChange}
      placeholder={"Quantity"}
      readOnly
      value={amount}
      prefix={
        loading ? (
          <Spinner size={"small"} className="orderly-mx-2" />
        ) : undefined
      }
      containerClassName="orderly-bg-base-500 orderly-rounded-borderRadius"
      className="orderly-token-quantity-input orderly-text-sm orderly-text-base-contrast-54 desktop:orderly-text-base"
      suffix={
        <InputMask className="orderly-flex-row orderly-items-center orderly-gap-2">
          <Divider vertical />
          <NetworkImage name={token.symbol} type={"token"} size={"small"} />
          <span className="orderly-text-base-contrast-80 orderly-text-3xs  desktop:orderly-text-xs">
            {token.symbol}
          </span>
        </InputMask>
      }
    />
  );
};
