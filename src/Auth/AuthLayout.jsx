import React from 'react';
import logo from '../assets/brands/logo.png'
import authImage from '../assets/other/authImage.png'
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <Link to={'/'}>
                <div className='flex w-10/13 mx-auto py-5'>
                    <img className='w-12 h-12' src={logo} />
                    <h1 className='font-extrabold pt-6 -ml-6'>Profast</h1>
                </div>
            </Link>
            <div className='flex w-10/13 mx-auto'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authImage} />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;