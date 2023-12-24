import Link from "next/link";
import home_hero from "~/assets/home_hero.png";
import Image from "next/image";
import home_product from "~/assets/home_product.png";
import hotel_product from "~/assets/hotel_product.png"
import PromoSlide from "../_components/PromoSlide";
import client01 from "~/assets/client01.png";
import client02 from "~/assets/client02.png";
import client03 from "~/assets/client03.png";
import client04 from "~/assets/client04.png";
import client05 from "~/assets/client05.png";
import client06 from "~/assets/client06.png";
import client07 from "~/assets/client07.png";
import client08 from "~/assets/client08.png";
import event01 from "~/assets/event01.png";
import event02 from "~/assets/event02.png";
import event03 from "~/assets/event03.png";
import ContactUs from "../_components/ContactUs";
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
        <div className="w-full h-[700px] bg-slate-700 relative">
          <Image src={home_hero} alt="home hero" className="w-full h-full"/>
          <div className="absolute bottom-0 w-4/6 h-[50%] text-white flex flex-col pl-[65px]">
            <h1 className="text-[36px]">SDC Hotel Supply was established in 2008.Until now SDC work closely with all 5 stars hotels in Cambodia.</h1>
            <p className="text-[24px]">Office Hour : ( Monday - Friday : 8:00Am - 5:00Pm | Sat : 8:00Am - 12:00Pm )</p>
          </div>
        </div>

        <div className="container mx-auto py-24">
          <h1 className="text-center text-[39px]">Products</h1>
          <div className="flex flex-row justify-center mt-12 gap-7">
            <div className="h-[470px] w-5/12 bg-gray-400 relative group">
              <Image src={hotel_product} alt="hotel_product" className="w-full h-full"/>
              <div className="absolute w-full h-full z-10 top-0 flex flex-col gap-3 justify-center items-center text-white group-hover:bg-[#00000024]">
                <p className="mt-[175px] text-[23px]">Hotel Products</p>
                <Link href="#" className="hidden group-hover:block underline">Read More</Link>
              </div>
            </div>
            <div className="h-[470px] w-5/12 bg-gray-400 relative group">
              <Image src={home_product} alt="hotel_product" className="w-full h-full"/>
              <div className="absolute w-full h-full z-10 top-0 flex flex-col gap-3 justify-center items-center text-white group-hover:bg-[#00000024]">
                <p className="mt-[175px] text-[23px]">Home Products</p>
                <Link href="#" className="hidden group-hover:block underline">Read More</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-24">
          <h1 className="text-center text-[39px]">Promotion</h1>
          <div className="mt-12 gap-7">
          <PromoSlide/>
          </div>
        </div>

        <div className="container mx-auto py-24">
          <h1 className="text-center text-[39px]">Our Client</h1>
          <p className="text-center text-gray-500">Check out our global reach within 28 years of relentless striving.</p>
          <div className="mt-12 gap-7">
            <div className="flex flex-row justify-around flex-wrap">
              <div className="w-[340px] h-[338px] mb-3 border border-gray-200 p-3">
                <Image src={client01} alt="client01" className="w-full h-[198px]"/>
                <div className="text-center mt-[20px]">
                  <p className="text-[20px] py-1">2007</p>
                  <p className="text-[15px] text-gray-500 py-1">InterContinental Hotels Group</p>
                </div>
              </div>

              <div className="w-[340px] h-[338px] mb-3 border border-gray-200 p-3">
                <Image src={client02} alt="client01" className="w-full h-[198px]"/>
                <div className="text-center mt-[20px]">
                  <p className="text-[20px] py-1">2007</p>
                  <p className="text-[15px] text-gray-500 py-1">InterContinental Hotels Group</p>
                </div>
              </div>

              <div className="w-[340px] h-[338px] mb-3 border border-gray-200 p-3">
                <Image src={client03} alt="client01" className="w-full h-[198px]"/>
                <div className="text-center mt-[20px]">
                  <p className="text-[20px] py-1">2007</p>
                  <p className="text-[15px] text-gray-500 py-1">InterContinental Hotels Group</p>
                </div>
              </div>

              <div className="w-[340px] h-[338px] mb-3 border border-gray-200 p-3">
                <Image src={client04} alt="client01" className="w-full h-[198px]"/>
                <div className="text-center mt-[20px]">
                  <p className="text-[20px] py-1">2007</p>
                  <p className="text-[15px] text-gray-500 py-1">InterContinental Hotels Group</p>
                </div>
              </div>

              <div className="w-[340px] h-[338px] mb-3 border border-gray-200 p-3">
                <Image src={client05} alt="client01" className="w-full h-[198px]"/>
                <div className="text-center mt-[20px]">
                  <p className="text-[20px] py-1">2007</p>
                  <p className="text-[15px] text-gray-500 py-1">InterContinental Hotels Group</p>
                </div>
              </div>

              <div className="w-[340px] h-[338px] mb-3 border border-gray-200 p-3">
                <Image src={client06} alt="client01" className="w-full h-[198px]"/>
                <div className="text-center mt-[20px]">
                  <p className="text-[20px] py-1">2007</p>
                  <p className="text-[15px] text-gray-500 py-1">InterContinental Hotels Group</p>
                </div>
              </div>

              <div className="w-[340px] h-[338px] mb-3 border border-gray-200 p-3">
                <Image src={client07} alt="client01" className="w-full h-[198px]"/>
                <div className="text-center mt-[20px]">
                  <p className="text-[20px] py-1">2007</p>
                  <p className="text-[15px] text-gray-500 py-1">InterContinental Hotels Group</p>
                </div>
              </div>

              <div className="w-[340px] h-[338px] mb-3 border border-gray-200 p-3">
                <Image src={client08} alt="client01" className="w-full h-[198px]"/>
                <div className="text-center mt-[20px]">
                  <p className="text-[20px] py-1">2007</p>
                  <p className="text-[15px] text-gray-500 py-1">InterContinental Hotels Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-24">
          <h1 className="text-center text-[39px]">Our Events</h1>
          <div className="my-12 gap-7">
            <div className="flex flex-row">
            <div className="w-1/3 h-[400px] p-3">
              <Image src={event01} alt="event01" className="w-full h-[350px]"/>
              <h1 className="text-[20px] text-center py-3">HOUSEKEEPING TRAINING (2023)</h1>
            </div>

            <div className="w-1/3 h-[400px] p-3">
              <Image src={event02} alt="event01" className="w-full h-[350px]"/>
              <h1 className="text-[20px] text-center py-3">SDC Expedition</h1>
            </div>

            <div className="w-1/3 h-[400px] p-3">
              <Image src={event03} alt="event01" className="w-full h-[350px]"/>
              <h1 className="text-[20px] text-center py-3">Cambodia Second International ...</h1>
            </div>
            </div>
          </div>
          <div className="flex justify-center my-7">
            <Link href='/event' className="px-14 py-3 bg-[#DB2230] rounded-full text-[15px] text-white hover:cursor-pointer">All Events</Link>
          </div>
          
        </div>

        <ContactUs/>
    </main>
  );
}
