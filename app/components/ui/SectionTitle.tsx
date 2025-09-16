type SectionTitleProps = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-l-4 border-blue-500 pl-3">
      {children}
    </h2>
  );
}
