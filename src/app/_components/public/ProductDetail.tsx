'use client'

import React, {useState, useEffect} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './swiper.css';
import {trpc} from "@/app/_trpc/client";
import {imageURL} from "@/lib/utils"
const ProductDetail = ({id}:{id:number}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState();
    const {data} = trpc.product.get.useQuery({id});
   
  return (
    <div className='container max-w-[1268px] mx-auto'>
        {/* <div className='container max-w-[820px] mx-auto my-7'>
          <Breadcrumb/>
        </div> */}
        <div className='p-7 bg-slate-50 my-7 container max-w-[820px] mx-auto'>
            <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-[350px]"
          >
            {
                JSON.parse(data?.image??"[]")?.map((item:string)=>(
                   <SwiperSlide key={item}>
                      <img src={item && imageURL(item)} />
                    </SwiperSlide>
                ))
            }
  
          </Swiper>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
           {
                JSON.parse(data?.image??"[]")?.map((item:string,index:number)=>(
                   <SwiperSlide key={`photo_${index}`}>
                      <img src={item && imageURL(item)} />
                    </SwiperSlide>
                ))
            }
          </Swiper>
          <h1 className='text-xl py-3 font-bold'>{data?.name}</h1>
          <p className='border-t py-7' dangerouslySetInnerHTML={{
                      __html:data?.description ??  "",
                    }} />
        </div>
    </div>
  )
}

export default ProductDetail