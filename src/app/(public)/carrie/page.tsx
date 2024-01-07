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

const Carrie = () => {
  const list = [
    {
      thumbnail: education_cover,
      position: "Sales Manager",
      term: "Full Time",
      open: "Dec 12,2023 - Dec 30,2023",
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  const handleOpenDetail = (item: any, backdrop: string) => {
    console.log("backdrop", backdrop);
    setBackdrop(backdrop);
    setModalData(item);
    onOpen();
  };

  // State to store the data for the modal
  const [modalData, setModalData] = React.useState<any>(null);

  return (
    <main className="flex flex-col">
      <CoverPage src={education_cover} title="Carrer" navigation={true} />

      <div className="relative my-10 h-full w-full bg-white">
        <div className="my-20 flex w-full flex-col text-white">
          <h1 className="text-center text-[36px] text-[#333333]">
            Job Opportunity
          </h1>
          <p className="mx-32 my-5 text-center text-[#999999]">
            With a sensitivity to international trends in hotel linen, Canasin
            has successfully customized unique linen solutions for hotels around
            the world. We also provide a thoughtful one-stop service, for which
            we have received praise from customers all over the world.
          </p>
        </div>

        <div className="mx-32 my-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {list.map((item, index) => (
            <Card shadow="sm" key={index}>
              <CardBody
                className="overflow-visible p-0"
                onClick={() => handleOpenDetail(item, "blur")}
              >
                <Image
                  style={{ boxShadow: "sm", borderRadius: "lg" }}
                  width={100}
                  height={100}
                  alt={item.position}
                  className="h-[250px] w-full object-cover"
                  src={item.thumbnail}
                />
              </CardBody>
              <CardFooter className="flex-col items-start text-small">
                <div className="my-1 flex gap-1">
                  <p className="text-small font-semibold text-default-400">
                    Position:
                  </p>
                  <p className="text-small text-default-400">{item.position}</p>
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
                  <p className="text-small text-default-400">{item.open}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="gap- m-3 flex flex-col">
                  <div className="mt-3">{modalData && modalData.position}</div>
                </ModalHeader>
                <ModalBody className="m-3 mb-3">
                  <p>
                    Company: SDC Hotel Supply Job type:Full-time job Job
                    category: Sale OutdoorSalary:NegotiationLocation: Phnom Penh
                    Job expires in
                  </p>
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

export default Carrie;
