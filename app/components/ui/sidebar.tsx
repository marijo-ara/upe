import React, { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { VariantProps } from './variant';
import { TooltipContent } from './tooltip';
import { cva } from './variant';


const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", props.className)}
    {...props}
  />
))

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ReactNode
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          sidebarMenuButtonVariants({ variant, size, className }),
          isActive && "bg-accent/10",
        )}
        {...props}
      >
        {typeof tooltip === 'string' ? (
          <TooltipContent>{tooltip}</TooltipContent>
        ) : (
          tooltip
        )}
        {/* rest of the component code */}
      </button>
    );
  }
)

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center justify-between space-x-2 px-4 py-2 text-left rounded-md transition-colors hover:bg-accent/10 focus:bg-accent/10",
        className
      )}
      {...props}
    >
      {/* rest of the component code */}
    </button>
  );
})

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "flex items-center justify-between space-x-2 px-4 py-2 text-left rounded-md transition-colors hover:bg-accent/10 focus:bg-accent/10",
        isActive && "bg-accent/10",
        className
      )}
      {...props}
    >
      {/* rest of the component code */}
    </a>
  );
})

const sidebarMenuButtonVariants = cva(
  "flex items-center justify-between space-x-2 px-4 py-2 text-left rounded-md transition-colors hover:bg-accent/10 focus:bg-accent/10",
  {
    variants: {
      variant: {
        default: "",
        active: "bg-accent/10",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export { SidebarGroupContent, SidebarMenuButton, SidebarMenuAction, SidebarMenuSubButton };

