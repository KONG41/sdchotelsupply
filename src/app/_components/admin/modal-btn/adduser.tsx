"use client";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";

export default function AddUserModalBtn() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
    <>
      <Button onPress={onOpen}>Add User</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New User</ModalHeader>
              <ModalBody>
                <Input label="Username"/>
                <Input type="password" label="Password"/>
                <Input type="password" label="Confirm Password"/>
                <Select label="Select user role">
                  <SelectItem key={1} value={1}>
                    Admin
                  </SelectItem>
                  <SelectItem key={2} value={2}>
                    Editor 
                  </SelectItem>
                  <SelectItem key={3} value={3}>
                    Viewer 
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
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