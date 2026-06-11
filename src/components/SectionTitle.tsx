export function SectionTitle({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <h2 className="text-center font-bold tracking-wider text-lg md:text-xl my-8">
      {accent && <span className="text-primary mr-2">{accent}</span>}
      <span className="text-foreground">{children}</span>
    </h2>
  );
}