
interface ContainerProps {
    children: React.ReactNode;
}




export default function Container({children}:ContainerProps) {
    return (
      <nav className="hidden max-w-full border-b border-black px-6 py-4 md:static md:block md:overflow-y-visible lg:px-8 dark:border-white">
        {children}
      </nav>
    );
}