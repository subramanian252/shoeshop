import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div className="flex flex-col items-center gap-y-4 justify-center h-[800px]">
      <Card className="flex flex-col gap-y-6 items-center p-10">
        <div className=" bg-red-500/50 p-6 rounded-3xl">
          <XIcon className="w-20 h-20 text-red-500" />
        </div>
        <h1 className="text-3xl font-semibold">Your Payment got cancelled</h1>
        <p>Your payment got cancelled, try to pay again</p>
        <Button asChild>
          <Link href="/">Shop Now</Link>
        </Button>
      </Card>
    </div>
  );
}

export default Page;
