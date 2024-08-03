import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  } | null;
}

function ProductCard(props: Props) {
  const { data } = props;

  return (
    <div className="rounded-lg">
      <Carousel className="w-full mx-auto ">
        <CarouselContent>
          {data?.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[400px] ">
                <Image
                  src={image}
                  alt={"Product Image"}
                  fill
                  className="object-cover object-center w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
      <div className="mt-5 flex flex-row justify-between items-center">
        <p className="text-2xl font-extrabold">{data?.name}</p>
        <p className="text-xl font-semibold bg-primary/50 text-primary ring-primary/50 ring-1 p-2 rounded-md">
          ${data?.price}
        </p>
      </div>
      <p className=" mt-2 text-muted-foreground">{data?.description}</p>
      <Button asChild className="w-full  mt-5 rounded-lg">
        <Link href={`/product/${data?.id}`}>View Details</Link>
      </Button>
    </div>
  );
}

export default ProductCard;
