type SectionProps = {
  children?: React.ReactNode;
};

export default function Section({ children }: SectionProps) {
  return (
    <div>
      {children}
    </div>
  );
}
