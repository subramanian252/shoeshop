"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBagIcon } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface Props {
  text?: string;
}

function SubmitButton(props: Props) {
  const { text = "Create Product" } = props;

  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant={text === "Delete" ? "destructive" : "default"}
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </Button>
      ) : (
        <Button
          variant={text === "Delete" ? "destructive" : "default"}
          type="submit"
        >
          {text}
        </Button>
      )}
    </>
  );
}
export function SubmitCartButton(props: Props) {
  const {} = props;

  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled variant={"default"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </Button>
      ) : (
        <Button className="w-full" variant={"default"} type="submit">
          <ShoppingBagIcon className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      )}
    </>
  );
}

export function CartCheckoutButton(props: Props) {
  const {} = props;

  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled variant={"default"}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </Button>
      ) : (
        <Button className="w-full" variant={"default"} type="submit">
          <ShoppingBagIcon className="mr-2 h-4 w-4" />
          Checkout
        </Button>
      )}
    </>
  );
}

export default SubmitButton;
