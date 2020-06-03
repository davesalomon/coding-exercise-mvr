import { useEffect, useState } from "react";
import fetchProducts, { Product } from "api/fetchProducts";
import AsyncDataLoad from "./shared/asyncDataLoad";

const useProducts = (): AsyncDataLoad<Product[]> => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Product[]>([]);

  // Consider using a State Machine -- but let's keep it simple for now!
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setData(await fetchProducts());
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    isError,
    result: data,
  };
};

export default useProducts;
