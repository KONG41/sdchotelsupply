import Link from "next/link";
import home_hero from "~/assets/home_hero.png";
import Image from "next/image";
import home_product from "~/assets/home_product.png";
import hotel_product from "~/assets/hotel_product.png"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '~/styles/home.css'
import { Pagination, Navigation } from 'swiper/modules';
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
        <div className="w-full h-[700px] bg-slate-700 relative">
          <Image src={home_hero} alt="home hero" className="w-full h-full"/>
          <div className="absolute bottom-0 w-4/6 h-[50%] text-white flex flex-col pl-[65px]">
            <h1 className="text-[36px]">SDC Hotel Supply was established in 2008.Until now SDC work closely with all 5 stars hotels in Cambodia.</h1>
            <p className="text-[24px]">Office Hour : ( Monday - Friday : 8:00Am - 5:00Pm | Sat : 8:00Am - 12:00Pm )</p>
          </div>
        </div>

        <div className="container mx-auto py-24">
          <h1 className="text-center text-[39px]">Products</h1>
          <div className="flex flex-row justify-center mt-12 gap-7">
            <div className="h-[470px] w-5/12 bg-gray-400 relative group">
              <Image src={hotel_product} alt="hotel_product" className="w-full h-full"/>
              <div className="absolute w-full h-full z-10 top-0 flex flex-col gap-3 justify-center items-center text-white group-hover:bg-[#00000024]">
                <p className="mt-[175px] text-[23px]">Hotel Products</p>
                <Link href="#" className="hidden group-hover:block underline">Read More</Link>
              </div>
            </div>
            <div className="h-[470px] w-5/12 bg-gray-400 relative group">
              <Image src={home_product} alt="hotel_product" className="w-full h-full"/>
              <div className="absolute w-full h-full z-10 top-0 flex flex-col gap-3 justify-center items-center text-white group-hover:bg-[#00000024]">
                <p className="mt-[175px] text-[23px]">Home Products</p>
                <Link href="#" className="hidden group-hover:block underline">Read More</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-24">
          <h1 className="text-center text-[39px]">Promotion</h1>
          <div className="flex flex-row justify-center mt-12 gap-7">
          <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
          </div>
        </div>

    </main>
  );
}
