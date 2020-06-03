import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import hexToRgba from "hex-to-rgba";
import { Typography } from "@material-ui/core";
import { ProductDetails } from "api/fetchProducts";
import Cost from "components/product-cost-chip";
import ProductDescription from "../product-description";

interface Props extends ProductDetails {
  is_free: boolean;
}

const ProductRow = (productData: Props) => {
  const useStyles = makeStyles((theme) => {
    return {
      container: {
        "&:first-child": {
          borderTop: "1px solid #444",
        },
        background: hexToRgba(productData.background_colour_code, 0.75),
        width: "100%",
        padding: "15px 0",
        borderBottom: "1px solid #444",
        position: "relative",
        display: "block",
      },
      costContainer: {
        display: "inline-block",
      },
      description: {
        display: "block",
        fontSize: theme.typography.fontSize,
      },
      productImage: {
        height: 40,
        width: 40,
        background: `url('${productData.image_hero_url}')`,
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        float: "left",
        marginLeft: 10,
      },
      productDetail: {
        float: "left",
        width: "calc(100% - 70px)",
        marginLeft: 20,
      },
      productTitle: {
        display: "inline",
      },
    };
  });

  const classes = useStyles();

  return (
    <Link className={classes.container} to={`/product/${productData.id}`}>
      <div>
        <div className={classes.productImage} />
        <div className={classes.productDetail}>
          <div>
            <Typography className={classes.productTitle}>
              {productData.title}
            </Typography>

            <div className={classes.costContainer}>
              <Cost isFree={productData.is_free} price={productData.price} />
            </div>
          </div>

          <ProductDescription
            replaceNewlines={false}
            className={classes.description}
          >
            {productData.description}
          </ProductDescription>
        </div>
      </div>
    </Link>
  );
};

export default ProductRow;
