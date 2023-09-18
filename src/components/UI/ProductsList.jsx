import React from "react";
import ProductCard from "./ProductCard";

const ProductsList = ({ data }) => {
  return (
    <>
      {data?.map((item, i) => {
        return <ProductCard item={item} key={i} />;
      })}
    </>
  );
};

export default ProductsList;
