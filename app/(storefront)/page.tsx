import React from "react";
import Hero from "../components/Hero";
import CategoriesSelection from "../components/CategoriesSelection";
import FeaturedProducts from "../components/FeaturedProducts";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  );
}

export default Page;
