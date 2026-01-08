interface ContainerProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: ContainerProps) {
  return (
    <div className="bg-[#090c1b] p-5 rounded-2xl text-white relative">
      {children}
    </div>
  );
}
