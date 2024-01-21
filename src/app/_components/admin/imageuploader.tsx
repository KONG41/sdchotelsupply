"use client";
import { ChangeEvent, Dispatch,SetStateAction , useRef } from "react";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
import { imageURL } from "~/lib/utils";

type ImageUploaderProps = {
  selectedFiles: File[];
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  limit: number;
  imageNames?: string[];
  setImageNames?: Dispatch<SetStateAction<string[] | undefined>>;
  id?: number;
  // eslint-disable-next-line
  mutationImg?: any;
};

export default function ImageUploader({selectedFiles, setSelectedFiles,limit, imageNames,setImageNames ,id,mutationImg}:ImageUploaderProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);
console.log("test",imageNames)
      // Handle file selection
  const handleFileChange = (event:ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
          if(selectedFiles.length >= limit || files.length + selectedFiles.length + (imageNames?.length || 0) > limit){
            if(limit === 1){
                toast.error("You can only upload "+limit+" image")
                return
            }
            toast.error("You can only upload "+limit+" images")
            return
          }
          setSelectedFiles([...selectedFiles, ...Array.from(files)]);
    }
  };


  // Handle file deletion
  const handleFileDelete = (index:number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  // handle delete existing image
  const handleImageDelete = (index:number,fileName:string) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: fileName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success('Image deleted');
          } else {
            toast.error('Something went wrong');
          }
        });
        if(!imageNames) return
        if(!setImageNames) return
        if(!id) return
        const updatedFiles = [...imageNames];
        updatedFiles.splice(index, 1);
        setImageNames(updatedFiles);
        mutationImg.mutateAsync({id, image:updatedFiles})
  };

  return (

    <div>
        <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500">Images</div>
            <div className="flex gap-2 p-2">
            {imageNames && imageNames.length > 0 &&
                imageNames.map((file, index) => (
                <div className="flex flex-col justify-center items-center gap-1 h-32 w-32 rounded relative" key={index}>
                    <img
                    src={imageURL(file)}
                    alt={`Preview ${index}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                    <Button variant="light" color="danger" onClick={() => handleImageDelete(index,file)}>Delete</Button>
                </div>
                ))}
            {selectedFiles.length > 0 &&
                selectedFiles.map((file, index) => (
                <div className="flex flex-col justify-center items-center gap-1 h-32 w-32 rounded relative" key={index}>
                    <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                    <Button variant="light" color="danger" onClick={() => handleFileDelete(index)}>Delete</Button>
                </div>
                ))}
                <Button disabled={selectedFiles.length >= 4} onClick={() => fileInputRef.current?.click()}>Add</Button> 
                <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} style={{display:"none"}} />
            </div>
        </div>
    </div>
  );

}