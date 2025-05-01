import AuthLinks from "../auth/AuthLinks";
import Image from "next/image";
import GuestLinks from "../guest/GuestLinks";
import Container from "./Container";
import Header from "./Header";
import NavbarLink from "./NavbarLink";
import RightMenuContainer from "./RightMenuContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";

export default function DesktopNavbar() {
    
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    
    return (
      <Container>
        <Header>
          {/* left side */}
          <div className="flex-items-center space-x-4 ">
            <NavbarLink useHover={false}>
              <Image
                className="h-12 w-auto"
                src="/assets/img/logos/F.png"
                width={512}
                height={512}
                priority
                alt="home"
              />
            </NavbarLink>
            <NavbarLink  href="/contact">Contact</NavbarLink>
            <NavbarLink  href="/blog">Blog</NavbarLink>
          </div>
          {/* middle side */}
          <div />

          {/* right side */}
          <RightMenuContainer>{isAuthenticated ?<AuthLinks /> :<GuestLinks />}</RightMenuContainer>
        </Header>
      </Container>
    );
}