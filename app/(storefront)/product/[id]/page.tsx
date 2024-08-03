import { addItemsToCart } from "@/app/actions";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import ImageSlider from "@/app/components/ImageSlider";
import { SubmitCartButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { StarIcon, Stars, StarsIcon } from "lucide-react";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}

async function Page(props: Props) {
  const { params } = props;

  const data = await getData(params.id);

  return (
    <>
      <div className="flex justify-between gap-8 mt-14">
        <div className="w-1/2">
          <ImageSlider images={data?.images} />
        </div>
        <div className="w-1/2 flex flex-col gap-y-4">
          <p className="text-4xl font-bold uppercase tracking-tighter">
            {data?.name}
          </p>
          <p className="text-3xl font-medium">${data?.price}</p>
          <div className="flex gap-x-2">
            <StarIcon className="text-yellow-500 fill-yellow-500 h-6 w-6 " />
            <StarIcon className="text-yellow-500 fill-yellow-500 h-6 w-6 " />
            <StarIcon className="text-yellow-500 fill-yellow-500 h-6 w-6 " />
            <StarIcon className="text-yellow-500 fill-yellow-500 h-6 w-6 " />
            <StarIcon className="text-yellow-500 fill-yellow-500 h-6 w-6 " />
          </div>
          <p className="text-muted-foreground mt-7">{data?.description}</p>
          <form action={addItemsToCart}>
            <input type="hidden" name="id" value={params?.id} />
            <SubmitCartButton />
          </form>
        </div>
      </div>
      <div className="mt-24">
        <FeaturedProducts />
      </div>
    </>
  );
}

export default Page;
