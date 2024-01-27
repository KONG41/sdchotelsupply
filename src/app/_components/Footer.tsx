import React from "react";
import {
  FaLocationArrow,
  FaComments,
  FaViber,
  FaTelegram,
  FaWhatsapp,
  FaLine,
} from "react-icons/fa";
import { MdLocalPhone, MdEmail } from "react-icons/md";
import Link from "next/link";
import comments_qr from "~/assets/coments_qr.jpg";
import viber_qr from "~/assets/viber_qr.png";
import telegram_qr from "~/assets/telegram_qr.png";
import whatapp_qr from "~/assets/whatapp_qr.png";
import line_qr from "~/assets/line_qr.jpg";
import QrTooltip from "./widgets/QrTooltip";
import Image from "next/image";
import footer_logo from "~/assets/logo.png";
const Footer = () => {
  return (
    <div className="w-full bg-[#DB2230]">
      <div className="container sm:max-w-[1268px] w-full mx-auto flex flex-col-reverse sm:flex-row justify-center text-white">
        <div className="sm:w-2/4 p-5 px-7">
          <h1 className="mb-3 text-sm font-bold uppercase">Contact Info</h1>
          <ul>
            <li className="mb-3 flex flex-row">
              <FaLocationArrow className="mx-1 text-3xl" />
              <p>
                Address: #32, St. Somdach Hun Neang, Sangkat Chak Angrae Kraom,
                Khan Mean Chhey, Phnom Penh.
              </p>
            </li>
            <li className="mb-3 flex flex-row">
              <MdLocalPhone className="mx-1 text-2xl" />
              <ul>
                <li>+855 17 537 967 (Telegram)</li>
                <li>+855 12/10 86 66 48 (Telegram)</li>
                <li>+855 76 240 4444 (Telegram)</li>
              </ul>
            </li>
            <li className="mb-3 flex flex-row">
              <MdEmail className="mx-1 text-2xl" />
              <a href="mailto:hotex@canasin.com" className="hover:underline">
                hotex@canasin.com
              </a>
            </li>
            <li className="mb-3 flex flex-row">
              <ul>
                <li className="mx-1 inline-block rounded-md bg-white p-1 text-2xl text-black">
                  <QrTooltip qr={comments_qr} icon={<FaComments />} />
                </li>
                <li className="mx-1 inline-block rounded-md bg-white p-1 text-2xl text-black">
                  <QrTooltip qr={viber_qr} icon={<FaViber />} />
                </li>
                <li className="mx-1 inline-block rounded-md bg-white p-1 text-2xl text-black">
                  <QrTooltip qr={telegram_qr} icon={<FaTelegram />} />
                </li>
                <li className="mx-1 inline-block rounded-md bg-white p-1 text-2xl text-black">
                  <QrTooltip qr={whatapp_qr} icon={<FaWhatsapp />} />
                </li>
                <li className="mx-1 inline-block rounded-md bg-white p-1 text-2xl text-black">
                  <QrTooltip qr={line_qr} icon={<FaLine />} />
                </li>
              </ul>
            </li>
            <li className="mb-3 flex flex-row">
              <Image
                src={footer_logo}
                width={325}
                alt="Picture of the footer logo"
              />
            </li>
          </ul>
        </div>
        <div className="sm:w-1/4 p-5 px-7">
          <h1 className="mb-3 text-sm font-bold uppercase">Product</h1>
          <ul>
            <li className="mb-3 hover:underline">
              <Link href="/product?cat=2">Hotel Products</Link>
            </li>
            <li className="mb-3 hover:underline">
              <Link href="/product?cat=1"> Home Products</Link>
            </li>
          </ul>
        </div>
        <div className="sm:w-1/4 p-5 px-7">
          <h1 className="mb-3 text-sm font-bold uppercase">Education</h1>
          <ul>
            <li className="mb-3 hover:underline">
              <Link href="#">Housekeeping Class</Link>
            </li>
            <li className="mb-3 hover:underline">
              <Link href="#">Factory Tour</Link>
            </li>
            <li className="mb-3 hover:underline">
              <Link href="#">Biz concept &Seminar</Link>
            </li>
          </ul>
        </div>
        <div className="sm:w-1/4 p-5 px-7">
          <h1 className="mb-3 text-sm font-bold uppercase">Event</h1>
          <ul>
            <li className="mb-3 hover:underline">
              <Link href="/education?cat=3">Short Video Clip</Link>
            </li>
            <li className="mb-3 hover:underline">
              <Link href="/education?cat=4">CSR or Charity</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
