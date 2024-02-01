import React from 'react'
import ContactUs from '~/app/_components/ContactUs'
import AllProducts from "../../_components/public/AllProducts"
const Product = () => {
  return (
    <div>
      <AllProducts />
      <ContactUs isGoogleMap={false}/>
    </div>
  )
}

export default Product