import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import CompanyMarquee from './CompanyMarquee';
import ParcelFeatures from './ParcelFeatures';
import Merchant from './Merchant';
import TestimonialSlider from './TestimonialSlider';

const HomeLayout = () => {
    return (
        <div>
           <Banner></Banner>
           <HowItWorks></HowItWorks>
           <OurServices></OurServices>
           <CompanyMarquee></CompanyMarquee>
           <ParcelFeatures></ParcelFeatures>
           <Merchant></Merchant>
           <TestimonialSlider></TestimonialSlider>
        </div>
    );
};

export default HomeLayout;