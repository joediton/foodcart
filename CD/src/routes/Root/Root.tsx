import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";

const Root = () => {
    return (
        <>
            {/* <Header /> */}

            <main className="px-4 py-8">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Root;