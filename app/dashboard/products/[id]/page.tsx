import EditForm from "@/app/components/EditForm";
import prisma from "@/app/lib/db";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  params: {
    id: string;
  };
}

async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: String(id),
    },
  });

  return data;
}

async function Page(props: Props) {
  noStore();
  const { params } = props;

  const data = await getData(params.id);

  return (
    <>
      <EditForm data={data} id={params.id} />
    </>
  );
}

export default Page;
