import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Product } from "api/fetchProducts";
import ProductTile from "components/product-tile";
import ProductRow from "components/product-row";

interface Props {
  heading?: string;
  products: Product[];
  variant?: "standard" | "compact";
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 0 30px",
  },
  heading: {
    margin: "0 0 10px 10px",
  },
}));

const ProductsList = ({
  heading,
  products,
  variant = "standard",
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      {heading ? (
        <Typography className={classes.heading} variant="h5">
          {heading}
        </Typography>
      ) : null}
      <div className={classes.container}>
        {products.map((product) => {
          const Component = variant === "standard" ? ProductTile : ProductRow;
          return (
            <Component
              key={product.product.id}
              is_free={product.is_free}
              {...product.product}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProductsList;
