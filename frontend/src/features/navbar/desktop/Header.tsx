export default function Header({ children }: {children: React.ReactNode}) {
  return (
    <nav className="relative mx-auto flex max-w-7xl items-center justify-between dark:dark-border-dark dark:text-dark-txt">
      {children}
    </nav>
  );
}
