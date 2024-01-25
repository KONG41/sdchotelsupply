'use client'
import React from 'react';
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
  console.log(data)
  return (
    <div className='w-full h-[430px]'>
      <Swiper
     
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
        className="w-full h-full swiper-custom-color-pagination"
      >
        {
          data && data?.filter( promote => promote.status === 'active').map((promoteItem,index) => 
            <SwiperSlide key={`slide_${index}`} ><Image fill={true}  src={`${promoteItem.image&&imageURL(promoteItem.image[0])}`} alt='promotion01' className='!object-contain'/></SwiperSlide>  
          )
        }
        
      </Swiper>
    </div>
  )
}

export default PromoSlide