"use client"
import { FC, ReactNode, useEffect, useRef } from "react";
import { Column } from "./col";
import { ColGroup } from "./colgroup";
import { TheadCol } from "./theadCol";
import { cn } from "../utils/css";

export interface THeadProps {
  columns: Column[];
  className?: string;
  containerClassName?: string;
  bordered?: boolean;
  justified?: boolean;
}

export const TableHeader: FC<THeadProps> = (props) => {
  return (
    <table
      className={cn(
        "orderly-ui-table-thead orderly-border-collapse orderly-w-full orderly-table-fixed orderly-sticky orderly-top-0 orderly-z-20",
        props.containerClassName
      )}
    >
      <ColGroup columns={props.columns} />
      <thead
        className={cn(
          "orderly-sticky orderly-top-0 orderly-z-0",
          props.className
        )}
      >
        <tr>
          {props.columns.map((column, index) => {
            return (
              <TheadCol
                col={column}
                record={undefined}
                key={index}
                index={index}
                className={props.className}
                bordered={props.bordered}
              />
            );
          })}
        </tr>
      </thead>
    </table>
  );
};
