import React from 'react'
import map from '~/assets/google_map.png'
import Link from 'next/link'
const ImgMap = () => {
  return (
    <Link href='https://maps.app.goo.gl/mUK9jHQKeByMZN2i8' target="_blank" className='w-full h-[200px] bg-slate-400'>
        <img src={map.src} className='object-cover w-full h-full'/>
    </Link>
  )     
}

export default ImgMap