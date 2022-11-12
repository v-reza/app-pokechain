import Image from "next/image";
import React from "react";
import closedChest from "@/dist/assets/closed-chest.png";
import openChest from "@/dist/assets/open-chest.png";
import { Progress } from "flowbite-react";
import { getArena } from "@/utils/constant";
import useUser from "@/hooks/useUser";

const Arena = () => {
  const { currentUser } = useUser();

  return (
    <>
      <div className="border border-slate-600 col-span-4 rounded-md shadow-lg">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-center">
              <span className="text-xl text-slate-600 font-bold py-1">
                Arena
              </span>
            </div>
            <div className="px-4 flex flex-col h-[36rem]  overflow-y-auto">
              {new Array(15).fill(0).map((_, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <div className="flex items-center space-x-4">
                    <Image src={closedChest} width={70} height={70} alt="" />
                    <div className="flex flex-col items-center">
                      <span className="text-slate-600 font-bold">
                        Start match {i}
                      </span>
                      <span className="text-slate-500 font-medium">
                        Start match {i}
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-1 bg-amber-500 hover:bg-amber-600 rounded-md cursor-pointer">
                    <span className="text-sm font-medium text-white">
                      Claim
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-20 flex items-center justify-between">
          <div className="px-4">Arena 1</div>
          <div className="w-60 px-4 flex flex-col">
            {getArena(currentUser?.profile.tier)?.required_point_level_up -
              currentUser?.profile.point >
            0 ? (
              <>
                <span className="text-sm">
                  Need{" "}
                  {getArena(currentUser?.profile.tier)
                    ?.required_point_level_up - currentUser?.profile.point}{" "}
                  points to level up
                </span>
                <Progress progress={currentUser?.profile?.point / 10} />
              </>
            ) : (
              <div className="rounded-lg bg-indigo-500 hover:bg-indigo-600 cursor-pointer p-2 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  Level up
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Arena;
