import React from "react";
import CoverPage from "../../_components/CoverPage";
import about_cv from "~/assets/about_cv.png";
import mission from "~/assets/mission.png";
import vision from "~/assets/vission.jpg";
import goal from "~/assets/goal.jpg";
import Image from "next/image";
import { IoIosArrowForward, IoMdCheckmarkCircle } from "react-icons/io";
import ContactUs from "../../_components/ContactUs";
import certificate01 from "~/assets/certificate01.jpg";
import certificate02 from "~/assets/certificate02.jpg";
import certificate03 from "~/assets/certificate03.jpg";
import certificate04 from "~/assets/certificate04.jpg";
const About = () => {
  return (
    <div>
      <CoverPage src={about_cv.src} title="About Us" navigation={false} />
      <div className="container sm:max-w-[1268px] w-[90%] mx-auto">
       
        <div className="mb-40 mt-20">
          <h1 className="my-3 text-[39px]">About SDC Hotel Supply</h1>
          <p className="text-[21px]">(Think of Hotel Business, Think of SDC)</p>
          <div className="my-3 text-[18px] font-light text-gray-500">
            <p>
              SDC Hotel Supply was established in 2008. Until now SDC work
              closely with all 5 stars hotels in Cambodia.Our main supplies are
              Linen, Towels, Amenities, Bed+Mattresses, Hotel appliances, and
              Room accessories.
            </p>
            <p>
              Because of hospitality growing faster in Cambodia with the short
              standard, so this is the reason for SDC company running.
            </p>
          </div>
        </div>

        <div className="my-14 flex md:h-[699px] h-auto md:flex-row flex-col">
          <div className="relative h-full md:w-5/12 w-full p-3">
            <p className="absolute top-0 z-10 text-[15px] text-[#D60054]">
              SDC HOTEL SUPPLY
            </p>
            <div className="flex h-full w-full flex-col justify-center">
              <h1 className="mb-7 flex w-full flex-row items-center justify-between border-b-2 border-black pb-7 text-[42px]">
                SDC Mission
                <span className="text-lg md:block hidden">
                  <IoIosArrowForward />
                </span>
              </h1>
              <ul className="text-[14px] text-gray-500">
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>
                  We listen to understand what the clients expect and need or
                  provide any changes to their standards.
                </li>
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>{" "}
                  We try our best to fulfill what the clients need and to make
                  sure all the products that we supply to them are standard and
                  qualified with economy pricing.
                </li>
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>{" "}
                  We do not import only qualified products, but we also provide
                  consultation from experienced people to improve the hotel
                  business.
                </li>
              </ul>
            </div>
          </div>
          <div className="h-full w-7/12 p-3">
            <Image src={mission} alt="about us mission" className="h-full object-cover" />
          </div>
        </div>

        <div className="my-14 flex md:h-[499px] h-auto md:flex-row-reverse flex-col">
          <div className="relative h-full md:w-4/12 w-full p-3">
            <p className="absolute top-0 z-10 text-[15px] text-[#D60054]">
              SDC HOTEL SUPPLY
            </p>
            <div className="flex h-full w-full flex-col justify-center">
              <h1 className="mb-7 flex w-full flex-row items-center justify-between border-b-2 border-black pb-7 text-[42px]">
                SDC Vision
                <span className="text-lg md:block hidden">
                  <IoIosArrowForward />
                </span>
              </h1>
              <ul className="text-[14px] text-gray-500">
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>
                  To produce the best quality product in our business
                </li>
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>
                  Bring out the best quality product from our company to the
                  potential customer
                </li>
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>
                  Build the strongest partner and provide the ultimate service
                  to our clients and partner
                </li>
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>
                  Do our share in helping build a better society and
                  environment.
                </li>
              </ul>
            </div>
          </div>
          <div className="h-full w-8/12 p-3">
            <Image
              src={vision}
              alt="about us mission"
              className="h-full object-cover"
            />
          </div>
        </div>

        <div className="my-14 flex md:h-[499px] h-auto md:flex-row flex-col">
          <div className="relative h-full md:w-4/12 w-full p-3">
            <p className="absolute top-0 z-10 text-[15px] text-[#D60054]">
              SDC HOTEL SUPPLY
            </p>
            <div className="flex h-full w-full flex-col justify-center">
              <h1 className="mb-7 flex w-full flex-row items-center justify-between border-b-2 border-black pb-7 text-[42px]">
                SDC Goal
                <span className="text-lg">
                  <IoIosArrowForward />
                </span>
              </h1>
              <ul className="text-[14px] text-gray-500">
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>
                  Take us to where we are now
                </li>
                <li className="mb-3 flex flex-row gap-3">
                  <span className="text-lg">
                    <IoMdCheckmarkCircle />
                  </span>
                  And to where we want to be tomorrow.
                </li>
              </ul>
            </div>
          </div>
          <div className="h-full w-8/12 p-3">
            <Image
              src={goal}
              alt="about us mission"
              className="h-full object-cover"
            />
          </div>
        </div>

        <div className="my-14 flex flex-col">
          <h1 className="mb-32 mt-20 text-center text-[36px] uppercase">
            Certifications
          </h1>
          <div className="flex flex-row flex-wrap justify-between gap-4">
            <Image
              src={certificate01}
              alt="certificate"
              className="h-[450px] w-auto bg-gray-200 p-5"
            />
            <Image
              src={certificate02}
              alt="certificate"
              className="h-[450px] w-auto bg-gray-200 p-5"
            />
            <Image
              src={certificate03}
              alt="certificate"
              className="h-[450px] w-auto bg-gray-200 p-5"
            />
            <Image
              src={certificate04}
              alt="certificate"
              className="h-[450px] w-auto bg-gray-200 p-5"
            />
          </div>
        </div>

      </div>
      <ContactUs />
    </div>
  );
};

export default About;
