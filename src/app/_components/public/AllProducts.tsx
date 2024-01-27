'use client'
import React,{useState, useEffect} from 'react'
import { trpc } from '@/app/_trpc/client' 
import {imageURL} from "@/lib/utils"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import getCategory from '~/lib/getCategory';
import product_cv from '~/assets/product_cv.png'
import CoverPage from '../CoverPage';
import LoadingAnimation from '../widgets/LoadingAnimation';
const AllProducts = () => {
  const { data:productData} = trpc.product.gets.useQuery()
  const [catQuery, setCatQuery] = useState<string |null >()
  const searchParams = useSearchParams()
  const cat = searchParams.get('cat')
  const productByCat = productData && productData.filter(x => x.categoryId === Number(cat))
  const catName = getCategory(Number(cat))
  useEffect(()=>{
    setCatQuery(cat)
  },[searchParams])
  return (
    <>
    <CoverPage src={product_cv.src} title={catName?.name ?? ""} navigation={false}/>
    <div className="container sm:mx-w-[1268px] w-[90%] mx-auto">
      <div className=' mt-20 mb-40'>
        <h1 className='md:text-[39px] text-[29px] text- my-3 text-center'>All The {catName && catName.name} You Need</h1>
        <div className='flex flex-wrap justify-center'>
          {
            productByCat ? productByCat.map((item)=>(
              <Link href={`/product/${item.id}`} className='max-w-[320px] p-5' key={item.name}>
                <img src={imageURL(JSON.parse(item.image??"[]")[0]??"")} alt='product photo' className=" w-full rounded-none h-[176px] object-cover"/>
                <h1 className='text-center text-[18px] my-3'>{item.name}</h1>
              </Link>
            )) : <LoadingAnimation/>
          }
            
        </div>         
      </div>


    </div>
    </>
    
  )
}

export default AllProducts