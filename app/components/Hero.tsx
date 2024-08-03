import React from "react";
import prisma from "../lib/db";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

async function Hero(props: Props) {
  noStore();
  const {} = props;

  const data = await getData();

  return (
    <div className="rounded-2xl">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {data?.map((banner) => (
            <CarouselItem key={banner.id} id={banner.id}>
              <div className="relative h-[60vh] lg:h-[80vh] ">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover object-center rounded-2xl w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white to-black opacity-5" />
                <div className="shadow-2xl text-3xl font-extrabold bg-black/75 rounded-md p-6 px-10 text-white absolute top-24 left-24 hover:scale-110 transition-all">
                  <p>{banner.title}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </div>
  );
}

export default Hero;
