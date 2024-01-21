import React from 'react'
import ContactUs from '~/app/_components/ContactUs'
import AllProducts from "../../_components/public/AllProducts"
const Product = ({hotelproduct}:any) => {
  return (
    <div>
      <AllProducts />
      <ContactUs/>
    </div>
  )
}

export default Product