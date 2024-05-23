"use client";
// components/Button.tsx
import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <div className="border-b border-customWhite flex items-center justify-between py-3 px-5">
      <Link href="/" className="font-oran text-xl">ai or not?</Link>
      <ul className="flex items-center text-sm gap-4">
        <Link href="/" className="px-3.5 pb-1.5 pt-1 hover:bg-customWhite/70 active:scale-95 transition bg-customWhite rounded-2xl">photos</Link>
        <Link href="/chat" className="px-3.5 pb-1.5 pt-1 hover:bg-customWhite/70 active:scale-95 transition bg-customWhite rounded-2xl">chat</Link>
        <Link href="/leaderboard" className="px-3.5 pb-1.5 pt-1 hover:bg-customWhite/70 active:scale-95 transition bg-customWhite rounded-2xl">leaderboard</Link>
        <Link href="/about" className="px-3.5 pb-1.5 pt-1 hover:bg-customWhite/70 active:scale-95 transition bg-customWhite rounded-2xl">about</Link>
        <Link href="https://github.com/VincentVinni/DataHacks" target="_blank" className="text-2xl hover:opacity-80 transition active:scale-95"><FaGithub/></Link>
      </ul>
    </div>
  )
};

export default Navbar;
