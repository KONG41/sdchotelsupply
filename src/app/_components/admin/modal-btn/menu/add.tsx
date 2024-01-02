"use client";
import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";


export default function AddModalBtn() {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const utils = trpc.useUtils()

    const mutation = trpc.menu.add.useMutation({
      onSuccess: () => {
        toast.success("Menu Added")
        utils.menu.gets.invalidate()
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    });

    const hanldeAddMenu = () => {
      if(!name || !status || !description){
        toast.error("Please fill all field")
        return
      }
      mutation.mutateAsync({
          name,
          status,
          description,
      })
    }

    return (
    <>
      <Button onPress={onOpen}>Add Menu</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Menu</ModalHeader>
              <ModalBody>
                <Input label="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Select required onChange={(e)=>setStatus(e.target.value)} label="Select user status">
                  <SelectItem key={"active"} value={"active"}>
                    Active
                  </SelectItem>
                  <SelectItem key={"suspend"} value={"suspend"}>
                    Disable 
                  </SelectItem>
                </Select>
                <Textarea label="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={hanldeAddMenu}>
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