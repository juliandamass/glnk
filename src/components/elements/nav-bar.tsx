"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant={"gray-outline"}
        size={"icon"}
        className="flex lg:hidden fixed bottom-2 right-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon="hugeicons:search-01" className="text-xl text-gray-500" />
      </Button>

      <div
        className={cn(
          "fixed lg:sticky z-20 top-0 -left-16 lg:left-0 w-16 h-screen py-4 lg:py-12 transition-all",
          isOpen ? "left-4" : "-left-16",
        )}
      >
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
              <Icon
                icon="hugeicons:search-01"
                className="text-xl text-gray-500"
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon icon="hugeicons:user" className="text-xl text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon
                icon="fluent:chat-28-regular"
                className="text-xl text-gray-500"
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon icon="octicon:bell-24" className="text-xl text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon
                icon="proicons:book-open"
                className="text-xl text-gray-500"
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon
                icon="proicons:book-open"
                className="text-xl text-gray-500"
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon
                icon="proicons:calendar"
                className="text-xl text-gray-500"
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon
                icon="solar:medal-ribbon-linear"
                className="text-xl text-gray-500"
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon
                icon="hugeicons:search-01"
                className="text-xl text-gray-500"
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon icon="mage:box-3d" className="text-xl text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon
                icon="hugeicons:credit-card"
                className="text-xl text-gray-500"
              />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon icon="ep:setting" className="text-xl text-gray-500" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Icon
              icon="hugeicons:logout-02"
              className="text-xl text-gray-500"
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
