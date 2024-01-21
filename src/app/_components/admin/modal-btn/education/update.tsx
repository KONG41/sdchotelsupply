"use client";
import { useState , useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";
import DeleteModalBtn from "./delete";


export default function EditModalBtn({id}:{id:number}) {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [description, setDescription] = useState("");

    const utils = trpc.useUtils()

    const {data:education} = trpc.education.get.useQuery({id})

    useEffect(()=>{
        if(education){
            setName(education.name)
            setYoutubeLink(education.youtubeLink??'')
            setDescription(education.description??'')
        }
    },[education])
    const mutation = trpc.education.update.useMutation({
      onSuccess: () => {
        toast.success("Education Updated")
        utils.education.gets.invalidate()
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
          youtubeLink
      })
    }

    const handleCancel = () => {
        utils.education.get.invalidate({id})
        if(education){
            setName(education.name)
            setDescription(education.description??'')
            setYoutubeLink(education.youtubeLink??'')
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
              <ModalHeader className="flex flex-col gap-1">Edit Education</ModalHeader>
              <ModalBody>
                <Input label="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Input label="Youtube Link" value={youtubeLink} onChange={(e)=>setYoutubeLink(e.target.value)}/>
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