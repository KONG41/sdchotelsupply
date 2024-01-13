"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import contact_bg from '~/assets/contact_bg.png'
import { trpc } from '../_trpc/client';

const ContactUs = () => {

  const [name, setName] = useState("")
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")
  const [phone,setPhone] = useState("")

  const mutation = trpc.contactSubmit.useMutation({
    onError: (error) => {
      alert("something went wrong!")
    },
    onSuccess: () => {
      alert("Your message has been sent")
    }
  })

  const handleSubmit = (e:any) => {
    e.preventDefault()
    mutation.mutate({name,email,phone,message})
  }
  

  return (
    <div className='w-full h-[937px] relative'>
        <Image src={contact_bg} alt='contact_background' className='w-full h-full'/>
        <div className='absolute w-full h-full flex justify-center items-center top-0 z-10'>
            <div className='w-1/3 p-12 bg-white rounded-md'>
                <h1 className='text-center text-[39px] my-3 font-semibold'>Contact Us Now</h1>
                <form className='flex flex-col'>
                    <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='*Name'  className='bg-slate-200 text-gray-500 focus-visible:outline-none text-md my-2 p-3 rounded-md text-[15px]'/>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='*Email' className='bg-slate-200 text-gray-500 focus-visible:outline-none text-md my-2 p-3 rounded-md text-[15px]'/>
                    <input value={phone} onChange={(e)=>setPhone(e.target.value)} type='tel' placeholder='*Phone' className='bg-slate-200 text-gray-500 focus-visible:outline-none text-md my-2 p-3 rounded-md text-[15px]'/>
                    <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className='bg-slate-200 text-gray-500 focus-visible:outline-none text-md my-2 p-3 rounded-md text-[15px]'></textarea>
                    <button onClick={handleSubmit} className='w-full py-3 bg-[#DB2230] rounded-full text-center text-white mt-5 hover:cursor-pointer'>Submit</button>
                    <p className='text-[13px] text-gray-500 my-3'>*We respect your confidentiality and all information are protected.</p>
                </form>
                <p className='text-[13px] my-5'><span className='font-semibold'>Address:</span> #32, St. Somdach Hun Neang, Sangkat Chak Angrae Kraom, Khan Mean Chhey, Phnom Penh.</p>
            </div>
            
        </div>
    </div>
  )
}

export default ContactUs