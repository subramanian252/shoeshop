"use client";
import { createBanner, createNewProduct } from "@/app/actions";
import SubmitButton from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { BannerSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState } from "react-dom";

interface Props {}

function Page(props: Props) {
  const {} = props;

  const [images, setImages] = useState<String | undefined>();

  const [lastResult, action] = useFormState(createBanner, undefined);

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: BannerSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4 mt-10">
        <Button variant={"outline"} size={"icon"} asChild>
          <Link href={"/dashboard/banner"}>
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
      </div>
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>
            In this form you can create new banners foryour homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                className="w-full"
                placeholder="Banner Title"
                type="text"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="images">Upload Images</Label>
              <input
                key={fields.image.key}
                name={fields.image.name}
                defaultValue={fields.image.initialValue as any}
                type="hidden"
                value={images as string}
              />

              {!images ? (
                <>
                  <UploadDropzone
                    onClientUploadComplete={(res) => {
                      setImages(res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                    endpoint="bannerUploader"
                  />
                  <p className="text-red-500">{fields.image.errors}</p>
                </>
              ) : (
                <div className="relative w-[600px] h-[400px]">
                  <Image
                    src={images as string}
                    alt=""
                    width={300}
                    height={200}
                    className="object-cover w-[600px] h-[400px] rounded-lg"
                  />
                  <button onClick={() => setImages("")}>
                    <XIcon className=" bg-red-500 text-white rounded-full absolute top-[-10px] right-[-10px]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Banner" />
        </CardFooter>
      </Card>
    </form>
  );
}

export default Page;
