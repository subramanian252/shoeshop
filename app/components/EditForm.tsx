"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { createNewProduct, EditProduct } from "../actions";
import { parseWithZod } from "@conform-to/zod";
import { ProductSchema } from "../lib/zodSchemas";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { catgories } from "../lib/categories";
import Image from "next/image";
import { UploadDropzone } from "../lib/uploadthing";
import SubmitButton from "./SubmitButton";
import { useForm } from "@conform-to/react";
import { $Enums } from "@prisma/client";

interface Props {
  data: {
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
    createdAt: Date;
  } | null;
  id: string;
}

function EditForm(props: Props) {
  const { data, id } = props;

  const [images, setImages] = useState<String[]>(data?.images as string[]);

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const [lastResult, action] = useFormState(EditProduct, undefined);

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ProductSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="id" value={id} />
      <div className="flex items-center gap-4 mt-10">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={"/dashboard/products"}>
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Product</h1>
      </div>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can edit the product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data?.name}
                className="w-full"
                placeholder="Product Name"
                type="text"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>
            <div className="grid gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data?.description}
                className="w-full"
                placeholder="Add Description"
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="grid gap-3">
              <Label>Price ($)</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data?.price}
                className="w-full"
                placeholder="Enter your price"
                type="number"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="featured">Featured</Label>
              <Switch
                key={fields.featured.key}
                name={fields.featured.name}
                defaultChecked={data?.isFeatured}
                id="featured"
              />
              <p className="text-red-500">{fields.featured.errors}</p>
            </div>
            <div className="grid gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data?.status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select the Status of the product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>
            <div className="grid gap-3">
              <Label>Catgories</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={data?.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select the Category of the product" />
                </SelectTrigger>
                <SelectContent>
                  {catgories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.value}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="images">Upload Images</Label>
              <input
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
                type="hidden"
                value={images as string[]}
              />
              {images.length > 0 ? (
                <div className="flex flex-row gap-3">
                  {images.map((i, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        src={i as string}
                        alt="image"
                        width={100}
                        height={100}
                        className="w-full h-full rounded-md object-cover border"
                      />
                      <button onClick={() => handleDelete(index)}>
                        <XIcon className=" bg-red-500 text-white rounded-full absolute top-[-10px] right-[-10px]" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <UploadDropzone
                    onClientUploadComplete={(res) => {
                      setImages(res.map((i) => i.url));
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                    endpoint="imageUploader"
                  />
                  <p className="text-red-500">{fields.images.errors}</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Edit Product" />
        </CardFooter>
      </Card>
    </form>
  );
}

export default EditForm;
