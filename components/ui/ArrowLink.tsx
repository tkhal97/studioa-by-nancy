"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "right" | "left";

type Props = {
  href: string;
  children: ReactNode;
  direction?: Direction;
  /** lighter caption-style link (default). When false, uses display serif sized via `size`. */
  caption?: boolean;
  size?: string;
  className?: string;
};

/**
 * Editorial text link with a brass underline that draws on hover
 * and an extending line + arrow. Used across the site for inline
 * "Read the studio story" / "View the portfolio" affordances.
 */
export function ArrowLink({
  href,
  children,
  direction = "right",
  caption = true,
  size,
  className,
}: Props) {
  const isRight = direction === "right";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center text-ink",
        caption ? "text-caption" : "font-display",
        size,
        className,
      )}
    >
      {!isRight && <Arrow direction="left" />}
      <span className="relative inline-block">
        <span className="relative z-[1]">{children}</span>
        {/* base hairline */}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-1 h-px bg-ink/30"
        />
        {/* brass overlay hairline, drawing from origin on hover */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-700",
            isRight
              ? "origin-left group-hover:scale-x-100"
              : "origin-right group-hover:scale-x-100",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
          )}
        />
      </span>
      {isRight && <Arrow direction="right" />}
    </Link>
  );
}

function Arrow({ direction }: { direction: Direction }) {
  const isRight = direction === "right";
  return (
    <span
      aria-hidden
      className={cn(
        "relative ml-3 inline-flex h-[10px] w-[28px] items-center overflow-visible transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-[40px]",
        isRight ? "ml-3" : "mr-3 rotate-180",
      )}
    >
      <svg
        viewBox="0 0 40 10"
        fill="none"
        className="h-[10px] w-full text-ink transition-colors duration-500 group-hover:text-accent"
      >
        {/* shaft */}
        <line
          x1="0"
          y1="5"
          x2="40"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        {/* arrowhead */}
        <path
          d="M33 1l6 4-6 4"
          stroke="currentColor"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}
