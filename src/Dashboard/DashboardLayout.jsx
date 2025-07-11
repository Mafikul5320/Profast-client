import React from 'react';
import { NavLink, Outlet } from 'react-router';
import logo from '../assets/brands/logo.png'
import { FaHome, FaBox, FaMoneyCheckAlt, FaSearchLocation, FaUserEdit } from 'react-icons/fa';

const DashboardLayout = () => {
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
                    <div className='flex mb-10'>
                        <img className='w-12 h-12' src={logo} />
                        <h1 className='font-extrabold pt-6 -ml-6'>Profast</h1>
                    </div>
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
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;