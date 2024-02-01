import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
// import Header from "@/components/Header/Header";

const Root = () => {
    return (
        <>
            {/* <Header /> */}

            <main className="flex flex-col gap-[30px] items-start my-8 mx-4">
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default Root;