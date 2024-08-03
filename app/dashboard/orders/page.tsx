import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      amount: true,
      status: true,
      createdAt: true,
      User: {
        select: {
          firstName: true,
          email: true,
        },
      },
    },
  });
}

async function Page(props: Props) {
  noStore();
  const {} = props;

  const data = await getData();

  console.log(data);

  return (
    <Card className="mt-20">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <p className="font-bold">{order.User?.firstName}</p>
                  <p className=" hidden md:block text-sm text-muted-foreground">
                    {order.User?.email}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">Sale</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{order.status}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">
                    {new Intl.DateTimeFormat("en-us").format(
                      new Date(order.createdAt)
                    )}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-medium text-right">
                    ${" "}
                    {new Intl.NumberFormat("en-us").format(order.amount / 100)}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Page;
