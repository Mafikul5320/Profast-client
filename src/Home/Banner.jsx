import React from 'react';
import Bannner1 from '../assets/banner/banner1.png'
import Bannner2 from '../assets/banner/banner2.png'
import Bannner3 from '../assets/banner/banner3.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const Banner = () => {
    const Banner = [Bannner1, Bannner2, Bannner3]
    return (
        <div className='w-10/13 mx-auto'>
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                loop={true}
                pagination={{ clickable: true }}
                className="w-full h-[200px] sm:h-[300px] md:h-[650px]"
            >
                {
                    Banner.map((oneBanner, index) => <SwiperSlide key={index}>
                        <img src={oneBanner} />
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Banner;