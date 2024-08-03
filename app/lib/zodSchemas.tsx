import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["men", "women", "kids"]),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published", "archived"]),
});

export const BannerSchema = z.object({
  title: z.string(),
  image: z.string(),
});
