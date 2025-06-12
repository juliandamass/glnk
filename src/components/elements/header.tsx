"use client";

import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="grid grid-cols-12 gap-6 w-full">
      <div className="col-span-9">
        <div className="flex items-center justify-between w-full h-full p-4 bg-white rounded-2xl shadow-sm shadow-gray-100">
          <div className="flex items-center gap-4">
            <Image
              src="/images/placeholder.jpg"
              alt="Image"
              width={256}
              height={256}
              className="w-15 aspect-square rounded-full"
            />
            <div>
              <p className="font-semibold">Emily Carter</p>
              <p className="text-xs text-gray-400">Cardiologist at NHOG</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <p className="text-xs">
                <span className="text-gray-400">My Peers</span> 232
              </p>
              <p className="text-xs">
                <span className="text-gray-400">Following</span> 124
              </p>
            </div>
            <Button>Create Web</Button>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex items-center w-full h-full p-4 bg-white rounded-2xl shadow-sm shadow-gray-100">
          <div className="flex flex-col gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-400">Show connection</span>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-400">
                Show my connections on map
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
