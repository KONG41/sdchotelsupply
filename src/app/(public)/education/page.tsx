import React from "react";
import Image from "next/image";
import education_cover from "~/assets/education_cover.jpg";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import ContactUs from "~/app/_components/ContactUs";

const Education = () => {
  const list = [
    {
      title:
        "Cambodia Second International Trade has a modern and elegant aesthetic with clear branding.",
      img: education_cover,
      subtitle:
        "The Shiloh Events website has a modern and elegant aesthetic with clear branding. The clean design of this website is easy to navigate or browse and provides all the information for visitors.",
    },
    {
      title:
        "Cambodia Second International Trade has a modern and elegant aesthetic with clear branding.",
      img: education_cover,
      subtitle:
        "The Shiloh Events website has a modern and elegant aesthetic with clear branding. The clean design of this website is easy to navigate or browse and provides all the information for visitors.",
    },
    {
      title:
        "Cambodia Second International Trade has a modern and elegant aesthetic with clear branding.",
      img: education_cover,
      subtitle:
        "The Shiloh Events website has a modern and elegant aesthetic with clear branding. The clean design of this website is easy to navigate or browse and provides all the information for visitors.",
    },
    {
      title:
        "Cambodia Second International Trade has a modern and elegant aesthetic with clear branding.",
      img: education_cover,
      subtitle:
        "The Shiloh Events website has a modern and elegant aesthetic with clear branding. The clean design of this website is easy to navigate or browse and provides all the information for visitors.",
    },
    {
      title:
        "Cambodia Second International Trade has a modern and elegant aesthetic with clear branding.",
      img: education_cover,
      subtitle:
        "The Shiloh Events website has a modern and elegant aesthetic with clear branding. The clean design of this website is easy to navigate or browse and provides all the information for visitors.",
    },
    {
      title:
        "Cambodia Second International Trade has a modern and elegant aesthetic with clear branding.",
      img: education_cover,
      subtitle:
        "The Shiloh Events website has a modern and elegant aesthetic with clear branding. The clean design of this website is easy to navigate or browse and provides all the information for visitors.",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative h-[500px] w-full bg-slate-700">
        <Image
          src={education_cover}
          alt="education_cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 flex h-[50%] w-full flex-col text-white">
          <h1 className="text-center text-[36px]">Education</h1>
        </div>
      </div>

      <div className="relative h-[250px] w-full bg-white">
        <div className="absolute bottom-0 flex w-full flex-col text-white">
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
      </div>

      <div className="mx-28 my-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {list.map((item, index) => (
          <Card shadow="sm" key={index} isPressable>
            <CardBody className="overflow-visible p-0">
              <Image
                style={{ boxShadow: "sm", borderRadius: "lg" }}
                width={100}
                height={100}
                alt={item.title}
                className="h-[250px] w-full object-cover"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="flex-col items-start text-small">
              <b className="my-1 mr-3 w-full truncate">{item.title}</b>
              <p className="my-2 text-start text-default-500">
                {item.subtitle}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ContactUs />
    </main>
  );
};

export default Education;
