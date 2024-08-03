"use server";

import { parseWithZod } from "@conform-to/zod";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BannerSchema, ProductSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { redirect } from "next/navigation";
import { redis } from "./lib/redis";
import { CartType } from "./lib/interfaceTypes";
import { revalidatePath } from "next/cache";
import { stripe } from "./lib/Stripe";

export async function createNewProduct(prev: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !(user?.email === "suryasubramanian252@gmail.com")) {
    throw new Error("Unauthorized");
  }

  const submission = parseWithZod(formData, {
    schema: ProductSchema,
  });

  if (!(submission?.status === "success")) {
    return submission.reply();
  }

  const images = submission.value.images.flatMap((image) =>
    image.split(",").map((i) => i.trim())
  );

  const newProduct = await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      images: images,
      category: submission.value.category,
      isFeatured: submission.value.featured === true ? true : false,
      status: submission.value.status,
    },
  });

  return redirect(`/dashboard/products`);
}

export async function EditProduct(prev: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !(user?.email === "suryasubramanian252@gmail.com")) {
    throw new Error("Unauthorized");
  }

  const submission = parseWithZod(formData, {
    schema: ProductSchema,
  });

  if (!(submission?.status === "success")) {
    return submission.reply();
  }

  const images = submission.value.images.flatMap((image) =>
    image.split(",").map((i) => i.trim())
  );

  const newProduct = await prisma.product.update({
    where: {
      id: formData.get("id") as string,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      images: images,
      category: submission.value.category,
      isFeatured: submission.value.featured === true ? true : false,
      status: submission.value.status,
    },
  });

  return redirect(`/dashboard/products`);
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !(user?.email === "suryasubramanian252@gmail.com")) {
    throw new Error("Unauthorized");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("id") as string,
    },
  });

  return redirect(`/dashboard/products`);
}

export async function createBanner(prev: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !(user?.email === "suryasubramanian252@gmail.com")) {
    throw new Error("Unauthorized");
  }

  const submission = parseWithZod(formData, {
    schema: BannerSchema,
  });

  if (!(submission?.status === "success")) {
    return submission.reply();
  }

  const newBanner = await prisma.banner.create({
    data: {
      title: submission.value.title,

      image: submission.value.image,
    },
  });

  return redirect(`/dashboard/banner`);
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user || !(user?.email === "suryasubramanian252@gmail.com")) {
    throw new Error("Unauthorized");
  }

  await prisma.banner.delete({
    where: {
      id: formData.get("id") as string,
    },
  });

  return redirect(`/dashboard/banner`);
}

export async function addItemsToCart(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  let cart: CartType | null = await redis.get(`cart/${user.id}`);

  const product = await prisma.product.findUnique({
    where: {
      id: formData.get("id") as string,
    },
  });

  let myCart = {} as CartType;

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          id: product?.id as string,
          quantity: 1,
          price: product?.price as number,
          name: product?.name as string,
          image: product?.images[0] as string,
        },
      ],
    };
  } else {
    let productFound = false;
    myCart.items = cart.items.map((item) => {
      if (item.id === product?.id) {
        productFound = true;
        item.quantity += 1;
      }
      return item;
    });
    if (!productFound) {
      myCart.items.push({
        id: product?.id as string,
        quantity: 1,
        price: product?.price as number,
        name: product?.name as string,
        image: product?.images[0] as string,
      });
    }
  }

  await redis.set(`cart/${user.id}`, myCart);

  revalidatePath("/", "layout");
}

export async function deleletItem(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  let cart: CartType | null = await redis.get(`cart/${user.id}`);

  if (cart && cart.items) {
    const updateCart = cart.items.filter(
      (item) => item.id !== formData.get("id")
    );
    await redis.set(`cart/${user.id}`, { ...cart, items: updateCart });
  }

  revalidatePath("/bag");
}

export async function checkout() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  let cart: CartType | null = await redis.get(`cart/${user.id}`);

  if (cart && cart.items) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `http://localhost:3000//payment/success`,
      cancel_url: `http://localhost:3000/payment/cancel`,
      metadata: {
        userId: user?.id,
      },
    });
    return redirect(session.url as string);
  }
}
