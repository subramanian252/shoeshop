import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

function LoadingSkeleton(props: Props) {
  const {} = props;

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-10  ">
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-1/2 h-10" />
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-1/2 h-10" />
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-1/2 h-10" />
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
