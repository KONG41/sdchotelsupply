"use client";
import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";


export default function AddUserModalBtn() {
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const utils = trpc.useUtils()

    const mutation = trpc.user.add.useMutation({
      onSuccess: () => {
        toast.success("User Added")
        utils.getUsers.invalidate()
        onClose()
      },
      onError: (err) => {
        toast.error(err.message)
      }
    });

    const hanldeAddUser = () => {
      if(!username || !password || !confirmPassword || !email || !status){
        toast.error("Please fill all field")
        return
      }
      if(password !== confirmPassword){
        toast.error("Password not match")
        return
      }
      mutation.mutateAsync({
          username,
          email,
          password,
          status
      })
    }

    return (
    <>
      <Button onPress={onOpen}>Add User</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New User</ModalHeader>
              <ModalBody>
                <Input label="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Input autoComplete="new-username" label="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <Input autoComplete="new-password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} label="Password"/>
                <Input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} label="Confirm Password"/>
                <Select onChange={(e)=>setStatus(e.target.value)} label="Select user status">
                  <SelectItem key={"active"} value={"active"}>
                    Active
                  </SelectItem>
                  <SelectItem key={"suspend"} value={"suspend"}>
                    Suspend 
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={hanldeAddUser}>
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