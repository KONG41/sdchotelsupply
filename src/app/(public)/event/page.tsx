"use client";
import React from "react";
import Image from "next/image";
import education_cover from "~/assets/education_cover.jpg";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import ContactUs from "~/app/_components/ContactUs";
import CoverPage from "~/app/_components/CoverPage";
import QuoteCard from "~/app/_components/QuoteCard";
import { trpc } from "@/app/_trpc/client";
import { imageURL } from "@/lib/utils";
import empty from "~/assets/empty.svg";
import { Event } from "@prisma/client";
import { format } from "date-fns";
import LoadingAnimation from "~/app/_components/widgets/LoadingAnimation";

const formatDate = (date: any) => {
  return format(date, "dd MMM, yyyy");
};

const Event = () => {
  const { data, isLoading } = trpc.event.gets.useQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  // State to store the data for the modal
  const [modalData, setModalData] = React.useState<Event>();

  const handleOpenDetail = (item: any, backdrop: string) => {
    console.log("backdrop", backdrop);
    setBackdrop(backdrop);
    setModalData(item);
    onOpen();
  };

  return (
    <main className="flex flex-col">
      <CoverPage src={education_cover} title="Our Event" navigation={true} />

      <div className="relative my-10 h-full w-full bg-white">
        <div className="my-20 flex w-full flex-col text-white">
          <h1 className="text-center text-[36px] text-[#333333]">
            CSR or Charity
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
          {data &&
            data.map((item, index) => (
              <Card shadow="sm" key={index}>
                <CardBody
                  className="overflow-visible p-0"
                  onClick={() => handleOpenDetail(item, "blur")}
                >
                  <Image
                    style={{ boxShadow: "sm", borderRadius: "lg" }}
                    width={100}
                    height={100}
                    alt={item.name}
                    className="h-[250px] w-full object-cover"
                    src={item.image ? imageURL(item.image) : education_cover}
                  />
                </CardBody>
                <CardFooter className="flex-col items-start text-small">
                  <b className="my-1 mr-3 w-full truncate">{item.name}</b>
                  <p
                    className="my-2 text-start text-default-500"
                    dangerouslySetInnerHTML={{
                      __html: item.description as string,
                    }}
                  />
                  <div className="ml-auto flex gap-1">
                    <p className="text-small font-semibold text-default-400">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>

        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="5xl">
          <ModalContent>
            {() => (
              <>
                <center>
                  <ModalHeader className="m-3 flex h-1/2 w-1/2 flex-col items-center justify-center ">
                    <Image
                      width={100}
                      height={100}
                      alt={modalData && modalData.title}
                      className="h-full w-full items-center justify-center rounded-lg object-cover"
                      src={
                        modalData && modalData.image
                          ? imageURL(modalData.image)
                          : education_cover
                      }
                    />
                    <div className="mt-3">
                      <p>{modalData && modalData.title}</p>
                    </div>
                  </ModalHeader>
                </center>
                <ModalBody className="m-3 mb-3">
                  <b className="my-1 mr-3 w-full truncate">{modalData.name}</b>

                  <p
                    dangerouslySetInnerHTML={{ __html: modalData.description }}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

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

export default Event;
