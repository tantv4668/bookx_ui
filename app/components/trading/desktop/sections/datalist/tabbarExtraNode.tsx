"use client"
import { FC, useCallback, useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { useSessionStorage } from "@orderly.network/hooks";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DecimalPrecisionCheckbox, DecimalPrecisionType } from "./decimalPrecisionCheckBox";
import { UnPnlPriceBasisCheckBox, UnPnlPriceBasisType } from "./unPnlPriceBasisCheckBox";
import { SettingsIcon } from "@/app/components/assets/icons/settings";
import { Divider } from "@/app/components/divider";
import { useTabContext } from "@orderly.network/react/esm/tab/tabContext";
import { Label } from "@/app/components/label";
import { Checkbox } from "@/app/components/checkbox";


export interface TabBarExtraNodeProps {
  decimalPrecision: any;
  setDecimalPrecision: any;
  unPnlPriceBasis: any;
  setUnPnlPriceBasic: any;
}

export const TabBarExtraNode: FC<TabBarExtraNodeProps> = (props) => {
  const [showAllSymbol, setShowAllSymbol] = useSessionStorage(
    "showAllSymbol_position",
    true
  );

  const { updateData } = useTabContext();

  // const [symbol, setSymbol] = useState(() =>
  //   showAllSymbol ? "" : context.symbol
  // );

  const onShowAllSymbolChange = (isAll: boolean) => {
    // setSymbol(isAll ? "" : context.symbol);
    setShowAllSymbol(isAll);
    updateData("showAllSymbol", isAll);
  };

  useEffect(() => updateData("showAllSymbol", showAllSymbol), []);

  // const onChecked = (checked: boolean) => {
  //   console.log(checked);
  // };
  return (
    <div className={"orderly-flex orderly-items-center orderly-gap-2"}>
      <div className={"orderly-flex orderly-items-center orderly-gap-2"}>
        <Checkbox
          id={"showAll"}
          checked={showAllSymbol}
          onCheckedChange={onShowAllSymbolChange}
        />
        <Label
          htmlFor={"showAll"}
          className="orderly-text-base-contrast-54 orderly-text-3xs"
        >
          Show all instruments
        </Label>
      </div>
      <SettingIcon {...props}/>
    </div>
  );
};


const SettingIcon: FC<TabBarExtraNodeProps> = (props) => {
  const [open, setOpen] = useState(false);


  const { updateData } = useTabContext();

  const onDecimalPrecisionChanged = useCallback((type: DecimalPrecisionType) => {
    var value: number = 0;
    switch (type) {
      case DecimalPrecisionType.ZERO:
        value = 0;
        break;
      case DecimalPrecisionType.ONE:
        value = 1;
        break;
      case DecimalPrecisionType.TWO:
        value = 2;
        break;
    }
    updateData("pnlNotionalDecimalPrecision", value);
    props.setDecimalPrecision(type);
  }, [props.decimalPrecision]);


  const onUnPnlPriceBasisChanged = useCallback((type: UnPnlPriceBasisType) => {
    var value: number = 0;
    switch (type) {
      case UnPnlPriceBasisType.MARKET_PRICE:
        value = 0;
        break;
      case UnPnlPriceBasisType.LAST_PRICE:
        value = 1;
        break;
    }
    updateData("unPnlPriceBasis", value);
    props.setUnPnlPriceBasic(type);
  }, [props.unPnlPriceBasis]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <button className={"orderly-pb-[1px] orderly-h-[48px] orderly-text-base-contrast-80 orderly-cursor-pointer orderly-fill-base-contrast-54 hover:orderly-fill-base-contrast"}>
          {/* <Settings size={18} /> */}
          <SettingsIcon fill="currnet" fillOpacity={1}/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="orderly-bg-base-800 orderly-rounded orderly-rounded-borderRadius orderly-w-[280px] orderly-p-4 orderly-rounded-borderRadius orderly-shadow-[0px_12px_20px_0px_rgba(0,0,0,0.25)] orderly-z-40"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="orderly-flex orderly-flex-col orderly-text-3xs">
          <span className="orderly-text-xs orderly-pb-3">Portfolio Settings</span>
          <Divider />
          <span className="orderly-pb-3 orderly-text-base-contrast-54 orderly-mt-2">Decimal Precision for PnL & Notional</span>
          <DecimalPrecisionCheckbox value={props.decimalPrecision} onValueChange={onDecimalPrecisionChanged} />
          <Divider className="orderly-my-3" />
          <span className="orderly-pb-3 orderly-text-base-contrast-54 orderly-mt-2">Unrealized PnL Price Basis</span>
          <UnPnlPriceBasisCheckBox value={props.unPnlPriceBasis} onValueChange={onUnPnlPriceBasisChanged} />
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
