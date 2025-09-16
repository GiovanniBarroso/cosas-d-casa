"use client";

import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "whatsapp";
  href?: string;
};

export default function Button({
  children,
  variant = "primary",
  href,
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-semibold shadow-md transition block text-center";

  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    whatsapp: "bg-green-500 hover:bg-green-600 text-white",
  };

  if (href) {
    return (
      <a href={href} className={clsx(base, variants[variant])}>
        {children}
      </a>
    );
  }

  return <button className={clsx(base, variants[variant])}>{children}</button>;
}
