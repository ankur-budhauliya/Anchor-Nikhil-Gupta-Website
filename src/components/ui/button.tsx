import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-burgundy/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        /* Primary Reference CTA: Book Me / Book Now */
        bookNow:
          "bg-burgundy text-white font-semibold tracking-wide hover:bg-burgundy-hover shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border border-burgundy/30 transition-all duration-200",
        burgundy:
          "bg-burgundy text-white font-semibold hover:bg-burgundy-hover shadow-sm transition-all duration-200",
        burgundyOutline:
          "border border-burgundy bg-white text-burgundy font-semibold hover:bg-burgundy/5 shadow-xs transition-all duration-200",
        gold:
          "bg-gold text-gold-foreground font-semibold hover:bg-gold-hover shadow-md transition-all duration-200",
        goldOutline:
          "border border-gold text-gold hover:bg-gold hover:text-gold-foreground font-medium tracking-wide uppercase transition-colors duration-200",
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20",
        link:
          "text-burgundy underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-4 py-2 text-sm",
        xs:
          "h-7 gap-1 rounded-md px-2.5 text-xs in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        sm:
          "h-8 gap-1.5 rounded-md px-3 text-xs in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        lg:
          "h-11 sm:h-12 gap-2.5 rounded-lg px-6 text-sm sm:text-base font-semibold",
        xl:
          "h-13 sm:h-14 gap-3 rounded-lg px-8 text-base font-bold tracking-wide",
        icon:
          "size-10 rounded-lg",
        "icon-sm":
          "size-8 rounded-md in-data-[slot=button-group]:rounded-lg",
        "icon-lg":
          "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ className?: string }>,
      {
        className: cn(
          buttonVariants({ variant, size }),
          (children.props as { className?: string })?.className,
          className
        ),
        ...props,
      }
    )
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
