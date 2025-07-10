import React from 'react';
import location from '../assets/other/location-merchant.png'

const Merchant = () => {
    return (
        <div data-aos="zoom-in-up" className='w-10/13 mx-auto my-5'>
            <div className='bg-[#03373D] bg-[url(assets/other/be-a-merchant-bg.png)] bg-no-repeat px-12 rounded-2xl py-8 flex items-center'>
                <div>
                    <h1 className='text-white font-bold text-2xl'>Merchant and Customer Satisfaction  is Our First <br /> Priority</h1>
                    <p className='text-sm py-4 text-white/70'>We offer the lowest delivery charge with the highest br value along with 100% safety of your product. <br /> Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    <div className='flex items-center space-x-4'>
                        <button className='bg-[#CAEB66] py-2 px-3 font-semibold rounded-full'>Become a Merchant</button>
                        <button className='text-[#CAEB66] py-2 px-3 border-1 rounded-full border-[#CAEB66]'>Earn with Profast Courier</button>
                    </div>
                </div>
                <div>
                    <img src={location} />
                </div>
            </div>
        </div>
    );
};

export default Merchant;