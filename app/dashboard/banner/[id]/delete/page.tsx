import { deleteBanner } from "@/app/actions";
import SubmitButton from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

function Page(props: Props) {
  const { params } = props;

  return (
    <div className="flex w-full items-center justify-center h-[80vh]">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. this will permanently delete the
            banner.
          </CardDescription>
        </CardHeader>

        <CardFooter className=" w-full flex justify-between  items-center gap-x-2">
          <Button variant={"outline"} asChild>
            <Link href={"/dashboard/products"}>Cancel</Link>
          </Button>
          <form action={deleteBanner}>
            <input type="hidden" name="id" value={params.id} />
            <SubmitButton text={"Delete"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
