import React from "react";
import { Typography } from "@material-ui/core";
import { tr } from "utils";
import useProducts from "hooks/useProducts";
import Page from "components/layouts/default";
import ProductCarousel from "components/product-carousel";
import ProductList from "components/product-list";
import LoadingSpinner from "components/loading";

const HomePage = () => {
  const products = useProducts();

  return (
    <Page title={tr("pages.home.title")}>
      {products.isLoading && <LoadingSpinner />}

      {products.isError && (
        <Typography>{tr("pages.home.failedToLoad")}</Typography>
      )}

      {!!products.result.length && (
        <ProductCarousel
          heading={tr("pages.home.featuredPerformances")}
          products={products.result}
        />
      )}

      {!!products.result.length && (
        <ProductList
          heading={tr("pages.home.topPerformances")}
          products={products.result}
        />
      )}

      {!!products.result.length && (
        <ProductList
          heading={tr("pages.home.trendingNow")}
          products={products.result}
          variant="compact"
        />
      )}
    </Page>
  );
};

export default HomePage;
