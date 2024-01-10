import React from 'react'
import CoverPage from '~/app/_components/CoverPage'
import ContactUs from '~/app/_components/ContactUs'
import product_cv from '~/assets/product_cv.png'
import Image from 'next/image'
import product01 from '~/assets/product01.png'


import AllProducts from "../../_components/public/AllProducts"
const Product = () => {
 
  return (
    <div>
      <CoverPage src={product_cv} title="Products" navigation={true}/>
      <AllProducts />
      <ContactUs/>
    </div>
  )
}

export default Product