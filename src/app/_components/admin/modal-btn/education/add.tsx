"use client";
import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Select, SelectItem} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";


export default function AddModalBtn() {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(0);

    const {data:submenulist} = trpc.subMenu.list.useQuery()

    const utils = trpc.useUtils()

    const mutation = trpc.education.add.useMutation({
      onSuccess: () => {
        toast.success("education Added")
        utils.education.gets.invalidate()
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    });

    const hanldeAddeducation = () => {
      if(!name || !youtubeLink || !description){
        toast.error("Please fill all field")
        return
      }
      mutation.mutateAsync({
          name,
          youtubeLink,
          description,
          categoryId
      })
    }

    return (
    <>
      <Button onPress={onOpen}>Add Education</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Education</ModalHeader>
              <ModalBody>
                <Input label="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Select required onChange={(e)=> setCategoryId(Number(e.target.value))} label={"category"} items={submenulist}>
                  {parent => <SelectItem key={parent.id} value={parent.id}>{parent.name}</SelectItem>}
                </Select>
                <Input label="youtube link" value={youtubeLink} onChange={(e)=>setYoutubeLink(e.target.value)}/>
                <Textarea label="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={hanldeAddeducation}>
                  Add 
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}