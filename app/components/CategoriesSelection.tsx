import Link from "next/link";
import React from "react";

import all from "@/public/all.jpeg";
import men from "@/public/men.jpeg";

import women from "@/public/women.jpeg";
import Image from "next/image";

interface Props {}

function CategoriesSelection(props: Props) {
  const {} = props;

  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Shop By Category
        </h1>
        <Link className="text-primary font-semibold" href="/products/all">
          Browse all Products
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 lg:gap-8 h-[80vh]">
        <div className="relative row-span-2">
          <Image
            alt="all"
            src={all}
            className="object-cover w-full h-full object-center rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent transition-all rounded-lg to-black  opacity-50" />
          <Link href="/products/all" className="absolute bottom-10 left-10">
            <p className="text-3xl font-extrabold text-white">All Products</p>
            <p className="text-white/70 font-semibold">Shop Now</p>
          </Link>
        </div>
        <div className="relative row-span-1">
          <Image
            alt="all"
            src={men}
            className="object-cover w-full h-full object-bottom rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent transition-all rounded-lg to-black  opacity-50" />
          <Link href="/products/men" className="absolute bottom-10 left-10">
            <p className="text-3xl font-extrabold text-white">Men</p>
            <p className="text-white/70 font-semibold">Shop Now</p>
          </Link>
        </div>
        <div className="relative row-span-1">
          <Image
            alt="all"
            src={women}
            className="object-cover w-full h-full object-bottom rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent transition-all to-black rounded-lg  opacity-50" />
          <Link href="/products/all" className="absolute bottom-10 left-10">
            <p className="text-3xl font-extrabold text-white">Women</p>
            <p className="text-white/70 font-semibold">Shop Now</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoriesSelection;
