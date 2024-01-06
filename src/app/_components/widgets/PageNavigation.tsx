'use client'
import React from 'react'
import { FaChevronRight } from "react-icons/fa";
import { Link } from '@nextui-org/react';
const PageNavigation = () => {
    const navTo = <FaChevronRight className='ml-2'/>
  return (
    <div className='flex flex-row items-center gap-2 capitalize'>
      <Link href='#' className='text-gray-600'>Home{navTo}</Link>
      <Link href='#' className='text-gray-600'>Product{navTo}</Link>
      <Link href='#' className='text-gray-600'>Sleep</Link> 
    </div>
  )
}

export default PageNavigation