"use client";
import { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";
import ImageUploader from "@/app/_components/admin/imageuploader";
import Editor from "../../editor";
import DeleteModalBtn from "./delete";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export default function EditModalBtn({id}:{id:number}) {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [popular, setPopular] = useState<boolean>(false);
    const [price, setPrice] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [image, setImage] = useState<string[]>();
    const [filesWithTimestamp, setFilesWithTimestamp] = useState<{ file: File, name: string }[]>([]);
    const [updateImage, setUpdateImage] = useState<string[]>();

    const {data:product} = trpc.product.get.useQuery({id})
    const utils = trpc.useUtils()
    const {data:submenulist} = trpc.subMenu.list.useQuery()
    const mutationImg = trpc.product.updateImgOnDelete.useMutation({
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
        if(product){
            setName(product.name)
            setStatus(product.status??"")
            setDescription(product.description??"")
            setCategoryId(product.categoryId??0)
            setPopular(product.popular??false)
            setPrice(product.price?.toString()??"")
            // @ts-expect-error is necessary
            setImage(product.image as string[] ??[])
        }
    }, [product])

    const mutation = trpc.product.update.useMutation({
      onSuccess: () => {
        toast.success("Product Updated")
        utils.product.gets.invalidate()
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
      if(!name || !status || !description || !categoryId || !price){
        toast.error("Please fill all field")
        return
      }
      if(isNaN(Number(price))){
        toast.error("Price must be a number")
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
          categoryId,
          popular,
          price: Number(price),
          image:updateImage
      })
    }

    const handleCancel = () => {
        utils.product.get.invalidate({id})
        if(product){
            setName(product.name)
            setStatus(product.status??"")
            setDescription(product.description??"")
            setCategoryId(product.categoryId??0)
            setPopular(product.popular??false)
            setPrice(product.price?.toString()??"")
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
              <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
              <ModalBody className="overflow-auto">
                <Input label="title" value={name} onChange={(e)=>setName(e.target.value)}/>
                <Select disallowEmptySelection={true} required defaultSelectedKeys={[categoryId.toString()]} onChange={(e)=> setCategoryId(Number(e.target.value))} label={"category"} items={submenulist}>
                  {parent => <SelectItem key={parent.id} value={parent.id}>{parent.name}</SelectItem>}
                </Select>
                <Select disallowEmptySelection={true} defaultSelectedKeys={[status]} aria-readonly onChange={(e)=>setStatus(e.target.value)} label="status">
                  <SelectItem key={"active"} value={"active"}>
                    Active
                  </SelectItem>
                  <SelectItem key={"disable"} value={"disable"}>
                    Disable 
                  </SelectItem>
                </Select>
                <Select disallowEmptySelection={true} defaultSelectedKeys={[popular?"true":"false"]} disabled aria-readonly onChange={(e)=>setPopular(e.target.value === "true")} label="popular">
                  <SelectItem key={"true"} value={"true"}>
                    True
                  </SelectItem>
                  <SelectItem key={"false"} value={"false"}>
                    False 
                  </SelectItem>
                </Select>
                <Input label="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                <ImageUploader mutationImg={mutationImg} id={id} imageNames={image} setImageNames={setImage} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} limit={4}/>
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