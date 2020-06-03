import React from "react";
import hexToRgba from "hex-to-rgba";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import useWindowSize from "hooks/useWindowSize";
import { ProductDetails } from "api/fetchProducts";
import Cost from "components/product-cost-chip";
import { tr } from "../../utils";
import ProductDescription from "../product-description";

interface Props extends ProductDetails {
  is_free: boolean;
}

const ProductTile = (productData: Props) => {
  const windowSize = useWindowSize();

  // TODO: Consider moving this logic.
  // Pro's of it being here: Consistency wherever the component is used.
  // Con's: It's not as flexible as it could otherwise be.
  let tileWidthFactor = 1;
  if (windowSize.width > 768) {
    tileWidthFactor = 2;
  }
  if (windowSize.width > 1200) {
    tileWidthFactor = 4;
  }

  const useStyles = makeStyles((theme) => {
    return {
      button: {
        background: `#${productData.accent_colour_code}`,
        margin: "10px 0",
      },
      productName: {
        color: `#${productData.accent_colour_code}`,
        display: "inline",
      },
      productDescription: {
        color: `#${productData.text_colour_code}`,
      },
      productImage: {
        height: 180,
        background: `url('${productData.image_hero_url}')`,
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
      },
      productTile: {
        background: hexToRgba(productData.background_colour_code, 0.75),
        borderWidth: "10px 15px",
        borderStyle: "solid",
        borderColor: "rgba(0,0,0,0.3)",
        padding: 10,
        width: `calc((100% - (50px * ${tileWidthFactor})) / ${tileWidthFactor})`,
        flex: "0 0 auto",
      },
    };
  });

  const classes = useStyles();

  return (
    <div className={classes.productTile}>
      <div className={classes.productImage} />
      <div>
        <Typography variant="h6" className={classes.productName}>
          {productData.title}
        </Typography>
        <Cost isFree={productData.is_free} price={productData.price} />
      </div>

      <ProductDescription className={classes.productDescription}>
        {productData.description}
      </ProductDescription>

      <Link to={`/product/${productData.id}`}>
        <Button className={classes.button}>{tr("productTile.cta")}</Button>
      </Link>
    </div>
  );
};

export default ProductTile;
