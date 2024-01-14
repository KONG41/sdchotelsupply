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
      <div className="relative h-[700px] w-full bg-slate-700">
        <Image src={home_hero} alt="home hero" className="h-full w-full" />
        <div className="absolute bottom-0 text-white w-full h-full bg-[#00000023]">
          <div className="container max-w-[1268px] mx-auto flex flex-col justify-end h-full pb-56">
            <h1 className="text-[36px]">
              SDC Hotel Supply was established in 2008.Until now SDC work closely
              with all 5 stars hotels in Cambodia.
            </h1>
            <p className="text-[24px]">
              Office Hour : ( Monday - Friday : 8:00Am - 5:00Pm | Sat : 8:00Am -
              12:00Pm )
            </p>
          </div>
          
        </div>
      </div>
      <div className=" container max-w-[1268px] mx-auto">
        <div className="container mx-auto pt-24">
          <h1 className="text-center text-[39px] font-bold uppercase">Products</h1>
          <p className="text-center text-gray-500">
            Check out our global reach within 28 years of relentless striving.
          </p>
          <div className="mt-12 flex flex-row justify-evenly gap-7 flex-wrap">
            <div className="group relative h-[370px] w-[620px] bg-gray-400">
              <Image
                src={hotel_product}
                alt="hotel_product"
                className="h-full w-full"
              />
              <div className="absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-3 text-white group-hover:bg-[#00000024]">
                <p className="mt-[175px] text-[23px]">Hotel Products</p>
                <Link href="#" className="hidden underline group-hover:block">
                  Read More
                </Link>
              </div>
            </div>
            <div className="group relative h-[370px] w-[620px] bg-gray-400">
              <Image
                src={home_product}
                alt="hotel_product"
                className="h-full w-full"
              />
              <div className="absolute top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-3 text-white group-hover:bg-[#00000024]">
                <p className="mt-[175px] text-[23px]">Home Products</p>
                <Link href="#" className="hidden underline group-hover:block">
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
