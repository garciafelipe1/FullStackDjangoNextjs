import Navbar from "@/features/navbar";
import Footer from "@/features/footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducers";
import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { useEffect } from "react";
import { loadProfile, loadUser } from "@/redux/actions/auth/actions";
interface pageProps {
    children: React.ReactNode
}



export default function Layout({ children }: pageProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
      dispatch(loadProfile());
    }
  }, [dispatch, isAuthenticated]);

    return (
      <div>
        <Navbar />
        {children}
        <Footer />
      </div>
    );
}