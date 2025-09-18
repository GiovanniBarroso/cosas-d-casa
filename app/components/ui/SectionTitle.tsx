import clsx from "clsx";

type SectionTitleProps = {
  children: React.ReactNode;
  as?: "h2" | "h3" | "h4";
  variant?: "default" | "centered" | "underline";
  className?: string;
};

export default function SectionTitle({
  children,
  as: Tag = "h2",
  variant = "default",
  className,
}: SectionTitleProps) {
  const base = "font-bold text-gray-800 tracking-tight mb-6 sm:mb-8";

  const variants = {
    default: "text-2xl border-l-4 border-blue-500 pl-3",
    centered: "text-2xl text-center after:mt-2 after:block after:h-1 after:w-16 after:mx-auto after:bg-blue-500",
    underline: "text-2xl border-b-2 border-blue-500 pb-1",
  };

  return (
    <Tag className={clsx(base, variants[variant], className)}>
      {children}
    </Tag>
  );
}
