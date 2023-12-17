import "./Root.css"
import { Outlet } from "react-router-dom";
import Footer from "@/components/organisms/Footer/Footer";
import Header from "@/components/organisms/Header/Header";

const Root = () => {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Root;