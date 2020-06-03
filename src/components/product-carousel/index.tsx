import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Product } from "api/fetchProducts";
import Carousel from "components/carousel";
import ProductTile from "components/product-tile";

interface Props {
  heading?: string;
  products: Product[];
}

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 0 30px",
  },
  heading: {
    margin: "0 0 10px 10px",
  },
}));

const ProductsCarousel = ({ heading, products }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {heading ? (
        <Typography className={classes.heading} variant="h5">
          {heading}
        </Typography>
      ) : null}
      <Carousel>
        {products.map((product, i) => (
          <ProductTile
            key={product.product.id}
            {...product.product}
            is_free={product.is_free}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;
