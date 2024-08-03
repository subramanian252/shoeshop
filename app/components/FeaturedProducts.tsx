import React, { Suspense } from "react";
import prisma from "../lib/db";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./loadingSkeleton";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      description: true,
    },
    take: 3,
  });
}

async function FeaturedProducts(props: Props) {
  noStore();

  const {} = props;

  return (
    <>
      <h2 className="text-3xl font-extrabold tracking-tight">
        Featured Products
      </h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProds />
      </Suspense>
    </>
  );
}

export default FeaturedProducts;

async function FeaturedProds() {
  const data = await getData();

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-20">
      {data?.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
}
