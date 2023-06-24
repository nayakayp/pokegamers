import React from "react";

type Props = {};

const CardSkeleton = (props: Props) => {
  return (
    <div className="border rounded">
      <div className="flex animate-pulse duration-75  px-6 py-4 border-b pb-4 items-center justify-between ">
        <div className="h-4 w-28 bg-slate-200 rounded-full"></div>
        <div className="h-4 w-10 bg-slate-200 rounded-full"></div>
      </div>
      <div className="flex flex-col animate-pulse duration-75 gap-4 px-6 py-4">
        <div className="h-2 w-full bg-slate-200 rounded-full"></div>
        <div className="h-2 w-full bg-slate-200 rounded-full"></div>
        <div className="h-2 w-full bg-slate-200 rounded-full"></div>
        <div className="h-2 w-full bg-slate-200 rounded-full"></div>
        <div className="h-2 w-full bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
