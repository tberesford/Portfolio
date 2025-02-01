import React from "react";
import { Navbar, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, NavbarContent } from "@nextui-org/navbar";
import Link from "next/link";

export default function NavbarComponent(){
    const menuItems = [
        {title: "Power Dashboard", url: "https://www.powerdashboard.co.uk"},
        {title: "Solar", url: "/solar"}, 
        {title: "Zappi Charger", url: "https://github.com/tberesford/Zappi"},
        {title: "Connect 4", url: "https://github.com/tberesford/Connect4"},
    ]

    return (
        <Navbar maxWidth="full">
            <NavbarContent>
                <NavbarMenuToggle className="lg:hidden px-4"/>
                <NavbarBrand className="md:px-10">
                    <NavbarItem className="text-2xl">
                        <Link href={'/'}>Tom Beresford</Link>
                    </NavbarItem>
                </NavbarBrand>
            </NavbarContent>
                            
            <NavbarContent className="hidden lg:flex md:gap-10 gap-20 pr-10 xl:pr-0" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={index} className="text-lg md:text-medium">
                        <Link href={item.url}>{item.title}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent className="hidden xl:flex gap-10 xl:pr-10" justify="end">
                <NavbarItem className="text-lg">
                    <Link href="https://github.com/tberesford">Github</Link>
                </NavbarItem>
                <NavbarItem className="text-lg">
                    <Link href="https://www.linkedin.com/in/tom-beresford-20wi01/">LinkedIn</Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                <p className="font-bold">Projects</p>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index} className="m-2 mt-4">
                        <Link href={item.url}>{item.title}</Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}