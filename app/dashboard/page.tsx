import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import DashboardStats from "../components/DashboardStats";
import Dashboardbottom from "../components/Dashboardbottom";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <>
      <DashboardStats />
      <Dashboardbottom />
    </>
  );
}

export default Page;
