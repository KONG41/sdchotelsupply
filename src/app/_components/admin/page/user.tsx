"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import AddUserModalBtn from "../modal-btn/adduser";

export default function UserPage(){

    return (
        <div className="w-full">
            <div className="mb-3">
                <AddUserModalBtn />
            </div>
            <Table aria-label="User table">
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                    <Button>Edit</Button>
                </TableCell>
                </TableRow>
                <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
                <TableCell>
                    <Button>Edit</Button>
                </TableCell>
                </TableRow>
                <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                    <Button>Edit</Button>
                </TableCell>
                </TableRow>
                <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
                <TableCell>
                    <Button>Edit</Button>
                </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </div>
        )
}