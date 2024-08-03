import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !user?.email || user === null) {
    throw new Error("User not found");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user?.id,
        email: user?.email ?? "",
        firstName: user?.given_name ?? "",
        lastName: user?.family_name ?? "",
        profileImage: user?.picture ?? `https://avatars.vercl.sh/${user.id}`,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/`
      : `https://shoeshop-six.vercel.app/`
  );
}
