"use client";
import { useState , useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";
import DeleteUserModalBtn from "./delete";


export default function EditModalBtn({id}:{id:number}) {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [parentId, setParentId] = useState(0);
    const [status, setStatus] = useState("");

    const utils = trpc.useUtils()

    const {data:submenu} = trpc.subMenu.get.useQuery({id})
    const {data:parentList} = trpc.subMenu.getParentList.useQuery()

    useEffect(()=>{
        if(submenu){
            setName(submenu.name)
            setDescription(submenu.description?submenu.description:'')
            setParentId(submenu.parentId?submenu.parentId:0)
            setStatus(submenu.status?submenu.status:'')
        }
    },[submenu])

    const mutation = trpc.subMenu.update.useMutation({
      onSuccess: () => {
        toast.success("Submenu Updated")
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
      if(!parentId){
        toast.error("Parent cannot be empty")
        return
      }
      mutation.mutateAsync({
          id,
          name,
          parentId,
          description,
          status
      })
    }

    const handleCancel = () => {
        utils.subMenu.get.invalidate({id})
        if(submenu){
            setName(submenu.name)
            setDescription(submenu.description?submenu.description:'')
            setParentId(submenu.parentId?submenu.parentId:0)
            setStatus(submenu.status?submenu.status:'')
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
              <ModalHeader className="flex flex-col gap-1">Edit Submenu</ModalHeader>
              <ModalBody>
                <Input label="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Select disallowEmptySelection={true} defaultSelectedKeys={[parentId.toString()]} onChange={(e)=>setParentId(Number(e.target.value))} label={"parent"} items={parentList}>
                  {parent => <SelectItem key={parent.id} value={parent.id}>{parent.name}</SelectItem>}
                </Select>
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
                <DeleteUserModalBtn id={id} />
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