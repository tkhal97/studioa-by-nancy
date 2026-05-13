"use client";

import { forwardRef, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "mark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-3 font-sans uppercase tracking-[0.18em] text-[0.72rem] rounded-full transition-[color,background,border,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform select-none";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
  lg: "px-9 py-4",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas hover:bg-obsidian active:scale-[0.98] border border-ink",
  ghost:
    "bg-transparent text-ink hover:text-clay border border-transparent hover:border-stone/60",
  outline:
    "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-canvas",
  mark:
    "bg-canvas/70 text-ink border border-stone/60 backdrop-blur-md hover:bg-canvas",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", arrow, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  );
});

export function LinkButton({
  variant = "primary",
  size = "md",
  arrow,
  className,
  children,
  href,
  ...rest
}: AnchorProps) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, sizes[size], variants[variant], className)}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        <span>{children}</span>
        {arrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      className="-mr-1 translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
    >
      <path
        d="M1 5h16M12 1l5 4-5 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
