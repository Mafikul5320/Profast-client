import { createBrowserRouter } from "react-router";
import Root from "../Home/Root";
import HomeLayout from "../Home/HomeLayout";
import AuthLayout from "../Auth/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PrivateRouter from "../context/PrivateRouter";
import Coverage from "../Pages/Coverage";
import AddParcel from "../Pages/AddParcel";
import DashboardLayout from "../Dashboard/DashboardLayout";
import MyParcel from "../Pages/MyParcel";
import Payment from "../Dashboard/Payment/Payment";
import PaymentHistory from "../Dashboard/Payment/PaymentHistory";
import RiderRegistrationForm from "../Pages/RiderRegistrationForm";
import ActiveRider from "../Dashboard/Rider/ActiveRider";
import PendingRider from "../Dashboard/Rider/PendingRider";
import MakeAdmin from "../Dashboard/Admin/MakeAdmin";
import ForbiddenPage from "../Pages/ForbiddenPage";
import AdminRouter from "../context/AdminRouter";
import RiderAssign from "../Dashboard/Rider/RiderAssign";

export const Router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                path: '/',
                Component: HomeLayout
            },
            {
                path: "/Coverage",
                loader: () => fetch('./warehouses.json'),
                element: <PrivateRouter>
                    <Coverage></Coverage>
                </PrivateRouter>
            },
            {
                path: "/send parcel",
                loader: () => fetch('./warehouses.json'),
                element: <PrivateRouter>
                    <AddParcel></AddParcel>
                </PrivateRouter>
            },
            {
                path: "/BeARider",
                loader: () => fetch('./warehouses.json'),
                element: <PrivateRouter>
                    <RiderRegistrationForm></RiderRegistrationForm>
                </PrivateRouter>
            },
            {
                path: "/forbidden",
                Component: ForbiddenPage
            }
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRouter>
            <DashboardLayout></DashboardLayout>
        </PrivateRouter>,
        children: [
            {
                path: "/dashboard/myParcel",
                Component: MyParcel
            },
            {
                path: '/dashboard/:id',
                Component: Payment
            },
            {
                path: "/dashboard/payment-history",
                Component: PaymentHistory
            },
            {
                path: "/dashboard/active-rider",
                element: <AdminRouter>
                    <ActiveRider></ActiveRider>
                </AdminRouter>
            },
            {
                path: "/dashboard/pending-rider",
                element: <AdminRouter>
                    <PendingRider></PendingRider>
                </AdminRouter>
            },
            {
                path: "/dashboard/admin-make",
                // Component: MakeAdmin,
                element: <AdminRouter>
                    <MakeAdmin></MakeAdmin>
                </AdminRouter>
            },
            {
                path: "/dashboard/rider-assign",
                element: <RiderAssign></RiderAssign>
            }
        ]
    }
])