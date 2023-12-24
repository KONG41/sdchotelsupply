"use client";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { Key } from "react";
import { signOut } from "next-auth/react";

export default function Topbar({user}:{user:{username:string}|null}){
     const items = [
    {
      key: "logout",
      label: "Logout",
    }
  ];

    const handleAction = (key:Key) => {
        switch(key){
            case "logout": signOut();break;
        }
    }

    return(
            <div className="flex justify-end items-center w-full">
              <Dropdown>
                <DropdownTrigger>
                    <Button 
                    variant="light" 
                    >
                    {user?.username}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu onAction={handleAction} aria-label="Dynamic Actions" items={items}>
                    {(item) => (
                    <DropdownItem
                        key={item.key}
                        color={item.key === "logout" ? "danger" : "default"}
                        className={item.key === "logout" ? "text-danger" : ""}
                    >
                        {item.label}
                    </DropdownItem>
                    )}
                </DropdownMenu>
                </Dropdown>
            </div>
    )
}