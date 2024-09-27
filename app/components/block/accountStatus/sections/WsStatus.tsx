'use client';
import { cn } from "@/app/components/utils/css";
import React from "react";

export const WsStatus: React.FC = () => {
  return (
    <div
      className={cn(
        "orderly-bg-warning-darken orderly-text-warning orderly-text-3xs orderly-font-semibold orderly-leading-[18px]",
        "orderly-fixed orderly-left-0 orderly-right-0 orderly-z-[30]",
        "orderly-flex orderly-items-center orderly-bottom-[64px] orderly-p-[10px]",
        "desktop:orderly-flex desktop:orderly-items-center desktop:orderly-justify-center desktop:orderly-static desktop:orderly-h-[40px] desktop:orderly-text-sm desktop:orderly-bottom-0"
      )}
    >
      <div>
        Account balance could not be retrieved due to weak signal. Please
        connect to stronger Wi-Fi.{" "}
        {/* <a
          className="orderly-text-link-light"
          target="_blank"
        >-
          View FAQs
        </a> */}
      </div>
    </div>
  );
};
