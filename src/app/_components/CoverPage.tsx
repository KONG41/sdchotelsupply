import React from 'react'
import { StaticImageData } from 'next/image';
import { IoIosArrowForward } from "react-icons/io";
interface cover{
    src:string | StaticImageData;
    title: string;
    navigation:boolean;
}

const CoverPage = ({src,title,navigation}:cover) => {
  return (
    <div className='w-full h-[365px] relative'>
        <img src={`${src??"/"}`} alt='about us cover image' className='w-full h-full object-cover'/>
        <div className='absolute top-0 w-full h-full flex flex-col justify-center items-center text-white'>
            <h1 className='sm:text-[65px] text-[55px] font-bold text-center'>{title}</h1>
            {navigation&&
                <div className='text-[16px]'><span>Menu</span><IoIosArrowForward className='inline-block mx-3'/><span className='font-bold'>Submenu</span></div>
            }
        </div>
    </div>
  )
}

export default CoverPage