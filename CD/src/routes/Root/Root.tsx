import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const Root = () => {
    return (
        <>
            <Header />

            <main className="py-8 px-4">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Root;