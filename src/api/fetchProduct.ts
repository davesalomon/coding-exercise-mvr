import moize from "moize";
import config from "../config";

type VenueData = {
  id: number;
  name: string;
  description: string;
  city: string;
  country_code: string;
};

export type ArtistData = {
  id: number;
  name: string;
  description: string;
  country_code: string;
  website_url: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  image_url: string;
  artist_background_colour_code: string;
  artist_text_colour_code: string;
  artist_accent_colour_code: string;
};

type GenreData = {
  id: number;
  name: string;
  description: string | null;
};

export type DetailedProduct = {
  id: number;
  title: string;
  description: string;
  image_hero_url: string;
  image_landscape_url: string;
  accent_colour_code: string;
  background_colour_code: string;
  text_colour_code: string;
  production_type_code: "performance" | "original";
  price: string;
  venue: VenueData;
  artist: ArtistData;
  genre: GenreData;
};

const fetchProduct = async (id: string): Promise<DetailedProduct> => {
  const product = await fetch(
    config.api.productDetails.replace("{id}", id.toString())
  );

  if (product.ok) {
    return (await product.json()).result as DetailedProduct;
  }

  throw new Error(
    `Failed to fetch products - ${product.status} ${product.statusText}`
  );
};

export default moize(fetchProduct);
