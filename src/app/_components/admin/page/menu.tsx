
"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import {Tabs, Tab} from "@nextui-org/react";
import { trpc } from "~/app/_trpc/client";
import AddMenuModalBtn from "../modal-btn/menu/add";
import EditSubmenuModalBtn from "../modal-btn/submenu/update";
import EditMenuModalBtn from "../modal-btn/menu/update";
import { useCallback } from "react";
import AddSubMenuModalBtn from "../modal-btn/submenu/add";

export default function MenuPage(){

    const { data:menu , error ,isLoading} = trpc.menu.gets.useQuery()
    const { data:submenu , error:suberror ,isLoading:subisLoading} = trpc.subMenu.gets.useQuery()
    type Menu =  {
        name: string;
        description: string | null;
        status: string | null;
        id: number;
    }
    
    type SubMenu = {
        name: string;
        status: string | null;
        description: string | null;
        parent: {
            name: string;
        } | null;
        id: number;
        parentId: number | null;
    }
    
    
    const menu_columns = [
        {key:"name",label:"NAME"},
        {key:"status",label:"STATUS"},
        {key:"description",label:"DESCRIPTION"},
        {key:"action",label:"ACTION"}
    ];

    const submenu_columns = [
        {key:"name",label:"NAME"},
        {key:"status",label:"STATUS"},
        {key:"parent",label:"PARENT"},
        {key:"description",label:"DESCRIPTION"},
        {key:"action",label:"ACTION"}
    ];

    const renderCell = useCallback((menu: Menu , columnKey: React.Key) => {

        const cellValue = menu[columnKey as keyof Menu];
        switch (columnKey) {
        case "name":
            return (
                <div>
                    {menu.name}
                </div>
            );
        case "status":
            return (
            <div>
                {menu.status}
            </div>  
            );
        case "description":
            return (
            <div>
                {menu.description}
            </div>
            );
        case "action":
            return (
            <div className="relative flex items-center gap-2">
                <EditMenuModalBtn id={menu.id} />
            </div>
            );
        default:
            return <>
            {cellValue?cellValue:''}
            </>;
        }
    }, []);

    const renderSubMenuCell = useCallback((menu: SubMenu , columnKey: React.Key) => {

        const cellValue = menu[columnKey as keyof SubMenu];
        switch (columnKey) {
        case "name":
            return (
                <div>
                    {menu.name}
                </div>
            );
        case "status":
            return (
            <div>
                {menu.status}
            </div>  
            );
        case "description":
            return (
            <div>
                {menu.description}
            </div>
            );
        case "parent":
            return (
            <div>
                {menu.parent?.name}
            </div>
            );
        case "action":
            return (
            <div className="relative flex items-center gap-2">
                <EditSubmenuModalBtn id={menu.id} />
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
            <Tabs aria-label="Options">
                <Tab key="menu" title="Menu">
                    <div className="mb-3">
                        <AddMenuModalBtn />
                    </div>
                    <Table aria-label="User table">
                        <TableHeader columns={menu_columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        {isLoading?
                            <TableBody emptyContent={"No rows to display."} isLoading={isLoading} loadingContent={<Spinner className="mt-14" />} >
                                <TableRow>
                                    <TableCell> </TableCell>
                                    <TableCell> </TableCell>
                                    <TableCell> </TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                            </TableBody>
                        :<TableBody isLoading={isLoading} items={menu}  loadingContent={<Spinner />}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>} 
                                </TableRow>
                                )}
                        </TableBody>}
                    </Table>
                </Tab>
                <Tab key="submenu" title="Sub Menu">
                    <div className="mb-3">
                        <AddSubMenuModalBtn />
                    </div>
                    <Table aria-label="User table">
                        <TableHeader columns={submenu_columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        {subisLoading?
                            <TableBody emptyContent={"No rows to display."} isLoading={isLoading} loadingContent={<Spinner className="mt-14" />} >
                                <TableRow>
                                    <TableCell> </TableCell>
                                    <TableCell> </TableCell>
                                    <TableCell> </TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                            </TableBody>
                        :<TableBody isLoading={subisLoading} items={submenu}  loadingContent={<Spinner />}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderSubMenuCell(item, columnKey)}</TableCell>} 
                                </TableRow>
                                )}
                        </TableBody>}
                    </Table>
                </Tab>
            </Tabs>
        </div>
        )
}