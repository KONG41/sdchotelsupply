"use client";
import React from "react";
import Image from "next/image";
import education_cover from "~/assets/education_cover.jpg";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import ContactUs from "~/app/_components/ContactUs";
import CoverPage from "~/app/_components/CoverPage";
import QuoteCard from "~/app/_components/QuoteCard";
import { trpc } from "@/app/_trpc/client";
import empty from "~/assets/empty.svg";
import LoadingAnimation from "~/app/_components/widgets/LoadingAnimation";
import YouTubePlayer from "~/app/_components/YoutubePlayer";

const Education = () => {
  const { data, isLoading } = trpc.education.gets.useQuery();

  return (
    <main className="flex flex-col">
      <CoverPage src={education_cover} title="Education" navigation={true} />

      <div className="relative my-10 h-full w-full bg-white">
        <div className="my-20 flex w-full flex-col text-white">
          <h1 className="text-center text-[36px] text-[#333333]">
            Housekeeping Class
          </h1>
          <p className="mx-32 my-5 text-center text-[#999999]">
            With a sensitivity to international trends in hotel linen, Canasin
            has successfully customized unique linen solutions for hotels around
            the world. We also provide a thoughtful one-stop service, for which
            we have received praise from customers all over the world.
          </p>
        </div>

        <div>{isLoading && <LoadingAnimation />}</div>

        <div>
          {data && data.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              {/* Directly render the SVG here */}
              <center>
                <Image
                  alt="empty"
                  className="h-1/2 w-1/2 rounded-lg shadow-sm"
                  src={empty}
                />
              </center>
            </div>
          )}
        </div>

        <div className="mx-32 my-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {/* {!data && <div>Loading...</div>} */}

          {data &&
            data.map((item, index) => (
              <Card shadow="sm" key={index} isPressable>
                <CardBody className="overflow-visible p-0">
                  <YouTubePlayer
                    videoId={item && item.youtubeLink?.split("v=")[1]}
                  />
                </CardBody>
                <CardFooter className="flex-col items-start text-small">
                  <b className="my-1 mr-3 w-full truncate text-start">
                    {item.name}
                  </b>
                  <p className="my-2 flex-nowrap overflow-hidden text-start text-default-500">
                    {item.description}
                  </p>
                </CardFooter>
              </Card>
            ))}
        </div>

        <QuoteCard
          title="Think of Hotel Business, Think of SDC"
          subtitle=" SDC Hotel Supply was established in 2008. Until now SDC work closely
            with all 5 stars hotels in Cambodia.Our main supplies are Linen,
            Towels, Amenities, Bed+Mattresses, Hotel appliances, and Room
            accessories. Because of hospitality growing faster in Cambodia with
            the short standard, so this is the reason for SDC company running."
        />
      </div>

      <ContactUs />
    </main>
  );
};

export default Education;
