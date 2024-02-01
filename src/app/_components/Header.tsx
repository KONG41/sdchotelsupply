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
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu,
  Link
} from "@nextui-org/react";
import logo from "~/assets/logo_t.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import Link from "next/link";
import { GoChevronDown } from "react-icons/go";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  // eslint-disable-next-line
  const { data:menuData }  = trpc.menu.gets.useQuery();
  console.log(menuData)
  return (
    // <div className="container max-w-[1268px] mx-auto">
    <Navbar onMenuOpenChange={setIsMenuOpen}  isMenuOpen={isMenuOpen} maxWidth='full' isBordered>
      <div className="container max-w-[1268px] mx-auto flex items-center">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden h-[20px]"
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
                item.subMenus.length > 0 ? 
                <Dropdown key={`${item}-${index}`}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                       disableRipple
                       endContent={<GoChevronDown />}
                      
                       className={` ${pathname === item.description ? "text-[#DB2230]" : "text-[black]"} p-0 bg-transparent data-[hover=true]:bg-transparent text-md uppercase rounded-none focus-visible:outline-none`}
                      >
                        {item.name}
                      </Button>
                      
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label="ACME features"
                    className="min-w-fit rounded-none"
                    itemClasses={{
                      base: "gap-4",
                    }}
                  > 
                    { item.subMenus.filter(subMenu =>  subMenu.status === 'active').map(subMenuItem => 
                      <DropdownItem
                        key={subMenuItem.name}
                        
                      >
                          <Link
                            className={
                              pathname === subMenuItem.description ? "text-[#DB2230]" : "text-[black]"
                            }
                            href={item.description +"?cat="+subMenuItem.id}
                          
                          >
                            {subMenuItem.name}
                          </Link>
                      </DropdownItem>
                    )
                    
                    }
                    
                    
                  </DropdownMenu>
                </Dropdown> 
                
                :
                <NavbarItem key={`${item}-${index}`}>
                  <Button
                   disableRipple
                   className={` ${pathname === item.description ? "text-[#DB2230]" : "text-[black]"} p-0 bg-transparent data-[hover=true]:bg-transparent text-md uppercase rounded-none`}
                  >
                     <Link
                      href={`${item.description}`}
                      className="text-black"
                    >
                      {item.name}
                    </Link>
                  </Button>
                 
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
            {/* { menuData && menuData.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className={`w-full ${
                    pathname === item.description ? "text-[#DB2230]" : "text-black"
                  }`}
                  href={`${item.description}`}
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))} */}
            { menuData && menuData.map((item, index) => 
              item.status == "active" && (
                item.subMenus.length > 0 ? 
                <Dropdown key={`${item}-${index}`}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                       disableRipple
                       endContent={<GoChevronDown />}
                      
                       className={` ${pathname === item.description ? "text-[#DB2230]" : "text-[black]"} p-0 bg-transparent data-[hover=true]:bg-transparent text-md uppercase rounded-none focus-visible:outline-none justify-start`}
                      >
                        {item.name}
                      </Button>
                      
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label="ACME features"
                    className="min-w-fit rounded-none"
                    itemClasses={{
                      base: "gap-4",
                    }}
                  > 
                    { item.subMenus.filter(subMenu =>  subMenu.status === 'active').map(subMenuItem => 
                      <DropdownItem
                        key={subMenuItem.name}
                        
                      >
                          <Link
                            className={
                              pathname === subMenuItem.description ? "text-[#DB2230]" : "text-[black]"
                            }
                            href={item.description +"?cat="+subMenuItem.id}
                          >
                            {subMenuItem.name}
                          </Link>
                      </DropdownItem>
                    )
                    
                    }
                    
                    
                  </DropdownMenu>
                </Dropdown> 
                
                :
                <NavbarItem key={`${item}-${index}`}>
                  <Button
                   disableRipple
                   className={` ${pathname === item.description ? "text-[#DB2230]" : "text-[black]"} p-0 bg-transparent data-[hover=true]:bg-transparent text-md uppercase rounded-none justify-start`}
                  >
                     <Link
                      href={`${item.description}`}
                      className="text-black"
                    >
                      {item.name}
                    </Link>
                  </Button>
                 
                </NavbarItem>
              )
            )}
          </NavbarMenu>
      </div>
    </Navbar>
    // </div>
    
  );
};

export default Header;
