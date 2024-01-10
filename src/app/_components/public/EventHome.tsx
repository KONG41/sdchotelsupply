'use client'
import React from 'react'
import {Image} from "@nextui-org/react";
import { trpc } from '@/app/_trpc/client';
import {imageURL} from "@/lib/utils"
interface dataType{
  status:string,
  name:string,
  image:any,
  id:any
}
const EventHome = () => {
  const {data}:any = trpc.event.gets.useQuery();
  const firstThreeElement = data && data.length >=3 ? data.slice(0,3) : []
  return (
    <div className="my-12 gap-7">
          <div className="flex flex-row">
            {
              data && firstThreeElement.map((item,index)=>(
                item.status == 'active' && 
                <div className="h-[400px] w-1/3 p-3" key={item.id}>
                  <Image src={item.image && imageURL(item.image[0])} alt="event01" className="h-[350px] w-full object-cover rounded-none" />
                  <h1 className="py-3 text-center text-[20px]">
                    {item.name}
                  </h1>
                </div>
              ))
            }
          </div>
        </div>
  )
}

export default EventHome