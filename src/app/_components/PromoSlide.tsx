'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '~/styles/home.css';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import {imageURL} from "@/lib/utils"
import { trpc } from '../_trpc/client';
const PromoSlide = () => {
  const {data} = trpc.promotion.gets.useQuery()
  return (
    <div className='w-full h-[430px]'>
      <Swiper
      style={{
        '--swiper-navigation-color': '#2e2e2e7f',
        '--swiper-pagination-color': '#fff',
      }}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {
          data && data.map((item,index)=>
            item.status == 'active' && 
            <SwiperSlide ><Image fill={true}  src={item.image&&imageURL(item.image[0])} alt='promotion01' className='!object-contain'/></SwiperSlide>
          )
        }
      </Swiper>
    </div>
  )
}

export default PromoSlide