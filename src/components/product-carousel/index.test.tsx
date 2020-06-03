import React from "react";
import { render } from "@testing-library/react";
import ProductsCarousel from "./";
import { ProductDetails } from "../../api/fetchProducts";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(() => "<Link />"),
}));

const generateProduct = (i: number): ProductDetails => ({
  accent_colour_code: "#f00",
  background_colour_code: "#f0f",
  description: "",
  id: i,
  image_hero_url: "https://example.com/foo.jpg",
  image_landscape_url: "",
  price: i.toFixed(2),
  production_type_code: "performance",
  text_colour_code: "#00f",
  title: `Product ${i}`,
});

test("renders a basic default layout without a title", () => {
  const result = render(
    <ProductsCarousel
      products={[
        { feature_order: 1, is_free: false, product: generateProduct(1) },
        { feature_order: 1, is_free: false, product: generateProduct(2) },
        { feature_order: 1, is_free: false, product: generateProduct(3) },
        { feature_order: 1, is_free: false, product: generateProduct(4) },
        { feature_order: 1, is_free: false, product: generateProduct(5) },
        { feature_order: 1, is_free: false, product: generateProduct(6) },
        { feature_order: 1, is_free: false, product: generateProduct(7) },
        { feature_order: 1, is_free: false, product: generateProduct(8) },
        { feature_order: 1, is_free: false, product: generateProduct(9) },
        { feature_order: 1, is_free: false, product: generateProduct(10) },
        { feature_order: 1, is_free: false, product: generateProduct(11) },
        { feature_order: 1, is_free: false, product: generateProduct(12) },
      ]}
    />
  );

  expect(result).toMatchSnapshot();
});
