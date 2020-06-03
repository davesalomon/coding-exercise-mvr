import React from "react";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { tr } from "utils";
import useProductData from "hooks/useProductData";
import Page from "components/layouts/default";
import LoadingSpinner from "components/loading";
import ProductDetailHeading from "./heading";
import ProductDescription from "components/product-description";
import ArtistInfo from "./artist-info";
import Cost from "../../product-cost-chip";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = useProductData(productId);

  const useStyles = makeStyles((theme) => ({
    description: {
      margin: "0 20px",
      maxWidth: 700,
    },
    genres: {
      margin: "10px 20px",
    },
    priceContainer: {
      margin: "0 10px 10px",
    },
  }));

  const classes = useStyles();

  const productData = product.result;

  return (
    <Page>
      {product.isLoading && <LoadingSpinner />}
      {product.isError && (
        <Typography>{tr("pages.productDetails.failedToLoad")}</Typography>
      )}

      {productData && (
        <>
          <ProductDetailHeading productId={productId} />

          <div className={classes.priceContainer}>
            <Cost
              isFree={productData?.price === "0.00"}
              price={productData?.price}
            />
          </div>

          <ProductDescription className={classes.description}>
            {productData.description}
          </ProductDescription>

          <Typography className={classes.genres}>
            {tr("pages.productDetails.genres")} {productData?.genre.name}
          </Typography>

          <ArtistInfo {...productData?.artist} />
        </>
      )}
    </Page>
  );
};

export default ProductDetailPage;
