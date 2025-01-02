import React from "react";
import { Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, NavbarContent } from "@nextui-org/navbar";

export default function NavbarComponent(){
    const menuItems = [
        "Power Dashboard",
        "Solar",
        "Zappi Charger",
        "Connect 4",
    ]

    return (
        <Navbar maxWidth="full">
            <NavbarContent>
                <NavbarMenuToggle className="md:hidden px-4"/>
                <NavbarBrand className="md:px-10">
                    <NavbarItem>
                        Tom Beresford
                    </NavbarItem>
                </NavbarBrand>
            </NavbarContent>
                            
            <NavbarContent className="hidden md:flex md:gap-16 gap-20 pr-10 xl:pr-0" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={index}>
                        {item}
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent className="hidden xl:flex gap-10 xl:pr-10" justify="end">
                <NavbarItem>
                    Github
                </NavbarItem>
                <NavbarItem>
                    LinkedIn
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index} className="m-2 mt-4">
                        {item}
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}