import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <div className="flex justify-between gap-8 mt-14">
      <div className="w-1/2">
        <Skeleton className="w-full h-[700px]" />
        <div className="grid grid-cols-5 gap-4 mt-10">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-6">
        <Skeleton className="w-1/3 h-10" />
        <Skeleton className="w-1/3 h-10" />
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}

export default Loading;
