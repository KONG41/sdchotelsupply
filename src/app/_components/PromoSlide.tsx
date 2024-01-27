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

interface PromotionType {
  status: string | null;
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
      description: string | null;
      price: number | null;
      popular: boolean | null;
      image: string | null;
      categoryId: number | null;
      category: {
          status: string | null;
          id: number;
          description: string | null;
          name: string;
          createdAt: string;
          updatedAt: string;
          parentId: number | null;
      } | null;// or whatever the correct type is
}

const PromoSlide = () => {
  const {data} = trpc.promotion.gets.useQuery()
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
          data && (data as PromotionType[]).map((item,index)=>
            item.status == 'active' && 
            <SwiperSlide key={`slide_${index}`} ><Image fill={true}  src={`${item.image&&imageURL(item.image[0])}`} alt='promotion01' className='!object-contain'/></SwiperSlide>
          )
        }
      </Swiper>
    </div>
  )
}

export default PromoSlide