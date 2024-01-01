"use client";
import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem , Textarea } from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";


export default function AddModalBtn() {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [parentId, setParentId] = useState(0);

    const utils = trpc.useUtils()
    const {data:parentList} = trpc.subMenu.getParentList.useQuery()
    const mutation = trpc.subMenu.add.useMutation({
      onSuccess: () => {
        toast.success("Submenu Added")
        utils.subMenu.gets.invalidate()
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    });

    const hanldeAdd= () => {
      if(!name || !parentId || !description || !status){
        toast.error("Please fill all field")
        return
      }
      mutation.mutateAsync({
          name,
          parentId,
          description,
          status
      })
    }

    return (
    <>
      <Button onPress={onOpen}>Add Submenu</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Submenu</ModalHeader>
              <ModalBody>
                <Input label="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Select onChange={(e)=>setParentId(Number(e.target.value))} label={"parent"} items={parentList}>
                  {parent => <SelectItem key={parent.id} value={parent.id}>{parent.name}</SelectItem>}
                </Select>
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
                <Button color="primary" onPress={hanldeAdd}>
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