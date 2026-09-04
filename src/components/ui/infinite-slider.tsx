import * as React from "react";
import { cn } from "@/lib/utils";

interface InfiniteSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  speed?: number;
  direction?: "left" | "right";
  children: React.ReactNode;
}

export function InfiniteSlider({
  children,
  gap = 48,
  speed = 30,
  direction = "left",
  className,
  ...props
}: InfiniteSliderProps) {
  return (
    <div
      className={cn("flex overflow-hidden", className)}
      style={
        {
          "--gap": `${gap}px`,
          "--speed": `${speed}s`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around",
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        )}
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center justify-around",
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        )}
        style={{ gap: `${gap}px`, marginLeft: `${gap}px` }}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
}
