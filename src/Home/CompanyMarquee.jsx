import React from 'react';
import Marquee from 'react-fast-marquee';
import brand1 from '../assets/brands/amazon.png'
import brand2 from '../assets/brands/amazon_vector.png'
import brand3 from '../assets/brands/casio.png'
import brand4 from '../assets/brands/moonstar.png'
import brand5 from '../assets/brands/randstad.png'
import brand6 from '../assets/brands/start-people 1.png'
import brand7 from '../assets/brands/start.png'

const CompanyMarquee = () => {
    const brand = [brand1, brand2, brand3, brand4, brand5, brand6, brand7]
    return (
        <div className='py-5 border-b-1 border-teal-800 border-dashed w-10/13 mx-auto'>
            <h1 className='text-teal-900 text-center font-bold text-2xl'>We've helped thousands of sales teams</h1>
            <Marquee
                speed={70}
                direction="right"
                pauseOnHover={true}
                gradient={true}
            >
                {
                    brand.map((onebrand, index) => (
                        <img
                            className="mx-18 my-17  h-[24px] object-cover rounded-lg"
                            key={index} src={onebrand} />
                    ))
                }
            </Marquee>
        </div>
    );
};

export default CompanyMarquee;