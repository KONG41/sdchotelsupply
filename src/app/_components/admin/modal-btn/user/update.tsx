"use client";
import { useState , useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";
import DeleteUserModalBtn from "./delete";


export default function EditUserModalBtn({id}:{id:number}) {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const utils = trpc.useUtils()

    const {data:user, error , isLoading} = trpc.user.get.useQuery({id})

    useEffect(()=>{
        if(user){
            setUsername(user.username)
            setEmail(user.email?user.email:'')
            setStatus(user.status?user.status:'')
        }
    },[user])

    const mutation = trpc.user.update.useMutation({
      onSuccess: () => {
        toast.success("User Updated")
        utils.getUsers.invalidate()
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    });

    const hanldeEditUser = () => {
      if(password !== confirmPassword){
        toast.error("Password not match")
        return
      }
      if(!username){
        toast.error("Username cannot be empty")
        return
      }
      mutation.mutateAsync({
          id,
          username,
          email,
          password,
          status
      })
    }

    const handleCancel = () => {
        utils.user.get.invalidate({id})
        if(user){
            setUsername(user.username)
            setEmail(user.email?user.email:'')
            setStatus(user.status?user.status:'')
        }
        onClose()
    }

    return (
    <>
      <Button onPress={onOpen}>Edit</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} onClose={handleCancel}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
              <ModalBody>
                <Input label="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Input autoComplete="new-username" label="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <Input autoComplete="new-password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="New Password"/>
                <Input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} label="Confirm New Password"/>
                <Select  defaultSelectedKeys={[status]} onChange={(e)=>setStatus(e.target.value)} label="Select user status">
                  <SelectItem key={"active"} value={"active"}>
                    Active
                  </SelectItem>
                  <SelectItem key={"suspend"} value={"suspend"}>
                    Suspend 
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter className="justify-between">
                <DeleteUserModalBtn id={id} />
                <div className="flex gap-3">
                  <Button color="primary" variant="light" onPress={handleCancel}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={hanldeEditUser}>
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