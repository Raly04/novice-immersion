import React from "react";
import t_emoji from "../../assets/t_emoji.gif";
import startedIcon from "../../assets/fuse.gif";
import OrientationStartedList from "./orientation.started.list";
import tipsIcon from "../../assets/tips.png";

export function OrientationGetStarted() {
  return (
    <div className=" w-full bg-orBack shadow-small grid grid-cols-2 overflow-hidden rounded-md my-8 text-gray-300">
      <div className=" h-full flex items-center justify-center w-5/6">
        <img src={t_emoji} alt="" className="" />
      </div>
      <div className=" flex-row py-12 pr-12">
        <h1 className="text-6xl font-bold">Comment bien s'adapter ?</h1>
        <div className="flex items-center">
          <img src={startedIcon} alt="" className="w-16" />
          <p className="ml-2 text-xl">Get started</p>
        </div>
        <div>
          <OrientationStartedList />
          <div className=" border-secondary border-l-4 p-2 bg-[#925ff036] rounded-sm">
            <div className="flex items-center">
              <img src={tipsIcon} alt="" className="w-8" />
              <p className="text-sm ml-2">Notez bien</p>
            </div>
            <p className=" text-xs italic normal-case ml-10 ">
              LMD signife Licence , Master , Doctorat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
