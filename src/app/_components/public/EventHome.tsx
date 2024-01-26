'use client'
import React from 'react'
import {Image} from "@nextui-org/react";
import { trpc } from '@/app/_trpc/client';
import {imageURL} from "@/lib/utils"
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
import { Event } from "@prisma/client";
import { format } from "date-fns";
import notfound_cover from "~/assets/404_notfound.svg";
import education_cover from "~/assets/education_cover.jpg";
// interface dataType{
//   status:string,
//   name:string,
//   image:any,
//   id:any
// }
// eslint-disable-next-line
const formatDate = (date: any) => {
  return format(date, "dd MMM, yyyy");
};
const EventHome = () => {
  const { data } = trpc.event.gets.useQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("outside");
  // State to store the data for the modal
  const [modalData, setModalData] = React.useState<Event>();
// eslint-disable-next-line
  const handleOpenDetail = (item: any) => {
    setModalData(item);
    onOpen();
  };
  const firstThreeElement = data ? data.slice(-3).reverse(): []
  return (
    <div className="my-12 gap-7">

<div className="relative my-10 h-full w-full bg-white">
        <div className="container sm:max-w-[1268px] w-[90%] mx-auto">
          <div className=" my-10 grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {data &&
            // eslint-disable-next-line
              firstThreeElement.map((item: any, index) => (
                <Card shadow="sm" key={index} className="rounded-md">
                  <CardBody
                    className="overflow-visible p-0 flex-none"
                    onClick={() => handleOpenDetail(item, "blur")}
                  >
                    <img
                      alt={item.name}
                      className="h-64 object-cover rounded-b-none rounded-t-md shadow-sm w-full"
                      src={item.image ? imageURL(item.image) : notfound_cover}
                    />
                  </CardBody>
                  <CardFooter className="flex-col items-start text-small justify-between flex-auto">
                    <div>
                      <b className="my-1 mr-3 w-full truncate">{item.name}</b>
                      <p
                        className="my-2 text-start text-default-500"
                        dangerouslySetInnerHTML={{
                          __html: item.description.slice(0, 200) as string,
                        }}
                      />
                    </div>
                    
                    <div className="ml-auto flex gap-1">
                      <p className="text-small font-semibold text-default-400">
                        {formatDate(item.createdAt)}
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
                        // width={100}
                        // height={100}
                        alt={modalData && modalData.name ? modalData.name : ""}
                        className="h-full w-full items-center justify-center rounded-sm object-cover"
                        src={
                          modalData && modalData.image
                            ? imageURL(modalData.image as string)
                            : education_cover
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
                        __html: (modalData && modalData.description) as string,
                      }}
                    />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>

         
        </div>
      </div>

      
        </div>
  )
}

export default EventHome