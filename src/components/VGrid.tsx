interface ContainerProps {
  children: React.ReactNode;
}

export default function VGrid({ children }: ContainerProps) {
  return <div className="grid grid-rows-25">{children}</div>;
}
