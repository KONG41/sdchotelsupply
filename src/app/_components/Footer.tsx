import React from 'react'
import { FaLocationArrow, FaComments, FaViber,FaTelegram, FaWhatsapp, FaLine  } from "react-icons/fa";
import { MdLocalPhone,MdEmail } from "react-icons/md";
import Link from 'next/link';
import comments_qr from "~/assets/coments_qr.jpg";
import viber_qr from "~/assets/viber_qr.png";
import telegram_qr from "~/assets/telegram_qr.png";
import whatapp_qr from "~/assets/whatapp_qr.png";
import line_qr from "~/assets/line_qr.jpg"
import QrTooltip from './widgets/QrTooltip';
import Image from 'next/image';
import footer_logo from "~/assets/logo.png"
const Footer = () => {
  return (
    <div className="w-full bg-[#DB2230]">
      <div className="w-2/3 flex flex-row justify-center text-white m-auto">
        <div className='p-5 w-2/4 px-7'>
          <h1 className='uppercase font-bold text-sm mb-3'>Contact Info</h1>
          <ul>
            <li className='flex flex-row mb-3'>
              <FaLocationArrow  className="text-3xl mx-1"/>
              <p>Address: #32, St. Somdach Hun Neang, Sangkat Chak Angrae Kraom, Khan Mean Chhey, Phnom Penh.</p>
            </li>
            <li className='flex flex-row mb-3'>
              <MdLocalPhone className="text-2xl mx-1"/>
              <ul>
                <li>+855 17 537 967 (Telegram)</li>
                <li>+855 12/10 86 66 48 (Telegram)</li>
                <li>+855 76 240 4444 (Telegram)</li>
              </ul>
            </li>
            <li className='flex flex-row mb-3'>
              <MdEmail className="text-2xl mx-1"/>
              <a href='mailto:hotex@canasin.com' className='hover:underline'>hotex@canasin.com</a>
            </li>
            <li className='flex flex-row mb-3'>
              <ul>
                <li className="inline-block p-1 text-black bg-white mx-1 text-2xl rounded-md">
                  <QrTooltip qr={comments_qr} icon={<FaComments/>}/>
                </li>
                <li className="inline-block p-1 text-black bg-white mx-1 text-2xl rounded-md">  
                  <QrTooltip qr={viber_qr} icon={<FaViber/>}/>
                </li>
                <li className="inline-block p-1 text-black bg-white mx-1 text-2xl rounded-md">
                  <QrTooltip qr={telegram_qr} icon={<FaTelegram/>}/>
                </li>
                <li className="inline-block p-1 text-black bg-white mx-1 text-2xl rounded-md">
                  <QrTooltip qr={whatapp_qr} icon={<FaWhatsapp/>}/></li>
                <li className="inline-block p-1 text-black bg-white mx-1 text-2xl rounded-md">
                  <QrTooltip qr={line_qr} icon={<FaLine/>}/></li>
              </ul>
            </li>
            <li className='flex flex-row mb-3'>
              <Image 
                src={footer_logo}
                width={325}
                alt="Picture of the footer logo"
              />
            </li>
          </ul>
        </div>
        <div className='p-5 w-1/4 px-7'>
          <h1 className='uppercase font-bold text-sm mb-3'>Product</h1>
          <ul>
            <li className='mb-3 hover:underline'><Link href="/product/hotel">Hotel Products</Link></li>
            <li className='mb-3 hover:underline'><Link href="/product/home"> Home Products</Link></li>
          </ul>
        </div>
        <div className='p-5 w-1/4 px-7'>
          <h1 className='uppercase font-bold text-sm mb-3'>Education</h1>
          <ul>
            <li className='mb-3 hover:underline'><Link href="#">Housekeeping Class</Link></li>
            <li className='mb-3 hover:underline'><Link href="#">Factory Tour</Link></li>
            <li className='mb-3 hover:underline'><Link href="#">Biz concept &Seminar</Link></li>
          </ul>
        </div>
        <div className='p-5 w-1/4 px-7'>
          <h1 className='uppercase font-bold text-sm mb-3'>Event</h1>
          <ul>
            <li className='mb-3 hover:underline'><Link href="#">Short Video Clip</Link></li>
            <li className='mb-3 hover:underline'><Link href="#">CSR or Charity</Link></li>
          
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Footer