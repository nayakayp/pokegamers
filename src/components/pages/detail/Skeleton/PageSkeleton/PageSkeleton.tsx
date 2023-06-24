import React from "react";

type Props = {};

const PageSkeleton = (props: Props) => {
  return (
    <div className="mt-32">
      <div className="animate-pulse duration-75 flex flex-col items-center">
        <div className="rounded-full bg-slate-200 h-[96px] w-[96px]"></div>
        <div className="rounded-full h-10 w-40 bg-slate-200 mt-32"></div>
        <div className="flex gap-4 mt-4">
          <div className="rounded-full h-8 w-20 bg-slate-200"></div>
          <div className="rounded-full h-8 w-20 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
