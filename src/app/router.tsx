import { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

interface ProtectedRoutesType {
    redirectTo: string;
}

const Login = lazy(async () => import("../pages/Login").then((m) => ({ default: m.Login })));
const DefaultLayout = lazy(async () => import("../layouts/DefaultLayout").then((m) => ({ default: m.DefaultLayout })));
const Dashboard = lazy(async () => import("../pages/Dashboard").then((m) => ({ default: m.Dashboard })));


export function MyRoutes() {

    function ProtectedRoutes({ redirectTo }: ProtectedRoutesType) {
        // const { userStore: { token } } = useStores();
        const token = true;

        return token ? <Outlet /> : <Navigate to={redirectTo} />;
    }

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path="/dashboard" element={<DefaultLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Route>

            <Route path="*" element={<h1>Page404</h1>} />
        </Routes>
    )
}