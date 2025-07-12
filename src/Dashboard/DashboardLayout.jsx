import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import logo from '../assets/brands/logo.png'
import { FaHome, FaBox, FaMoneyCheckAlt, FaSearchLocation, FaUserEdit, FaMotorcycle, FaClock } from 'react-icons/fa';
import { UserPen } from 'lucide-react';
import useAdminFind from '../Hooks/useAdminFind';

const DashboardLayout = () => {
    const { user, isLoading } = useAdminFind();
    console.log(user?.role);
    console.log(user);
    console.log(isLoading);
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                </div>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <Link to={'/'}>
                        <div className='flex mb-10'>
                            <img className='w-12 h-12' src={logo} />
                            <h1 className='font-extrabold pt-6 -ml-6'>Profast</h1>
                        </div>
                    </Link>
                    <li>
                        <NavLink to="/dashboard" className="flex items-center gap-2">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcel" className="flex items-center gap-2">
                            <FaBox /> My Parsel
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/payment-history" className="flex items-center gap-2">
                            <FaMoneyCheckAlt /> Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track" className="flex items-center gap-2">
                            <FaSearchLocation /> Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/update-profile" className="flex items-center gap-2">
                            <FaUserEdit /> Update Profile
                        </NavLink>
                    </li>
                    {
                        !isLoading && user?.role === "admin" && <>
                            <li>
                                <NavLink to="/dashboard/active-rider" className="flex items-center gap-2 text-green-600">
                                    <FaMotorcycle /> Active Rider
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/admin-make" className="flex items-center gap-2 ">
                                    <UserPen size={18} />  Admin Make
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;