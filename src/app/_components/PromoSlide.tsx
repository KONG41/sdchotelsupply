'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '~/styles/home.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import promotion01 from '~/assets/promotion01.png';
import promotion02 from '~/assets/promotion02.png';
const PromoSlide = () => {
  return (
    <div className='w-full h-[600px]'>
      <Swiper
        slidesPerView={1.3}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        <SwiperSlide><Image src={promotion01} alt='promotion01' className='!object-contain'/></SwiperSlide>
        <SwiperSlide><Image src={promotion02} alt="promotion02" className='!object-contain'/></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default PromoSlide