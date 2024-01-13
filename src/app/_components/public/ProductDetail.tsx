'use client'

import React, {useState, useEffect} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import PageNavigation from '~/app/_components/widgets/PageNavigation'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import './swiper.css';
import {trpc} from "@/app/_trpc/client";
const ProductDetail = ({id}:string) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {data} = trpc.product.gets.useQuery();
    const [product, setProduct] = useState([]);

    useEffect(() => {
      if(typeof data != 'undefined'){
        const newData = Object.values(data).filter(user => user.id == id);
        setProduct(newData);
      }
    }, [])
    console.log(product)
    
  return (
    <div className='container mx-auto'>
        <PageNavigation/>
        
        <div>
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full"
      >
      
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
     
       
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
        {product.map((item,index)=>
         
          <SwiperSlide>
            <img src={item.image[0]} />
          </SwiperSlide>
          )}
        
      </Swiper>
        </div>
    </div>
  )
}

export default ProductDetail