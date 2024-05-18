"use client";
// components/Button.tsx
import React from 'react';
import Link from 'next/link'

const Navbar: React.FC = () => {
  return (
    <div>
        <p>ai or not?</p>

        <nav>
        <ul>
            <li>
            <Link href="/">
                about
            </Link>
            </li>
            <li>
            <Link href="/about">
                leaderboard
            </Link>
            </li>
            <li>
            <Link href="/contact">
                github
            </Link>
            </li>
        </ul>
        </nav>
    </div>
  );
};

export default Navbar;