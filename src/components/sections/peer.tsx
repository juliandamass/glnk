"use client";

import { calculateAge, cn, normalizeText, scrollIntoView } from "@/lib/utils";
import { IHcp } from "@/types/hcp.types";
import { Icon } from "@iconify/react";
import { isUndefined } from "lodash";
import debounce from "lodash/debounce";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Badge from "../ui/badge";
import { Button } from "../ui/button";
import ConnectionsGraph from "./connections-graph";

import mockData from "../../../public/files/mock_hcp_graph_data.json";

const initialHcp = mockData.nodes[0] as IHcp;

const PeerSpace = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const hcpData = mockData.nodes;

  const [activeHcp, setActiveHcp] = useState<IHcp>(initialHcp);
  const [matchedHcpsResult, setMatchedHcpsResult] = useState<
    IHcp[] | undefined
  >(undefined);

  const [searchKeyword, setSearchKeyword] = useState<string>();

  const debouncedSearch = debounce((value) => setSearchKeyword(value), 300);

  useEffect(() => {
    if (searchKeyword) {
      const normalizedKeyword = normalizeText(searchKeyword);
      const keywordTokens = normalizedKeyword.split(" ");

      const matchedHcps: any[] = hcpData.filter((hcp) => {
        const normalizedName = normalizeText(hcp.name);
        return (
          hcp.role === "researcher" &&
          keywordTokens.every((token) => normalizedName.includes(token))
        );
      });

      setMatchedHcpsResult(matchedHcps);
    } else {
      setMatchedHcpsResult(undefined);
    }
  }, [searchKeyword, hcpData]);

  const handleResetSearch = () => {
    setMatchedHcpsResult(undefined);
    setSearchKeyword(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="p-2 lg:p-4 bg-white rounded-2xl shadow-sm shadow-gray-100">
        <div className="grid grid-cols-11 gap-4">
          <div className="col-span-9">
            <div
              className={cn(
                "group relative",
                !isUndefined(matchedHcpsResult) && "active",
              )}
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search"
                  className="w-full pr-4 pl-8 py-2 border border-gray-300 rounded-xl text-sm outline-none group-[.active]:rounded-b-none"
                  onChange={(event) => debouncedSearch(event.target.value)}
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-2">
                  {searchKeyword ? (
                    <button
                      className="flex cursor-pointer"
                      onClick={handleResetSearch}
                    >
                      <Icon
                        icon="solar:close-circle-linear"
                        className="text-xl text-gray-400"
                      />
                    </button>
                  ) : (
                    <Icon
                      icon="hugeicons:search-01"
                      className="text-xl text-gray-400"
                    />
                  )}
                </div>
              </div>
              <div className="absolute z-10 w-full h-auto max-h-36 p-2 space-y-0.5 bg-white rounded-b-xl border border-gray-300 border-t-0 hidden group-[.active]:block overflow-x-auto">
                {!isUndefined(matchedHcpsResult) && (
                  <>
                    {matchedHcpsResult.length > 0 ? (
                      <>
                        {matchedHcpsResult.map((hcp, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-2 w-full p-1 rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
                            onClick={() => {
                              handleResetSearch();
                              setActiveHcp(hcp);
                              scrollIntoView("ForceGraph2D");
                            }}
                          >
                            <Image
                              src={hcp.images}
                              alt="HCP"
                              width={256}
                              height={256}
                              className="w-8 aspect-square rounded-lg"
                            />
                            <div className="text-left space-y-0.5">
                              <p className="leading-none font-medium">
                                {hcp.name}
                              </p>
                              <p className="leading-none text-xs text-gray-600 capitalize">
                                {hcp.role}
                              </p>
                            </div>
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="text-center">
                        <span className="text-sm text-gray-500">No data</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="relative">
              <select className="w-full pr-4 pl-8 py-2 border border-gray-300 rounded-xl text-sm">
                <option value="">Filter</option>
              </select>
              <button className="absolute top-1/2 -translate-y-1/2 left-2">
                <Icon
                  icon="hugeicons:filter"
                  className="text-xl text-gray-400"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-semibold">Peer Space</h3>

        <div className="rounded-2xl shadow-[0_0px_8px_0_rgb(0_0_0_/_0.1),_0_1px_2px_-1px_rgb(0_0_0_/_0.1)] shadow-gray-200 overflow-hidden">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-5">
              <div className="flex flex-col gap-4 p-2 lg:p-4">
                <div className="w-full p-2 bg-white rounded-xl">
                  <div className="flex flex-col items-center">
                    <div className="w-full h-40 border border-gray-200 rounded-t-xl overflow-hidden">
                      <Image
                        src="/images/map.jpg"
                        alt="Map"
                        width={512}
                        height={512}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-28 -mt-18 mb-4 aspect-square rounded-full border-4 border-white overflow-hidden">
                      <Image
                        src={activeHcp.images}
                        alt="Profile Picture"
                        width={512}
                        height={512}
                        className="w-full h-full"
                      />
                    </div>
                    <p className="mb-2 text-2xl">{activeHcp.name}</p>
                    <div className="flex gap-2 mb-2">
                      <Badge>
                        <span className="capitalize">{activeHcp.role}</span>
                      </Badge>
                      <Badge>
                        {calculateAge(activeHcp.dob)}, {activeHcp.address}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="mb-2 text-gray-600">{activeHcp.headline}</p>
                    </div>
                    <div className="flex items-center divide-x divide-gray-300 mb-2">
                      <div className="px-2 text-center">
                        <p className="text-sm text-gray-600">Peers</p>
                        <p className="text-sm">{activeHcp.peers}</p>
                      </div>
                      <div className="px-2 text-center">
                        <p className="text-sm text-gray-600">Following</p>
                        <p className="text-sm">{activeHcp.following}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button className="px-12">View Profile</Button>
                      <Button variant={"gray-outline"} className="px-12">
                        Resume
                      </Button>
                      <Button
                        variant={"gray-outline"}
                        size={"icon"}
                        className="size-9 rounded-lg"
                      >
                        <Icon
                          icon="heroicons-outline:dots-vertical"
                          className="text-xl text-gray-500"
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full p-2 bg-white rounded-xl">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2 px-4 py-3 bg-gray-100 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="ph:handshake"
                          className="text-lg text-gray-500"
                        />
                        <span className="text-sm text-gray-500">
                          Patient Served
                        </span>
                      </div>
                      <p className="text-2xl font-semibold">
                        {activeHcp.patientServed}
                      </p>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mingcute:trending-up-line"
                          className="text-sm text-green-500"
                        />
                        <span className="text-[10px] text-green-500">+20%</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-4 py-3 bg-gray-100 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Icon
                          icon="ph:star-half-duotone"
                          className="text-lg text-gray-500"
                        />
                        <span className="text-sm text-gray-500">
                          Success Rate
                        </span>
                      </div>
                      <p className="text-2xl font-semibold">
                        {activeHcp.successRate}%
                      </p>
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="mingcute:trending-up-line"
                          className="text-sm text-green-500"
                        />
                        <span className="text-[10px] text-green-500">+5%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">About</p>
                    <p className="text-sm text-gray-600">{activeHcp.bio}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Education</p>
                    <div className="space-y-2">
                      {activeHcp.education.map((education, index) => (
                        <div
                          key={index}
                          className="flex gap-2 p-2 bg-gray-100 rounded-lg"
                        >
                          <Image
                            src="/images/placeholder.jpg"
                            alt="Image"
                            width={256}
                            height={256}
                            className="shrink-0 w-10 h-10 rounded-lg"
                          />
                          <div>
                            <p className="font-medium">{education.name}</p>
                            <p className="text-sm text-gray-500">
                              {education.field}
                            </p>
                            <p className="text-sm text-gray-500">
                              Specialization in {education.specialization}
                            </p>
                            <p className="text-sm text-gray-500">
                              {education.period[0]} - {education.period[1]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="w-full h-96 lg:h-full">
                <ConnectionsGraph
                  activeHcp={activeHcp}
                  onNodeClick={setActiveHcp}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerSpace;
