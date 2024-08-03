import Link from "next/link";
import React from "react";
import UserNavigation from "./UserNavigation";
import UserDropDown from "./UserDropDown";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";

interface Props {}

async function UserNav(props: Props) {
  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="max-w-7xl lg:max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-row items-center gap-x-8 xl:px-20">
      <Link href={"/"}>
        <h1 className="text-3xl font-extrabold tracking-wide">
          Shoe<span className="text-primary">Redesigned</span>
        </h1>
      </Link>
      <div className=" hidden md:flex gap-x-6 font-semibold">
        <UserNavigation />
      </div>
      <div className="ml-auto flex flex-row items-center gap-x-2">
        {user?.id ? (
          <UserDropDown
            name={user?.given_name as string}
            email={user?.email as string}
            profilePicture={
              user?.picture || `https://avatars.vercl.sh/${user.id}`
            }
          />
        ) : (
          <div className="hidden md:flex gap-x-2 items-center">
            <Button variant={"secondary"} asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <span className="bg-gray-200 h-10 w-px " />

            <Button asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserNav;
