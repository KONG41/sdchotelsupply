"use client";
import { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";
import ImageUploader from "@/app/_components/admin/imageuploader";
import DeleteModalBtn from "./delete";
import Editor from "../../editor";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export default function EditModalBtn({id}:{id:number}) {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [image, setImage] = useState<string[]>();
    const [filesWithTimestamp, setFilesWithTimestamp] = useState<{ file: File, name: string }[]>([]);
    const [updateImage, setUpdateImage] = useState<string[]>();

    const {data} = trpc.promotion.get.useQuery({id})
    const utils = trpc.useUtils()
    const mutationImg = trpc.promotion.updateImgOnDelete.useMutation({
      onError: (err) => {
        toast.error(err.message)
      }
    });

    useEffect(() => {
      const str: string[] = [];
      const files: { file: File, name: string }[] = [];
      
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          const timestamp = new Date().getTime();
          const newName = timestamp.toString() + file.name;
          
          str.push(newName);
          files.push({ file, name: newName });
        });
        setFilesWithTimestamp(files);
        if(image){
          setUpdateImage([...image, ...str]);
        } else {
          setUpdateImage([...str]);
        }
      }
    }, [selectedFiles]);

    useEffect(() => {
        if(data){
            setName(data.name)
            setStatus(data.status??"")
            setDescription(data.description??"")
          
            /*
            @ts-expect-error: Unreachable code error
            */
            setImage(JSON.parse(data.image??"[]"))
        }
    }, [data])

    const mutation = trpc.promotion.update.useMutation({
      onSuccess: () => {
        toast.success("Promotion Updated")
        utils.promotion.gets.invalidate()
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    });

    const handleUpload = async () => {
      if(filesWithTimestamp.length > 0){
        const formData = new FormData();
        filesWithTimestamp.map((fileObj) => {
          formData.append("files", fileObj.file, fileObj.name);
        });
        try {
          const res = await fetch(BASE_URL+"/api/upload", {
            method: "POST",
            body: formData,
          });
          if (!res.ok) {
            return false
          }
          await res.json();
          return true
        } catch (error) {
          console.error('An error occurred:', error);
          return false
        }
      } else {
        return false
      }
    }

    const handleUpdate = async () => {
      if(!name || !status || !description ){
        toast.error("Please fill all field")
        return
      }

       if(selectedFiles && selectedFiles?.length>0){
        const upload = await handleUpload()
        if(!upload){
          toast.error("Upload image failed")
          return
        }
      }
      mutation.mutateAsync({
          id,
          name,
          description,
          status,
          image:JSON.stringify(updateImage)
      })
    }

    const handleCancel = () => {
        utils.promotion.get.invalidate({id})
        if(data){
            setName(data.name)
            setStatus(data.status??"")
            setDescription(data.description??"")
        }
        onClose()
    }

    return (
    <>
      <Button onPress={onOpen}>Edit</Button>
      <Modal size="5xl" className="h-[800px]" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} onClose={handleCancel}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Promotion</ModalHeader>
              <ModalBody className="overflow-auto">
                <Input label="title" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Select disallowEmptySelection={true} defaultSelectedKeys={[status]} aria-readonly onChange={(e)=>setStatus(e.target.value)} label="status">
                  <SelectItem key={"active"} value={"active"}>
                    Active
                  </SelectItem>
                  <SelectItem key={"disable"} value={"disable"}>
                    Disable 
                  </SelectItem>
                </Select>
                <ImageUploader mutationImg={mutationImg} id={id} imageNames={image} setImageNames={setImage} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} limit={1}/>
                <div className="text-sm text-gray-500">
                  Descsription
                </div>
                <Editor value={description} setValue={setDescription}/>
              </ModalBody>
              <ModalFooter className="justify-between">
                  <DeleteModalBtn id={id} />
                  <div className="flex gap-3">
                    <Button color="primary" variant="light" onPress={handleCancel}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={handleUpdate}>
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