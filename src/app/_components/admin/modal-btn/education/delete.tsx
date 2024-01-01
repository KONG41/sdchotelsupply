"user client";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import { toast } from "sonner";

export default function DeleteModalBtn({id}:{id:number}) {
    const {isOpen, onOpen, onOpenChange , onClose} = useDisclosure();
    const utils = trpc.useUtils()
    const mutation = trpc.education.delete.useMutation({
        onSuccess: () => {
            toast.success("Education Deleted")
            utils.education.gets.invalidate()
            onClose()
        },
        onError: (err) => {
            toast.error(err.message)
        }
        });

    const handleDelete = () => {
        mutation.mutateAsync({id})
    }

    return (
    <>
      <Button color="danger" variant="light" onPress={onOpen}>Delete</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1">
                  <div>
                    Are you sure you want to delete this user?
                  </div>
                  <div className="text-red-500">
                    This action cannot be undone.
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Delete 
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    )
}
