export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="max-w-md mx-auto flex flex-col gap-4">{children}</div>;
}
