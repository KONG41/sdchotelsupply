"use client";
import Link from 'next/link';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

export default function AdminSidebar(){

    return(
        <Sidebar>
        <Menu>
            <MenuItem component={<Link href={"/dashboard/user"} />}>User</MenuItem>
            <MenuItem component={<Link href="/dashboard/menu"/>}>Menu</MenuItem>
            <MenuItem component={<Link href="/dashboard/product"/>}>Product</MenuItem>
            <MenuItem component={<Link href="/dashboard/promotion"/>}>Promotion</MenuItem>
            <MenuItem component={<Link href="/dashboard/event"/>}>Event</MenuItem>
            <MenuItem component={<Link href="/dashboard/client"/>}>Client</MenuItem>
            <MenuItem component={<Link href="/dashboard/education"/>}>Education</MenuItem>
            <MenuItem component={<Link href="/dashboard/career"/>}>Career</MenuItem>
        </Menu>
        </Sidebar>
    )
}