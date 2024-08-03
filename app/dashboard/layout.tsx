import React, { use } from "react";
import DashboardNavigation from "../components/DashboardNavigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { unstable_noStore as noStore } from "next/cache";

interface Props {
  children: React.ReactNode;
}

async function Layout(props: Props) {
  noStore();
  const { children } = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !(user?.email === "suryasubramanian252@gmail.com")) {
    redirect("/");
  }

  return (
    <div className="max-w-7xl lg:max-w-full mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-20">
      <header className="sticky top-0 w-full border-b-2 h-16 gap-4 bg-white flex items-center justify-between">
        <nav className="md:flex hidden lg:gap-6 md:gap-5 text-sm ">
          <DashboardNavigation />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              size={"icon"}
              variant={"secondary"}
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="flex flex-col gap-y-4 mt-5">
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"} size={"icon"}>
              <CircleUser className="w-6 h-6 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="w-full">{children}</main>
    </div>
  );
}

export default Layout;
