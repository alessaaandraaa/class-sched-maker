interface ContainerProps {
  children: React.ReactNode;
  columns: 1 | 6 | 7;
}

const columnMap = {
  1: "grid-cols-1",
  6: "grid-cols-6",
  7: "grid-cols-7",
};

export default function HGrid({ children, columns }: ContainerProps) {
  return <div className={`grid ${columnMap[columns]} gap-2 `}>{children}</div>;
}
