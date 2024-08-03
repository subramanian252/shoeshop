import ProductCard from "@/app/components/ProductCard";
import prisma from "@/app/lib/db";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    name: string;
  };
}

async function getData(category: string) {
  switch (category) {
    case "all":
      return await prisma.product.findMany({});
    case "men":
      return await prisma.product.findMany({
        where: {
          category: "men",
        },
      });
    case "women":
      return await prisma.product.findMany({
        where: {
          category: "women",
        },
      });
    case "kids":
      return await prisma.product.findMany({
        where: {
          category: "kids",
        },
      });
    default:
      return null;
  }
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const data = await getData(params.name);

  if (!data) return null;

  return (
    <>
      <h1 className="my-10 text-3xl font-semibold">
        Products for {params.name}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-10  ">
        {data?.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </>
  );
}

export default Page;
