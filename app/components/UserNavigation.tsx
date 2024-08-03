"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {}

const links = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "All Products",
    href: "/products/all",
  },
  {
    id: 3,
    name: "Men",
    href: "/products/men",
  },
  {
    id: 4,
    name: "Women",
    href: "/products/women",
  },
  {
    id: 5,
    name: "Kids",
    href: "/products/kids",
  },
];

function UserNavigation(props: Props) {
  const {} = props;

  const pathName = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          className={cn(
            pathName === link.href
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
            "font-semibold"
          )}
          key={link.id}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}

export default UserNavigation;
