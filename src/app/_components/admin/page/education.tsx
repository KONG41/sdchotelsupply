"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import AddUserModalBtn from "../modal-btn/education/add";
import EditUserModalBtn from "../modal-btn/education/update";
import { useCallback } from "react";

export default function Page(){

    const { data  ,isLoading} = trpc.education.gets.useQuery()
    
    type Data =  {
    id: number;
    description: string | null;
    name: string;
    createdAt: string;
    updatedAt: string;
    youtubeLink: string | null;
  } | undefined
    
    const columns = [
        {key:"name",label:"NAME"},
        {key:"youtubeLink",label:"YOUTUBE LINK"},
        {key:"description",label:"DESCRIPTION"},
        {key:"action",label:"ACTION"}
    ];

    const renderCell = useCallback((data: Data , columnKey: React.Key) => {
    if(!data) return null
    const cellValue = data[columnKey as keyof Data];
    switch (columnKey) {
      case "name":
        return (
            <div>
                {data.name}
            </div>
        );
      case "youtubeLink":
        return (
          <div>
            {data.youtubeLink}
          </div>
        );
      case "description":
        return (
          <div>
            {data.description}
          </div>
        );
      case "action":
        return (
          <div className="relative flex items-center gap-2">
            <EditUserModalBtn id={data.id} />
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
            :<TableBody isLoading={isLoading} items={data}  loadingContent={<Spinner />}>
                 {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>} 
                    </TableRow>
                    )}
            </TableBody>}
            </Table>
        </div>
        )
}