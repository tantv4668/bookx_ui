'use client';
import { FC } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "../utils/css";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent: FC<CollapsiblePrimitive.CollapsibleContentProps> = (
  props
) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      {...props}
      className={cn(
        props.className,
        "data-[state=open]:orderly-animate-collapsible-down data-[state=closed]:orderly-animate-collapsible-up orderly-overflow-hidden"
      )}
    ></CollapsiblePrimitive.CollapsibleContent>
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
