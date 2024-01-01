"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import type { Prisma } from "@prisma/client";
import { trpc } from "~/app/_trpc/client";
import EditModalBtn from "../modal-btn/promotion/update";
import { useCallback } from "react";
import AddModalBtn from "../modal-btn/promotion/add";

export default function Page(){

    const { data:promotion , error ,isLoading} = trpc.promotion.gets.useQuery()

    // not use it because type of image too complicated
    type Data =  {
      status: string | null;
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
      description: string | null;
      price: number | null;
      popular: boolean | null;
      image: Prisma.JsonValue | null;
      categoryId: number | null;
      category: {
          status: string | null;
          id: number;
          description: string | null;
          name: string;
          createdAt: string;
          updatedAt: string;
          parentId: number | null;
      } | null;
    }
    
    const columns = [
        {key:"name",label:"NAME"},
        {key:"status",label:"STATUS"},
        {key:"action",label:"ACTION"}
    ];

    const renderCell = useCallback((product: any , columnKey: React.Key) => {

    const cellValue = product[columnKey as keyof any];
    switch (columnKey) {
      case "name":
        return (
            <div>
                {product.name}
            </div>
        );
      case "status":
        return (
          <div>
            {product.status}
          </div>
        );
      case "action":
        return (
          <div className="relative flex items-center gap-2">
            <EditModalBtn id={product.id} />
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
            <Table aria-label="Promotion table">
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
            :<TableBody isLoading={isLoading} items={promotion}  loadingContent={<Spinner />}>
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