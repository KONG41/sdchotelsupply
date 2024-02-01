import React from 'react'
import Image from 'next/image'
// eslint-disable-next-line
const Qr = ({qr}:any) => {
  return (
    <Image 
        src={qr}
        width={67}
        height={67}
        alt="Picture of the author"
    />
  )
}

export default Qr