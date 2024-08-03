"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {}

const links = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 2,
    name: "Orders",
    href: "/dashboard/orders",
  },
  {
    id: 3,
    name: "Products",
    href: "/dashboard/products",
  },
  {
    id: 4,
    name: "Banner Picture",
    href: "/dashboard/banner",
  },
];

function DashboardNavigation(props: Props) {
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

export default DashboardNavigation;
