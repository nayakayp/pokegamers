import React from "react";

type Props = {};

const Skeleton = (props: Props) => {
  return (
    <div className="border shadow rounded-md p-4 flex flex-col justify-center h-[178px] w-64 mx-auto">
      <div className="animate-pulse duration-75 flex flex-col items-center">
        <div className="rounded-full bg-slate-200 h-10 w-10 mb-6"></div>
        <div className="h-2 w-6 bg-slate-200 rounded-full mb-4"></div>
        <div className="h-2 w-28 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;
