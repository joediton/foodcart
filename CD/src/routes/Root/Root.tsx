import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import useAuth from "@/hooks/useAuth";
import Header from "@/components/Header/Header";

const Root = () => {
    const { authed } = useAuth();

    return (
        <>
            {authed && <Header />}

            <main className="relative pt-[40px] pb-8 mx-4">
                <Outlet />
            </main>

            {authed && <Footer />}
        </>
    );
};

export default Root;