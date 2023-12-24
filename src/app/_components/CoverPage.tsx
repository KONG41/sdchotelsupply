import React from 'react'
import Image from 'next/image';
import { IoIosArrowForward } from "react-icons/io";
interface cover{
    src:any;
    title: string;
    navigation:boolean;
}

const CoverPage = ({src,title,navigation}:cover) => {
  return (
    <div className='w-full h-[528px] relative'>
        <Image src={src} alt='about us cover image' className='w-full'/>
        <div className='absolute top-0 w-full h-full flex flex-col justify-center items-center text-white'>
            <h1 className='text-[65px] font-bold'>{title}</h1>
            {navigation&&
                <div className='text-[16px]'><span>Menu</span><IoIosArrowForward className='inline-block mx-3'/><span className='font-bold'>Submenu</span></div>
            }
        </div>
    </div>
  )
}

export default CoverPage