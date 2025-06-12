"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { Button } from "../ui/button";

const NavBar = () => {
  return (
    <div className="sticky top-0 w-16 h-screen py-12">
      <div className="flex flex-col justify-between gap-4 w-full h-full p-2 bg-white rounded-2xl shadow-sm shadow-gray-100">
        <Image
          src="/images/placeholder.jpg"
          alt="Image"
          width={256}
          height={256}
          className="w-full aspect-square rounded-2xl"
        />
        <div className="flex flex-col h-full gap-2 overflow-y-auto">
          <Button variant="gray-outline" size="icon">
            <Icon icon="hugeicons:search-01" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="hugeicons:user" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="fluent:chat-28-regular" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="octicon:bell-24" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="lucide:box" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="lucide:box" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="lucide:box" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="lucide:box" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="lucide:box" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="lucide:box" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="lucide:box" className="text-xl text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon icon="lucide:box" className="text-xl text-gray-500" />
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <Icon icon="lucide:box" className="text-xl text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
