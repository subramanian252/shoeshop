"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  images: string[] | undefined;
}

function ImageSlider(props: Props) {
  const { images } = props;

  const [currentImage, setCurrentImage] = React.useState(0);

  if (!images) return null;

  return (
    <>
      <div className="relative h-[700px] w-full shadow-lg">
        <Image
          src={images[currentImage]}
          alt={"Product Image"}
          fill
          className="object-cover w-full h-full rounded-xl"
        />

        <Button
          onClick={() => {
            if (currentImage > 0) setCurrentImage(currentImage - 1);
            else setCurrentImage(images.length - 1);
          }}
          className="absolute top-1/2 left-4 "
          variant={"default"}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => {
            if (currentImage < images.length - 1)
              setCurrentImage(currentImage + 1);
            else setCurrentImage(0);
          }}
          className="absolute top-1/2 right-4 "
          variant={"default"}
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-10">
        {images?.map((image, index) => (
          <div
            key={index}
            className="relative h-[100px]  cursor-pointer"
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image}
              alt={"Product Image"}
              fill
              className={cn(
                currentImage === index && "border-2 border-primary shadow-lg",
                "object-cover w-full h-full object-center  rounded-lg transition-all "
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ImageSlider;
