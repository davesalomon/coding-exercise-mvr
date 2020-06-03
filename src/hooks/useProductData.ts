import { useEffect, useState } from "react";
import fetchProduct, { DetailedProduct } from "api/fetchProduct";
import AsyncDataLoad from "./shared/asyncDataLoad";

const useProductData = (id: string): AsyncDataLoad<DetailedProduct | null> => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<DetailedProduct | null>(null);

  // Consider using a State Machine -- but let's keep it simple for now!
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setData(await fetchProduct(id));
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, [id]);

  return {
    isLoading,
    isError,
    result: data,
  };
};

export default useProductData;
