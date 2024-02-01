'use client'
import React from 'react'
import { trpc } from '@/app/_trpc/client';
import {imageURL} from "@/lib/utils"

const Client = () => {
    const {data} = trpc.clientRoute.gets.useQuery();
  return (
    <div className="mt-12 gap-7">
          <div className="flex flex-row flex-wrap justify-evenly">
            {
                data && data.map((item,index)=>(
                    <div className="mb-3 w-[240px] border border-gray-200 p-3" key={`client_${index}`}>
                    <img
                        src={imageURL(JSON.parse(item.image??"[]")[0])??""}
                        alt="client01"
                        className="h-[198px] w-full object-cover rounded-none"
                    />
                    <div className=" text-center">
                        <p className="py-1 text-[20px]">{item.year}</p>
                        <p className="py-1 text-[15px] text-gray-500">
                        {item.name}
                        </p>
                    </div>
                    </div>
                ))
            }
          
          </div>
        </div>
  )
}

export default Client