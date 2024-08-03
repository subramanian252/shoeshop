import { checkout, deleletItem } from "@/app/actions";
import SubmitButton, {
  CartCheckoutButton,
} from "@/app/components/SubmitButton";
import { CartType } from "@/app/lib/interfaceTypes";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {}

async function Page(props: Props) {
  const {} = props;

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const cart: CartType | null = await redis.get(`cart/${user.id}`);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-6 justify-center h-[800px]">
        <div className=" bg-primary p-6 rounded-3xl">
          <ShoppingBag className="w-20 h-20 text-white" />
        </div>
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p>
          You currently dont have any products in your cart, Please add some
          products to your cart
        </p>
        <Button asChild>
          <Link href="/">Shop Now</Link>
        </Button>
      </div>
    );
  }

  const cartTotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 min-h-[55vh]">
      <h1 className="my-10 text-3xl font-semibold">Your Cart</h1>
      <div className="flex flex-col gap-y-6">
        {cart.items.map((item) => (
          <Card className="p-6 flex gap-x-6 items-center mb-2" key={item.id}>
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="w-36 h-36 object-cover rounded-lg"
            />
            <h1 className="text-2xl font-semibold">{item.name}</h1>
            <div className="ml-auto flex flex-col justify-between gap-y-10">
              <div className="flex items-center gap-x-2 ">
                <p className="text-2xl font-semibold">${item.price}</p>
                <p className="text-gray-500">x {item.quantity}</p>
              </div>
              <form action={deleletItem}>
                <input type="hidden" name="id" value={item.id} />
                <SubmitButton text="Delete" />
              </form>
            </div>
          </Card>
        ))}
        <div className="flex flex-row justify-between p-6">
          <p className="text-2xl font-semibold text-muted-foreground">
            Subtotal
          </p>
          <p className="text-2xl font-semibold">
            $ {new Intl.NumberFormat("en-US").format(cartTotal)}
          </p>
        </div>
        <form action={checkout}>
          <CartCheckoutButton />
        </form>
      </div>
    </div>
  );
}

export default Page;
