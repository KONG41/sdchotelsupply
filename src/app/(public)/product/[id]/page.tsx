import React from 'react'
import ContactUs from '~/app/_components/ContactUs'
import ProductDetail from '~/app/_components/public/ProductDetail'
const Detail = ({params}:{params:{id:string}}) => {
  return (
    <div>
        <ProductDetail id={Number(params.id)}/>
        <ContactUs/>
    </div>
  )
}

export default Detail
