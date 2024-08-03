import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ShoppingBag, User2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { redis } from "../lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CartType } from "../lib/interfaceTypes";

interface Props {
  name: string;
  email: string;
  profilePicture: string;
}

async function UserDropDown(props: Props) {
  const { name, email, profilePicture } = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const cart: CartType | null = await redis.get(`cart/${user?.id}`);

  const totalCart = cart?.items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <>
      <Button variant={"ghost"} asChild>
        <Link href={"/bag"} className="gap-2">
          <ShoppingBag className="w-6 h-6 hover:text-primary transition-all" />
          <p className="text-[14px]">{totalCart}</p>
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={profilePicture} />
            <AvatarFallback>{name.slice(0, 3)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>
            <p>{name}</p>
            <p className="text-[14px] text-muted-foreground">{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <LogoutLink>Logout</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UserDropDown;
