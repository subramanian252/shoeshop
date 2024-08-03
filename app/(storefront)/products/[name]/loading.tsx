import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <div className="mt-10">
      <Skeleton className="w-1/6 h-10 mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-10  ">
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

export default Loading;
