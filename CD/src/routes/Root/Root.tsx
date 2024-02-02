import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";

const Root = () => {
    return (
        <>
            <main className="relative pb-8 mx-4">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Root;