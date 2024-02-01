"use client";
import { useState , useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";
import DeleteModalBtn from "./delete";


export default function EditModalBtn({id}:{id:number}) {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const utils = trpc.useUtils()

    const {data:menu} = trpc.menu.get.useQuery({id})

    useEffect(()=>{
        if(menu){
            setName(menu.name)
            setStatus(menu.status?menu.status:'')
            setDescription(menu.description?menu.description:'')
        }
    },[menu])

    const mutation = trpc.menu.update.useMutation({
      onSuccess: () => {
        toast.success("Menu Updated")
        utils.menu.gets.invalidate()
        utils.subMenu.gets.invalidate()
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    });

    const hanldeEdit = () => {

      if(!name){
        toast.error("Name cannot be empty")
        return
      }
      
      mutation.mutateAsync({
          id,
          name,
          description,
          status
      })
    }

    const handleCancel = () => {
        utils.menu.get.invalidate({id})
        if(menu){
            setName(menu.name)
            setDescription(menu.description?menu.description:'')
            setStatus(menu.status?menu.status:'')
        }
        onClose()
    }

    return (
    <>
      <Button onPress={onOpen}>Edit</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} onClose={handleCancel}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Menu</ModalHeader>
              <ModalBody>
                <Input label="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Select disallowEmptySelection={true} defaultSelectedKeys={[status]} onChange={(e)=>setStatus(e.target.value)} label="Select user status">
                  <SelectItem key={"active"} value={"active"}>
                    Active
                  </SelectItem>
                  <SelectItem key={"disable"} value={"disable"}>
                    Disable 
                  </SelectItem>
                </Select>
                <Textarea label="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
              </ModalBody>
              <ModalFooter className="justify-between">
                <DeleteModalBtn id={id} />
                <div className="flex gap-3">
                  <Button color="primary" variant="light" onPress={handleCancel}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={hanldeEdit}>
                    Save 
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}