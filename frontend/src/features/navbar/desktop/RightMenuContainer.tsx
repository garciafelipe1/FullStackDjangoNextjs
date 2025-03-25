export default function RightMenuContainer({ children }: { children: React.ReactNode }) {
  return <nav className="flex items-center justify-end space-x-5">{children}</nav>;
}
