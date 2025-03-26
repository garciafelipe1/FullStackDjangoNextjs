import AuthLinks from "../auth/AuthLinks";
import Image from "next/image";
import GuestLinks from "../guest/GuestLinks";
import Container from "./Container";
import Header from "./Header";
import NavbarLink from "./NavbarLink";
import RightMenuContainer from "./RightMenuContainer";

export default function DesktopNavbar() {
    
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
          </div>
          {/* middle side */}
          <div />

          {/* right side */}
          <RightMenuContainer>
            <AuthLinks />
            <GuestLinks />
          </RightMenuContainer>
        </Header>
      </Container>
    );
}