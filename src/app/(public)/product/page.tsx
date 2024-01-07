import React from 'react'
import CoverPage from '~/app/_components/CoverPage'
import ContactUs from '~/app/_components/ContactUs'
import product_cv from '~/assets/product_cv.png'
import Image from 'next/image'
import product01 from '~/assets/product01.png'
const Product = () => {
  const productData = [
    {name:"Sleep Care",img: product01, cat:"home"},
    {name:"Sleep Care",img: product01, cat:"home"},
    {name:"Sleep Care",img: product01, cat:"home"},
    {name:"Sleep Care",img: product01, cat:"home"},
  ]
  return (
    <div>
      <CoverPage src={product_cv} title="Products" navigation={true}/>
      <div className="container mx-auto">
        <div className='mx-[240px] mt-20 mb-40'>
          <h1 className='text-[39px] my-3 text-center'>All The Hotel Product You Need</h1>
          <div className='flex flex-row my-7'>
            {
              productData.map((item,index)=>(
                <div className='w-1/4 p-5'>
                  <Image src={item.img} alt='product photo' key={item.name}/>
                  <h1 className='text-center text-[18px] my-3'>{item.name}</h1>
                </div>
              ))
            }
              
          </div>         
        </div>


      </div>
      <ContactUs/>
    </div>
  )
}

export default Product