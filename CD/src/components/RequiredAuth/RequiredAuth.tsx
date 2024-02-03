import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

function RequireAuth({ component }: { component: React.ReactNode }) {
    const { authed } = useAuth();
    const location = useLocation();

    return authed === true
        ? component
        : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

export default RequireAuth;