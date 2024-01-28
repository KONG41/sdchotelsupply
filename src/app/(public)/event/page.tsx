"use client";
import {useState} from "react";
import {Image} from "@nextui-org/image";
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
import { trpc } from "@/app/_trpc/client";
import { imageURL } from "@/lib/utils";
import empty from "~/assets/empty.svg";
import { format } from "date-fns";
import LoadingAnimation from "~/app/_components/widgets/LoadingAnimation";


const Event = () => {
  interface Event {
    status: string | null;
    id: number;
    description: string | null;
    name: string;
    createdAt: string;
    updatedAt: string;
    image: string | null;
    youtubeLink: string | null;
}
  
  const formatDate = (date:string) => {
    return format(date, "dd MMM, yyyy");
  };
  const { data, isLoading } = trpc.event.gets.useQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [scrollBehavior, setScrollBehavior] = useState("outside");
  // State to store the data for the modal
  const [modalData, setModalData] = useState<Event>();

  const handleOpenDetail = (item: Event) => {
    setBackdrop(backdrop);
    setModalData(item);
    onOpen();
  };

  return (
    <main className="flex flex-col">
      <CoverPage src={education_cover.src} title="Our Event" navigation={false} />

      <div className="relative my-10 h-full w-full bg-white">
        <div className="container sm:max-w-[1268px] w-[90%] mx-auto">

          
          <div className="my-20 flex w-full flex-col text-white">
            <h1 className="text-center text-[36px] text-[#333333]">
              CSR or Charity
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
            {data?.map((item, index) => (
                <Card shadow="sm" key={index} className="rounded-md">
                  <CardBody
                    className="overflow-visible p-0 flex-none"
                    onClick={() => handleOpenDetail(item)}
                  >
                    <img
                      alt={item.name}
                      className="h-64 object-cover rounded-b-none rounded-t-md shadow-sm w-full"
                      src={item.image ? imageURL(JSON.parse(item.image)[0]) : notfound_cover}
                    />
                  </CardBody>
                  <CardFooter className="flex-col items-start text-small justify-between flex-auto">
                    <div>
                      <b className="my-1 mr-3 w-full truncate">{item.name}</b>
                      <p
                        className="my-2 text-start text-default-500"
                        dangerouslySetInnerHTML={{
                          __html: item.description?.slice(0, 200) ?? "" ,
                        }}
                      />
                    </div>
                    
                    <div className="ml-auto flex gap-1">
                      <p className="text-small font-semibold text-default-400">
                        {formatDate(item?.createdAt)}
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
                  <center>
                    <ModalHeader className="m-3 flex h-[auto] w-6/6 flex-col items-center justify-center pt-14 ">
                      <Image
                        alt={ modalData?.name ?? ""}
                        className="h-full w-full items-center justify-center rounded-sm object-cover"
                        src={modalData?.image
                          ? imageURL(JSON.parse(modalData.image)[0])
                          : education_cover.src
                        }
                      />
                      <div className="mt-3 w-full">
                        <p className="float-left">{modalData && modalData.name}</p>
                      </div>
                    </ModalHeader>
                  </center>
                  <ModalBody className="m-3 mb-3">
                    <b className="my-1 mr-3 w-full truncate">
                      {modalData && modalData.name}
                    </b>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: modalData?.description ?? "",
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

      <ContactUs />
    </main>
  );
};

export default Event;
