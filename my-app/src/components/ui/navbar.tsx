"use client";
// components/Button.tsx
import React from 'react';
import Link from 'next/link'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"

const Navbar: React.FC = () => {
  return (
    <div className='flex flex-row mt-5 mb-5 pb-5 border-b-2 border-customWhite'>

        <p className='ml-5 text-2xl'>ai or not?</p>
            <NavigationMenu className='ml-auto mr-20'>
            <NavigationMenuList className='flex flex-row space-x-4'>
                <NavigationMenuItem>
                    <Link href="/">photos</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/chat">chat</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    leaderboard
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <a href="https://github.com/VincentVinni/DataHacks">github</a>
                </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>
        

    </div>
  );
};

export default Navbar;
