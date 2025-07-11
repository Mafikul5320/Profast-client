import React, { use } from 'react';
import logo from '../assets/brands/logo.png'
import { MoveUpRight } from 'lucide-react';
import { GoArrowUpRight } from 'react-icons/go';
import { AuthContext } from '../context/AuthContext';
import { Link, NavLink } from 'react-router';

const Navber = () => {
    const { User, SignOut, SetUser } = use(AuthContext);
    const handelLogout = () => {
        SignOut().then(() => {
            console.log("user LogOut")
            SetUser(null)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <div className='w-10/13 mx-auto py-5'>
            <div className='bg-white p-3 px-5 flex justify-between items-center rounded-xl'>
                <div className='flex'>
                    <img className='w-12 h-12' src={logo} />
                    <h1 className='font-extrabold pt-6 -ml-6'>Profast</h1>
                </div>
                <div className='space-x-3'>
                    <NavLink>Services</NavLink>
                    {
                        User && <>
                            <NavLink to={"/Coverage"}>Coverage</NavLink>
                            <NavLink to={"/send parcel"}>Send Parcel</NavLink>
                            <NavLink to={"/BeARider"}>Be a Rider</NavLink>
                            <NavLink to={"/dashboard/myParcel"}>Dashboard</NavLink>
                        </>
                    }
                    <NavLink>About Us</NavLink>
                    <NavLink>Pricing</NavLink>
                </div>
                <div className='space-x-3'>
                    {
                        User ? <>
                        <div className='flex items-center space-x-3'>
                            <div>
                            <img className='h-12 w-12 rounded-full object-center' src={User?.photoURL} alt="" />
                        </div>
                        <button className='btn btn-primary' onClick={handelLogout}>Log Out</button> 
                        </div>
                        </>: <>
                            <Link to={'/login'}>
                                <button className='border border-gray-300 px-3 py-2 rounded-lg'>Sign In</button>
                            </Link>
                            <button className='bg-[#caeb66] font-semibold px-3 py-2 rounded-lg'>Be a rider</button>
                            <button className='bg-black -ml-3 font-semibold p-3 rounded-full text-[#caeb66]'><GoArrowUpRight size={19} /></button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navber;