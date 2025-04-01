import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
