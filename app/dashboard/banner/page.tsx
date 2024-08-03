import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { MoreHorizontalIcon, PlusIcon, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

interface Props {}

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

async function Page(props: Props) {
  noStore();
  const {} = props;

  const data = await getData();

  return (
    <>
      <div className="mt-14 w-full flex justify-end">
        <Button asChild className="align-end">
          <Link href="/dashboard/banner/create">
            <PlusIcon className="w-4 h-4 mr-1" />
            Create Banner
          </Link>
        </Button>
      </div>
      <Card className="mt-20">
        <CardHeader className="px-7">
          <CardTitle>Banners</CardTitle>
          <CardDescription>
            banners to be displayed on the homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      width={100}
                      height={100}
                      className="w-16 object-cover h-16 rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{banner?.title}</p>
                  </TableCell>

                  <TableCell className="text-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="">
                        <Button variant={"ghost"} size={"icon"}>
                          <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/banner/${banner.id}/delete`}>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default Page;
