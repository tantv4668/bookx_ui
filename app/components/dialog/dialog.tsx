'use client';
import React, { FC, PropsWithChildren } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/css";
import { CloseIcon } from "../assets/icons/close";

const dialogVariants = cva(
  "orderly-fixed orderly-py-5 orderly-left-[50%] orderly-top-[50%] orderly-z-50 orderly-grid orderly-w-full orderly-max-w-[90%] orderly-translate-x-[-50%] orderly-translate-y-[-50%] orderly-bg-base-700 orderly-text-base-contrast orderly-shadow-lg orderly-duration-200 data-[state=open]:orderly-animate-in data-[state=closed]:orderly-animate-out data-[state=closed]:orderly-fade-out-0 data-[state=open]:orderly-fade-in-0 data-[state=closed]:orderly-zoom-out-95 data-[state=open]:orderly-zoom-in-95 data-[state=closed]:orderly-slide-out-to-left-1/2 data-[state=closed]:orderly-slide-out-to-top-[48%] data-[state=open]:orderly-slide-in-from-left-1/2 data-[state=open]:orderly-slide-in-from-top-[48%] orderly-rounded",
  {
    variants: {
      maxWidth: {
        xs: "orderly-max-w-[85%] desktop:orderly-max-w-[340px]",
        sm: "orderly-max-w-[85%] desktop:orderly-max-w-[440px]",
        lg: "orderly-max-w-[85%] desktop:orderly-max-w-[480px]",
        xl: "orderly-max-w-[85%] desktop:orderly-max-w-[540px]",
      },
    },
    defaultVariants: {
      maxWidth: "sm",
    },
  }
);

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  // @ts-ignore
  className,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  // @ts-ignore
  <DialogPrimitive.Portal className={cn(className)} {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "orderly-dialog-overlay",
      "orderly-fixed orderly-inset-0 orderly-z-50 orderly-bg-black/70 orderly-backdrop-blur-sm data-[state=open]:orderly-animate-in data-[state=closed]:orderly-animate-out data-[state=closed]:orderly-fade-out-0 data-[state=open]:orderly-fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    VariantProps<typeof dialogVariants> & {
      closable?: boolean;
      closeableSize?: number;
    }
>(
  (
    { children, closable, closeableSize = 20, className, maxWidth, ...props },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "orderly-dialog-content",
          dialogVariants({ maxWidth }),
          className
        )}
        {...props}
      >
        {children}
        {closable && (
          <DialogPrimitive.Close
            className={cn(
              "orderly-dialog-close",
              "orderly-absolute orderly-right-5 orderly-top-5 orderly-rounded-sm orderly-opacity-70 orderly-ring-offset-base-700 orderly-transition-opacity hover:orderly-opacity-100 focus:orderly-outline-none focus:orderly-ring-2 focus:orderly-ring-ring focus:orderly-ring-offset-2 disabled:orderly-pointer-events-none data-[state=open]:orderly-bg-accent data-[state=open]:orderly-text-muted-foreground"
            )}
          >
            <CloseIcon size={closeableSize} />
            <span className="orderly-sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
);

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "orderly-dialog-header",
      "orderly-px-5 orderly-pb-5 orderly-flex orderly-flex-col orderly-text-base orderly-relative after:orderly-content after:orderly-block after:orderly-absolute after:orderly-bottom-0 after:orderly-left-5 after:orderly-right-5 after:orderly-h-[1px] after:orderly-bg-base-contrast/10 after:orderly-mt-5",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "orderly-dialog-footer",
      "orderly-px-5 orderly-grid orderly-grid-cols-2 sm:orderly-flex sm:orderly-flex-row sm:orderly-justify-end orderly-gap-3",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "orderly-dialog-title",
      "orderly-text-xs orderly-leading-none desktop:orderly-text-xl",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "orderly-dialog-description",
      "orderly-text-3xs orderly-text-muted-foreground orderly-text-left",
      className
    )}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export interface DialogBodyProps {
  className?: string;
}

const DialogBody: FC<PropsWithChildren<DialogBodyProps>> = (props) => {
  const { children, className } = props;
  return (
    <div className={cn("orderly-dialog-body", "orderly-px-5", className)}>
      {children}
    </div>
  );
};

DialogBody.displayName = "DialogBody";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  // DialogContainer,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
