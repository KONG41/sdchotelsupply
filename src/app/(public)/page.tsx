import Link from "next/link";
import home_hero from "~/assets/home_hero.png";
import Image from "next/image";
import home_product from "~/assets/home_product.png";
import hotel_product from "~/assets/hotel_product.png";
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
      <div className="relative h-[700px] w-full bg-slate-700">
        <Image src={home_hero} alt="home hero" className="h-full w-full" />
        <div className="absolute bottom-0 flex h-[50%] w-4/6 flex-col pl-[65px] text-white">
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

      <div className="container mx-auto py-24">
        <h1 className="text-center text-[39px]">Products</h1>
        <div className="mt-12 flex flex-row justify-center gap-7">
          <div className="group relative h-[470px] w-5/12 bg-gray-400">
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
          <div className="group relative h-[470px] w-5/12 bg-gray-400">
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

      <div className="container mx-auto py-24">
        <h1 className="text-center text-[39px]">Promotion</h1>
        <div className="mt-12 gap-7">
          <PromoSlide />
        </div>
      </div>

      <div className="container mx-auto py-24">
        <h1 className="text-center text-[39px]">Our Client</h1>
        <p className="text-center text-gray-500">
          Check out our global reach within 28 years of relentless striving.
        </p>
        <div className="mt-12 gap-7">
          <div className="flex flex-row flex-wrap justify-around">
            <div className="mb-3 h-[338px] w-[340px] border border-gray-200 p-3">
              <Image
                src={client01}
                alt="client01"
                className="h-[198px] w-full"
              />
              <div className="mt-[20px] text-center">
                <p className="py-1 text-[20px]">2007</p>
                <p className="py-1 text-[15px] text-gray-500">
                  InterContinental Hotels Group
                </p>
              </div>
            </div>

            <div className="mb-3 h-[338px] w-[340px] border border-gray-200 p-3">
              <Image
                src={client02}
                alt="client01"
                className="h-[198px] w-full"
              />
              <div className="mt-[20px] text-center">
                <p className="py-1 text-[20px]">2007</p>
                <p className="py-1 text-[15px] text-gray-500">
                  InterContinental Hotels Group
                </p>
              </div>
            </div>

            <div className="mb-3 h-[338px] w-[340px] border border-gray-200 p-3">
              <Image
                src={client03}
                alt="client01"
                className="h-[198px] w-full"
              />
              <div className="mt-[20px] text-center">
                <p className="py-1 text-[20px]">2007</p>
                <p className="py-1 text-[15px] text-gray-500">
                  InterContinental Hotels Group
                </p>
              </div>
            </div>

            <div className="mb-3 h-[338px] w-[340px] border border-gray-200 p-3">
              <Image
                src={client04}
                alt="client01"
                className="h-[198px] w-full"
              />
              <div className="mt-[20px] text-center">
                <p className="py-1 text-[20px]">2007</p>
                <p className="py-1 text-[15px] text-gray-500">
                  InterContinental Hotels Group
                </p>
              </div>
            </div>

            <div className="mb-3 h-[338px] w-[340px] border border-gray-200 p-3">
              <Image
                src={client05}
                alt="client01"
                className="h-[198px] w-full"
              />
              <div className="mt-[20px] text-center">
                <p className="py-1 text-[20px]">2007</p>
                <p className="py-1 text-[15px] text-gray-500">
                  InterContinental Hotels Group
                </p>
              </div>
            </div>

            <div className="mb-3 h-[338px] w-[340px] border border-gray-200 p-3">
              <Image
                src={client06}
                alt="client01"
                className="h-[198px] w-full"
              />
              <div className="mt-[20px] text-center">
                <p className="py-1 text-[20px]">2007</p>
                <p className="py-1 text-[15px] text-gray-500">
                  InterContinental Hotels Group
                </p>
              </div>
            </div>

            <div className="mb-3 h-[338px] w-[340px] border border-gray-200 p-3">
              <Image
                src={client07}
                alt="client01"
                className="h-[198px] w-full"
              />
              <div className="mt-[20px] text-center">
                <p className="py-1 text-[20px]">2007</p>
                <p className="py-1 text-[15px] text-gray-500">
                  InterContinental Hotels Group
                </p>
              </div>
            </div>

            <div className="mb-3 h-[338px] w-[340px] border border-gray-200 p-3">
              <Image
                src={client08}
                alt="client01"
                className="h-[198px] w-full"
              />
              <div className="mt-[20px] text-center">
                <p className="py-1 text-[20px]">2007</p>
                <p className="py-1 text-[15px] text-gray-500">
                  InterContinental Hotels Group
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-24">
        <h1 className="text-center text-[39px]">Our Events</h1>
        <div className="my-12 gap-7">
          <div className="flex flex-row">
            <div className="h-[400px] w-1/3 p-3">
              <Image src={event01} alt="event01" className="h-[350px] w-full" />
              <h1 className="py-3 text-center text-[20px]">
                HOUSEKEEPING TRAINING (2023)
              </h1>
            </div>

            <div className="h-[400px] w-1/3 p-3">
              <Image src={event02} alt="event01" className="h-[350px] w-full" />
              <h1 className="py-3 text-center text-[20px]">SDC Expedition</h1>
            </div>

            <div className="h-[400px] w-1/3 p-3">
              <Image src={event03} alt="event01" className="h-[350px] w-full" />
              <h1 className="py-3 text-center text-[20px]">
                Cambodia Second International ...
              </h1>
            </div>
          </div>
        </div>
        <div className="my-7 flex justify-center">
          <Link
            href="/event"
            className="rounded-full bg-[#DB2230] px-14 py-3 text-[15px] text-white hover:cursor-pointer"
          >
            All Events
          </Link>
        </div>
      </div>

      <ContactUs />
    </main>
  );
}
