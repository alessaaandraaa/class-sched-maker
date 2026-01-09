interface ContainerProps {
  children: React.ReactNode;
  background_color: string;
}

export default function Wrapper({
  children,
  background_color,
}: ContainerProps) {
  return (
    <div
      className="p-5 rounded-2xl text-white relative"
      style={{ backgroundColor: background_color }}
    >
      {children}
    </div>
  );
}
