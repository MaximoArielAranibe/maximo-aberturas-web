import { useContext } from "react";
import { ProductsContext } from "../context/ProductsProvider";

export const useProducts = () => {
  const { products } = useContext(ProductsContext)
  return products
};

