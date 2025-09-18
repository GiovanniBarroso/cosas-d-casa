"use client";

import clsx from "clsx";
import Link from "next/link";
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

type ButtonProps =
  | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement>)
  | (BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

export default function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className,
  disabled,
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants: Record<Variant, string> = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus-visible:ring-gray-400",
    whatsapp: "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300",
  };

  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  // Caso Link interno
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {iconLeft && <span>{iconLeft}</span>}
        {children}
        {iconRight && <span>{iconRight}</span>}
      </Link>
    );
  }

  // Caso enlace externo
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {iconLeft && <span>{iconLeft}</span>}
        {children}
        {iconRight && <span>{iconRight}</span>}
      </a>
    );
  }

  // Caso botón normal
  return (
    <button className={classes} disabled={disabled} {...props}>
      {iconLeft && <span>{iconLeft}</span>}
      {children}
      {iconRight && <span>{iconRight}</span>}
    </button>
  );
}
