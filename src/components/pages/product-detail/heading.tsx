import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import hexToRgba from "hex-to-rgba";
import useProductData from "hooks/useProductData";
import { tr } from "../../../utils";

interface Props {
  productId: string;
}

const ProductDetailHeading = (props: Props): JSX.Element | null => {
  const productData = useProductData(props.productId);
  const useStyles = makeStyles(() => ({
    container: {
      background: hexToRgba(
        productData.result?.background_colour_code || "",
        0.75
      ),
      display: 'inline-block',
      margin: 20,
      padding: 20,
    },
  }));

  const classes = useStyles();

  if (!productData.result) {
    return null;
  }

  const productDetails = productData.result;
  if (productDetails?.production_type_code === "original") {
    return (
      <Typography className={classes.container} variant="h4">
        {`${tr("pages.productDetails.exclusiveSession")} ${productDetails.title}`}
      </Typography>
    );
  }

  return (
    <Typography className={classes.container} variant="h4">
      {productDetails.title} @ {productDetails.venue.name},{" "}
      {productDetails.venue.country_code}
    </Typography>
  );
};

export default ProductDetailHeading;
