"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import {
  Code,
  House,
  LaptopMinimal,
  Lightbulb,
  ShoppingCart,
} from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <nav className="h-[64px] bg-[#161616] flex justify-center">
        <div className="flex justify-between items-center max-w-[1140px] w-full text-white">
          <div className="px-4">HiperStresser</div>
          <Button className="lg:block hidden md:block bg-[#767676] border-white hover:bg-black">
            Login
          </Button>
          <div className="lg:hidden md:hidden ">
            {/* Hamburger Icon */}
            <div className="lg:hidden">
              <div className="px-5">
                <button
                  onClick={toggleMenu}
                  className="text-white focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Links */}
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } lg:block absolute lg:relative top-16 left-0 right-0 lg:top-0 lg:flex lg:space-x-6 bg-[#181818] lg:bg-transparent p-4 lg:p-0 z-50`}
            >
              <Link
                href="/dashboard"
                className=" flex justify-center text-white py-4 lg:inline"
              >
                <House className="" />
                <div className="pl-2">Dashboard</div>
              </Link>
              <Link
                href=""
                className=" flex justify-center text-white py-4 lg:inline"
              >
                <LaptopMinimal />
                <div className="pl-2">Painel</div>
              </Link>
              <Link
                href="/"
                className=" flex justify-center text-white py-4 lg:inline"
              >
                <Code />
                <div className="pl-2">API</div>
              </Link>
              <Link
                href="/store"
                className=" flex justify-center text-white py-4 lg:inline"
              >
                <ShoppingCart />
                <div className="pl-2">Store</div>
              </Link>
              <Link
                href="/"
                className=" flex justify-center text-white py-4 lg:inline"
              >
                <Lightbulb />
                <div className="pl-2">Methods</div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
