'use client'
import React from 'react'
import {Image} from "@nextui-org/react";
import { trpc } from '@/app/_trpc/client'
import {imageURL} from "@/lib/utils"
const AllProducts = () => {
    const {data} = trpc.product.gets.useQuery();
    console.log(data)
  return (
    <div className="container mx-auto">
    <div className='mx-[240px] mt-20 mb-40'>
      <h1 className='text-[39px] my-3 text-center'>All The Hotel Product You Need</h1>
      <div className='flex flex-row my-7'>
        {
          data && data.map((item,index)=>(
            <div className='w-1/4 p-5' key={item.name}>
              <Image src={item.image&&imageURL(item.image[0])} alt='product photo' className="w-full"/>
              <h1 className='text-center text-[18px] my-3'>{item.name}</h1>
            </div>
          ))
        }
          
      </div>         
    </div>


  </div>
  )
}

export default AllProducts