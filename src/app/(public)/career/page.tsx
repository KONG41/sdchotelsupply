"use client";
import React from "react";
import Image from "next/image";
import education_cover from "~/assets/education_cover.jpg";
import notfound_cover from "~/assets/404_notfound.svg";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import ContactUs from "~/app/_components/ContactUs";
import CoverPage from "~/app/_components/CoverPage";
import QuoteCard from "~/app/_components/QuoteCard";
import empty from "~/assets/empty.svg";
import { trpc } from "@/app/_trpc/client";
import { Career } from "@prisma/client";
import { imageURL } from "~/lib/utils";
import LoadingAnimation from "~/app/_components/widgets/LoadingAnimation";

const Page = () => {
  const { data, isLoading } = trpc.career.gets.useQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [backdrop, setBackdrop] = React.useState("blur");
  // State to store the data for the modal
  const [modalData, setModalData] = React.useState<Career>();
  // const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("outside");
  // eslint-disable-next-line
  const handleOpenDetail = (item: any) => {
    // console.log("backdrop", backdrop);
    // setBackdrop(backdrop);
    setModalData(item);
    onOpen();
  };

  return (
    <main className="flex flex-col">
      <CoverPage src={education_cover.src} title="Carrer" navigation={false} />

      <div className="relative my-10 h-full w-full bg-white">
        <div className="container sm:max-w-[1268px] w-[90%] mx-auto">
          <div className="my-20 flex w-full flex-col text-white">
            <h1 className="text-center text-[36px] text-[#333333]">
              Job Opportunity
            </h1>
            <p className="sm:mx-32 mx-3 my-5 text-center text-[#999999]">
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

            <div className=" my-10 grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {data &&
              // eslint-disable-next-line
                data.map((item: any, index) => (
                  <Card shadow="sm" key={index} className="rounded-md">
                    <CardBody
                      className="overflow-visible p-0"
                      onClick={() => handleOpenDetail(item)}
                    >
                      <img
                        // style={{ boxShadow: "sm", borderRadius: "lg" }}
                        // width={100}
                        // height={100}
                        alt={item.position}
                        className="h-64 w-full object-cover shadow-sm rounded-b-none rounded-t-md"
                        src={item.image ? imageURL(JSON.parse(item.image)[0]) : notfound_cover}
                      />
                    </CardBody>
                    <CardFooter className="flex-col items-start text-small">
                      <div className="my-1 flex gap-1">
                        <p className="text-small font-semibold text-default-400">
                          Position:
                        </p>
                        <p className="text-small text-default-400">
                          {item.position}
                        </p>
                      </div>

                      <div className="my-1 flex gap-1">
                        <p className="text-small font-semibold text-default-400">
                          Term:
                        </p>
                        <p className="text-small text-default-400">{item.term}</p>
                      </div>

                      <div className="my-1 flex gap-1">
                        <p className="text-small font-semibold text-default-400">
                          Open:
                        </p>
                        <p className="text-small text-default-400">
                          {item.openDate} - {item.closeDate}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>

            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="gap- m-3 flex flex-col pt-14">
                      <div className="mt-3 font-bold uppercase text-[24px] text-center">{modalData && modalData.position}</div>
                    </ModalHeader>
                    <ModalBody className="description m-3 mb-3">
                      {/* <p>{modalData && modalData.description}</p> */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: (modalData && modalData.description) as string,
                        }}
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
          
        </div>
       

      <ContactUs isGoogleMap={false}/>
    </main>
  );
};

export default Page;
