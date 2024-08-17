export default function CardCharacterContainer({
  children,
  width = '20rem',
  isSelected,
}: {
  children: React.ReactNode;
  width?: string;
  isSelected: boolean;
}) {
  const borderStyle = isSelected
    ? `card w-[${width}] border-2 border-success rounded-lg shadow-xl`
    : `card w-[${width}] border border-primary-content rounded-lg shadow-xl`;

  return <div className={borderStyle}>{children}</div>;
}
