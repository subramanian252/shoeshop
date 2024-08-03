import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/Stripe";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const body = await request.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    console.log("error", error);
    return new Response("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session?.metadata?.userId as string,
        },
      });

      await redis.del(`cart/${session?.metadata?.userId}`);
      break;
    default:
      return new Response("Unhandled event type", { status: 400 });
  }

  return new Response(null, { status: 200 });
}
