import React from "react";

import prisma from "@/app/lib/db";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import ResponsiveContainer from "./ResponsiveContainer";
import Chart from "./ResponsiveContainer";

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
          profileImage: true,
        },
      },
    },
  });
}
async function getDataForCharts() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    orderBy: {
      createdAt: "asc",
    },
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
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
          profileImage: true,
        },
      },
    },
  });

  const result = data.map((item) => {
    return {
      date: new Intl.DateTimeFormat("en-US").format(new Date(item.createdAt)),
      amount: item.amount / 100,
    };
  });

  return result;
}

async function Dashboardbottom(props: Props) {
  const {} = props;

  const data = await getData();

  const chartData = await getDataForCharts();

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-16 className='text-sm font-medium'">
      <Card className="xl:col-span-2 w-full">
        <CardHeader className="mb-10">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Total Transactions taken place</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart data={chartData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {data.map((item) => (
            <div key={item.id} className="flex flex-row items-center gap-x-4">
              <Avatar className="hidden sm:flex h-9 w-9">
                <AvatarImage src={item.User?.profileImage} />
                <AvatarFallback className="uppercase">
                  {item?.User?.firstName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium">{item?.User?.firstName}</p>
                <p className="text-sm text-muted-foreground">
                  {item?.User?.email}
                </p>
              </div>
              <p className="text-lg font-semibold ml-auto">
                ${new Intl.NumberFormat("en-us").format(item.amount / 100)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboardbottom;
