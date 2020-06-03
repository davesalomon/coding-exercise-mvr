import config from "../config";
import fetchProduct from "./fetchProduct";

export type ProductDetails = {
  accent_colour_code: string;
  background_colour_code: string;
  description: string;
  id: number;
  image_hero_url: string;
  image_landscape_url: string;
  price?: string;
  production_type_code: "performance" | "original";
  text_colour_code: string;
  title: string;
};

export type Product = {
  feature_order: number;
  is_free: boolean;
  product: ProductDetails;
};

const fetchProducts = async (): Promise<Product[]> => {
  const products = await fetch(config.api.productsList);
  if (products.ok) {
    const result = (await products.json()).result.releases as Product[];
    result.sort((a, b) => a.feature_order - b.feature_order);

    const additionalProductDetailsPromises: any[] = (
      await Promise.all(
        result.map((product) => {
          // I wouldn't do this in real life -- it's a backend fix that needs to happen.
          return new Promise(async (resolve) => {
            if (
              !product.is_free &&
              typeof product.product.price === "undefined"
            ) {
              const detailedProductInfo = await fetchProduct(
                product.product.id.toString()
              );
              resolve({
                id: product.product.id,
                price: detailedProductInfo.price,
              });
            }
            return resolve();
          });
        })
      )
    ).filter((a) => a);

    return result.map((product) => {
      const additionalProduct = additionalProductDetailsPromises.find(
        (p) => p.id === product.product.id
      );

      return {
        ...product,
        product: {
          ...product.product,
          ...additionalProduct,
        },
      };
    });
  }

  throw new Error(
    `Failed to fetch products - ${products.status} ${products.statusText}`
  );
};

export default fetchProducts;
