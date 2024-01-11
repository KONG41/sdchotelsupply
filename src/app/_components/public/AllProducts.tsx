'use client'
import React from 'react'
import {Image} from "@nextui-org/react";
import { trpc } from '@/app/_trpc/client' 
import {imageURL} from "@/lib/utils"
import Link from 'next/link';
const AllProducts = () => {
  const { data , error ,isLoading}:any = trpc.product.gets.useQuery()
  return (
    <div className="container mx-auto">
    <div className='mx-[240px] mt-20 mb-40'>
      <h1 className='text-[39px] my-3 text-center'>All The Hotel Product You Need</h1>
      <div className='flex flex-row my-7'>
        {
          data && data.map((item,index)=>(
            <Link href={`/product/${item.id}`} className='w-1/4 p-5' key={item.name}>
              <Image src={item.image&&imageURL(item.image[0])} alt='product photo' className="w-full"/>
              <h1 className='text-center text-[18px] my-3'>{item.name}</h1>
            </Link>
          ))
        }
          
      </div>         
    </div>


  </div>
  )
}

export default AllProducts