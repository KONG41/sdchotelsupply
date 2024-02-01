"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
// import type { Prisma } from "@prisma/client";
import { trpc } from "~/app/_trpc/client";
import EditModalBtn from "../modal-btn/client/update";
import { useCallback } from "react";
import AddModalBtn from "../modal-btn/client/add";

export default function Page(){

    const { data:client  ,isLoading} = trpc.clientRoute.gets.useQuery()

    // not use it because type of image too complicated
    // type Data =  {
    //   status: string | null;
    //   id: number;
    //   name: string;
    //   createdAt: string;
    //   updatedAt: string;
    //   description: string | null;
    //   price: number | null;
    //   popular: boolean | null;
    //   image: Prisma.JsonValue | null;
    //   categoryId: number | null;
    //   category: {
    //       status: string | null;
    //       id: number;
    //       description: string | null;
    //       name: string;
    //       createdAt: string;
    //       updatedAt: string;
    //       parentId: number | null;
    //   } | null;
    // }
    
    const columns = [
        {key:"name",label:"NAME"},
        {key:"year",label:"YEAR"},
        {key:"action",label:"ACTION"}
    ];
// eslint-disable-next-line
    const renderCell = useCallback((data: any , columnKey: React.Key) => {
// eslint-disable-next-line
    const cellValue = data[columnKey as keyof any];
    switch (columnKey) {
      case "name":
        return (
            <div>
                {data.name}
            </div>
        );
      case "year":
        return (
          <div>
            {data.year}
          </div>
        );
      case "action":
        return (
          <div className="relative flex items-center gap-2">
            <EditModalBtn id={data.id} />
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
                <AddModalBtn />
            </div>
            <Table aria-label="client table">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            {isLoading?
                <TableBody isLoading={isLoading} loadingContent={<Spinner className="mt-14" />} >
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableBody>
            :<TableBody isLoading={isLoading} items={client}  loadingContent={<Spinner />}>
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