import React from 'react';
import Navber from './Navber';
import { Outlet } from 'react-router';
import Footer from './Footer';

const Root = () => {
    return (
        <div className='bg-[#eaeced]'>
           <Navber></Navber>
           <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default Root;