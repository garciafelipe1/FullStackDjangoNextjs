import Navbar from "@/features/navbar";
import Footer from "@/features/footer";
interface pageProps {
    children: React.ReactNode
}



export default function Layout({ children }: pageProps) {
    return (
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    );
}