import HoverClass from "@/styles/HoverClass";
import Link from "next/link";
import { use } from "react";

interface componentProps {
    children: React.ReactNode;
    href?: string
    useHover?: boolean
}
export default function NavbarLink({ children, href = '/', useHover=true }: componentProps) {
  return (
    <Link href={href} className="inline-flex items-center">
      <div className={`${useHover? HoverClass :""}`}> 
        {children}

      </div>
    </Link>
  );
}

NavbarLink.defaultProps = {
  href: "/",
  useHover: true
};
