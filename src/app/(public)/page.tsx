import Link from "next/link";
import home_hero from "~/assets/home_hero.png";
import Image from "next/image";
import home_product from "~/assets/home_product.png";
import hotel_product from "~/assets/hotel_product.png";
import PromoSlide from "../_components/PromoSlide";
import Client from "../_components/public/Client";
import EventHome from "../_components/public/EventHome";
import ContactUs from "../_components/ContactUs";


export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative md:h-[700px] h-[400px] w-full bg-slate-700">
        <Image src={home_hero} alt="home hero" className="h-full w-full object-cover" />
        <div className="absolute bottom-0 text-white w-full h-full bg-[#00000023]">
          <div className="container md:max-w-[1268px] w-[90%] mx-auto flex flex-col justify-end h-full md:pb-56 pb-10">
            <h1 className="md:text-[36px] text-[20px]">
              SDC Hotel Supply was established in 2008.Until now SDC work closely
              with all 5 stars hotels in Cambodia.
            </h1>
            <p className="md:text-[24px] text-[16px]">
              Office Hour : ( Monday - Friday : 8:00Am - 5:00Pm | Sat : 8:00Am -
              12:00Pm )
            </p>
          </div>
          
        </div>
      </div>
      <div className=" container sm:max-w-[1268px] w-[90%] mx-auto">
        <div className="container mx-auto pt-24">
          <h1 className="text-center text-[39px] font-bold uppercase">Products</h1>
          <p className="text-center text-gray-500">
            Check out our global reach within 28 years of relentless striving.
          </p>
          <div className="mt-12 grid gap-5 md:w-full sm:w-[70%] w-full mx-auto md:grid-cols-2 grid-cols-1">
            <div className="group relative h-[370px] bg-gray-400">
              <Image
                src={hotel_product}
                alt="hotel_product"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-3 text-white group-hover:bg-[#00000024]">
                <p className="mt-[175px] text-[23px]">Hotel Products</p>
                <Link href="/product?cat=2" className="hidden underline group-hover:block">
                  Read More
                </Link>
              </div>
            </div>
            <div className="group relative h-[370px] bg-gray-400">
              <Image
                src={home_product}
                alt="hotel_product"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-3 text-white group-hover:bg-[#00000024]">
                <p className="mt-[175px] text-[23px]">Home Products</p>
                <Link href="/product?cat=1" className="hidden underline group-hover:block">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto pt-24">
          <h1 className="text-center text-[39px] font-bold uppercase">Promotion</h1>
          <p className="text-center text-gray-500">
            Check out our global reach within 28 years of relentless striving.
          </p>
          <div className="mt-12 gap-7">
            <PromoSlide />
          </div>
        </div>

        <div className="container mx-auto pt-24">
          <h1 className="text-center text-[39px] font-bold uppercase">Our Events</h1>
          <p className="text-center text-gray-500">
            Check out our global reach within 28 years of relentless striving.
          </p>
          <EventHome />
          <div className="my-7 flex justify-center">
            <Link
              href="/event"
              className="rounded-full bg-[#DB2230] px-14 py-3 text-[15px] text-white hover:cursor-pointer"
            >
              All Events
            </Link>
          </div>
        </div>

        <div className="container mx-auto pt-24">
          <h1 className="text-center text-[39px] font-bold uppercase">Our Client</h1>
          <p className="text-center text-gray-500">
            Check out our global reach within 28 years of relentless striving.
          </p>
          <Client/>
        </div>
      </div>
      <div className="pt-24">
        <ContactUs />
      </div>
       
    </main>
  );
}
