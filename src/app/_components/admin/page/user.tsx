"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Spinner , getKeyValue} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import AddUserModalBtn from "../modal-btn/adduser";
import { useCallback } from "react";

export default function UserPage(){

    const { data:users , error ,isLoading} = trpc.getUsers.useQuery()
    console.log("user",users)
    
    type User =  {
        username: string;
        role: string | null;
        status: string | null;
        id: number;
    }
    
    const columns = [
        {key:"username",label:"USERNAME"},
        {key:"role",label:"ROLE"},
        {key:"status",label:"STATUS"},
        {key:"action",label:"ACTION"}
    ];

    const renderCell = useCallback((user: User , columnKey: React.Key) => {

    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "username":
        return (
            <div>
                {user.username?user.username:""}
            </div>
        );
      case "role":
        return (
          <div>
            {user.role?user.role:""}
          </div>  
        );
      case "status":
        return (
          <div>
            {user.status?user.status:""}
          </div>
        );
      case "action":
        return (
          <div className="relative flex items-center gap-2">
            <Button>Edit</Button>
          </div>
        );
      default:
        return <>
        {cellValue?cellValue:''}
        </>;
    }
  }, []);

    return (
        <div className="w-full">
            <div className="mb-3">
                <AddUserModalBtn />
            </div>
            <Table aria-label="User table">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            {isLoading?
                <TableBody isLoading={isLoading} loadingContent={<Spinner className="mt-14" />} >
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableBody>
            :<TableBody isLoading={isLoading} items={users}  loadingContent={<Spinner />}>
                 {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>} 
                    </TableRow>
                    )}
            </TableBody>}
             {/* <TableBody items={users}>
                {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody> */}
            </Table>
        </div>
        )
}