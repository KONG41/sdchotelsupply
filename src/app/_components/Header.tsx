"use client";

import React from "react";
import {trpc} from "@/app/_trpc/client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu
} from "@nextui-org/react";
import logo from "~/assets/logo_t.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { data:menuData }  = trpc.menu.gets.useQuery<any>();
  const {data:subMenuData} = trpc.subMenu.gets.useQuery<any>();
  const [mainMenu, setMainMenu] = React.useState<any>(menuData)
  const item = mainMenu.find(obj => obj.id === 2);
  if(item){
    item.subMenu = 'Hello'
  }
  console.log('mainMenu:',mainMenu);
  console.log(subMenuData);
  return (
    // <div className="container max-w-[1268px] mx-auto">
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth='full' isBordered>
      <div className="container max-w-[1268px] mx-auto flex items-center">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Link href="/"><Image src={logo} alt="logo png" className="w-[150px]" /></Link>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent
            className="hidden gap-4 uppercase sm:flex"
            justify="center"
          >
            { menuData && menuData.map((item, index) => 
              item.status == "active" && (
                <NavbarItem key={`${item}-${index}`}>
                  <Link
                    className={
                      pathname === item.description ? "text-[#DB2230]" : "text-[black]"
                    }
                    href={item.description}
                  >
                    {item.name}
                  </Link>
                </NavbarItem>
              )
            )}
            <Dropdown>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    
                    radius="sm"
                    variant="light"
                  >
                    Features
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
              >
                <DropdownItem
                  key="autoscaling"
                  description="ACME scales apps to meet user demand, automagically, based on load."
                
                >
                  Autoscaling
                </DropdownItem>
                <DropdownItem
                  key="usage_metrics"
                  description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                
                >
                  Usage Metrics
                </DropdownItem>
                <DropdownItem
                  key="production_ready"
                  description="ACME runs on ACME, join us and others serving requests at web scale."
                
                >
                  Production Ready
                </DropdownItem>
                <DropdownItem
                  key="99_uptime"
                  description="Applications stay on the grid with high availability and high uptime guarantees."
                
                >
                  +99% Uptime
                </DropdownItem>
                <DropdownItem
                  key="supreme_support"
                  description="Overcome any challenge with a supporting team ready to respond."
                
                >
                  +Supreme Support
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                as={Link}
                className="bg-[#DB2230] text-white"
                href="/contact"
                variant="flat"
              >
                Contact us
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu>
            { menuData && menuData.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className={`w-full ${
                    pathname === item.description ? "text-[#DB2230]" : "text-black"
                  }`}
                  href={item.description}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
      </div>
    </Navbar>
    // </div>
    
  );
};

export default Header;
