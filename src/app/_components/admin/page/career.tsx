"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
// import type { Prisma } from "@prisma/client";
import { trpc } from "~/app/_trpc/client";
import EditModalBtn from "../modal-btn/career/update";
import { useCallback } from "react";
import AddModalBtn from "../modal-btn/career/add";

export default function Page(){

    const { data:career ,isLoading} = trpc.career.gets.useQuery()

    // not use it because type of image too complicated
    // type Data =  {

    // }
    
    const columns = [
        {key:"position",label:"POSITION"},
        {key:"term",label:"TERM"},
        {key:"openDate",label:"OPEN DATE"},
        {key:"closeDate",label:"CLOSE DATE"},
        {key:"action",label:"ACTION"}
    ];
// eslint-disable-next-line
    const renderCell = useCallback((data: any , columnKey: React.Key) => {
// eslint-disable-next-line
    const cellValue = data[columnKey as keyof any];
    switch (columnKey) {
      case "position":
        return (
            <div>
                {data.position}
            </div>
        );
      case "term":
        return (
          <div>
            {data.term}
          </div>
        );
      case "openDate":
        return (
          <div>
            {data.openDate}
          </div>
        );
      case "closeDate":
        return (
          <div>
            {data.closeDate}
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
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableBody>
            :<TableBody isLoading={isLoading} items={career}  loadingContent={<Spinner />}>
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