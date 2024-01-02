"use client";
import { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";
import ImageUploader from "@/app/_components/admin/imageuploader";
import Editor from "../../editor";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export default function AddModalBtn() {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [image, setImage] = useState<string[]>();
    const [filesWithTimestamp, setFilesWithTimestamp] = useState<{ file: File, name: string }[]>([]);

    useEffect(() => {
      let str: string[] = [];
      let files: { file: File, name: string }[] = [];
      
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          const timestamp = new Date().getTime();
          const newName = timestamp.toString() + file.name;
          
          str.push(newName);
          files.push({ file, name: newName });
        });

        setImage(str);
        setFilesWithTimestamp(files);
      }
    }, [selectedFiles]);


    const utils = trpc.useUtils()

    const mutation = trpc.clientRoute.add.useMutation({
      onSuccess: () => {
        toast.success("client Added")
        utils.clientRoute.gets.invalidate()
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    });

    const hanldeAddMenu = async () => {
      if(!name || !year || !description ){
        toast.error("Please fill all field")
        return
      }
      if(image && image?.length>0){
        const upload = await handleUpload()
        if(!upload){
          toast.error("Upload image failed")
          return
        }
      }
      mutation.mutateAsync({
          name,
          description,
          year,
          image
      })
    }

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
      const data = await res.json();
      return true
    } catch (error) {
      console.error('An error occurred:', error);
      return false
    }
  } else {
    return false
  }
}

    return (
    <>
      <Button onPress={onOpen}>Add Client</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Client</ModalHeader>
              <ModalBody className="overflow-auto">
                <Input label="title" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Input label="year" value={year} onChange={(e)=>setYear(e.target.value)}/>
                <ImageUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} limit={1}/>
                <div className="text-sm text-gray-500">
                  Descsription
                </div>
                <Textarea value={description} onChange={(e)=>setDescription(e.target.value)}/>
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