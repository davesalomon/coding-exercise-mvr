import React from "react";
import { render } from "@testing-library/react";
import DefaultLayout from "./";

test("renders a basic default layout without a title", () => {
  const { getByText } = render(
    <DefaultLayout>
      <p>Foo</p>
    </DefaultLayout>
  );
  const linkElement = getByText(/foo/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders a basic default layout with a title", () => {
  const { getByText } = render(
    <DefaultLayout title="Wibble Wobble">
      <p>Foo</p>
    </DefaultLayout>
  );
  const linkElement = getByText(/wibble wobble/i);
  expect(linkElement).toBeInTheDocument();
});
