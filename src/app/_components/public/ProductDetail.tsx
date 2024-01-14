'use client'

import React, {useState, useEffect} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Breadcrumb from '../widgets/Breadcrumb';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './swiper.css';
import {trpc} from "@/app/_trpc/client";
import {imageURL} from "@/lib/utils"
const ProductDetail = ({id}:any) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {data} = trpc.product.gets.useQuery();
    const [product, setProduct] = useState([]);
    const [productPhoto,setProductPhoto] = useState([])
    useEffect(() => {
      if(typeof data != 'undefined'){
        const newData = data.filter(user => user.id == id);
        setProduct(newData[0]);
        setProductPhoto(newData[0].image);
      }
    }, [])
    console.log('product',product);
    console.log('image',productPhoto);
   
  return (
    <div className='container max-w-[1268px] mx-auto'>
        {/* <div className='container max-w-[820px] mx-auto my-7'>
          <Breadcrumb/>
        </div> */}
        <div className='p-7 bg-slate-50 my-7 container max-w-[820px] mx-auto'>
            <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-[350px]"
          >
            {
                productPhoto && productPhoto.map((item,index)=>(
                   <SwiperSlide>
                      <img src={item && imageURL(item)} />
                    </SwiperSlide>
                ))
            }
  
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
           {
                productPhoto && productPhoto.map((item,index)=>(
                   <SwiperSlide>
                      <img src={item && imageURL(item)} />
                    </SwiperSlide>
                ))
            }
          </Swiper>
          <h1 className='text-xl py-3 font-bold'>{product.name}</h1>
          <p className='border-t py-7' dangerouslySetInnerHTML={{
                      __html:(product && product.description) as string,
                    }} />
        </div>
    </div>
  )
}

export default ProductDetail