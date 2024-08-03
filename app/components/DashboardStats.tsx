import React from "react";

interface Props {}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSignIcon,
  PartyPopperIcon,
  ShoppingBagIcon,
  Users2Icon,
} from "lucide-react";
import prisma from "../lib/db";

async function getData() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await Promise.all([
    prisma.user.count(),
    prisma.order.findMany({
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
    }),

    prisma.product.count(),
  ]);
  return { totalUsers: data[0], totalOrders: data[1], totalProducts: data[2] };
}

async function DashboardStats(props: Props) {
  const {} = props;

  const { totalUsers, totalOrders, totalProducts } = await getData();

  const revenue = totalOrders.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const sales = totalOrders.length;

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 md:gap-8 gap-4 mt-16">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSignIcon className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent className="grid gap-1">
          <p className="text-2xl font-bold text-black">
            $ {new Intl.NumberFormat().format(revenue / 100)}
          </p>
          <p className="text-muted-foreground">based on 100 charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBagIcon className="w-4 h-4 text-blue-500" />
        </CardHeader>
        <CardContent className="grid gap-1">
          <p className="text-2xl font-bold text-black">{sales}</p>
          <p className="text-muted-foreground">Total sales on Redefine</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Products</CardTitle>
          <PartyPopperIcon className="w-4 h-4 text-indigo-500" />
        </CardHeader>
        <CardContent className="grid gap-1">
          <p className="text-2xl font-bold text-black">{totalProducts}</p>
          <p className="text-muted-foreground">Total products created</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Users</CardTitle>
          <Users2Icon className="w-4 h-4 text-red-500" />
        </CardHeader>
        <CardContent className="grid gap-1">
          <p className="text-2xl font-bold text-black">{totalUsers}</p>
          <p className="text-muted-foreground">Total users signed up</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardStats;
