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
} from "@nextui-org/react";
import logo from "~/assets/logo_t.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { data } = trpc.menu.gets.useQuery()
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
            { data && data.map((item, index) => 
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
            { data && data.map((item, index) => (
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
