import React from "react";
import { Typography } from "@material-ui/core";

interface Props {
  className: string;
  children: string;
  replaceNewlines?: boolean;
}

const ProductDescription = ({
  className,
  children,
  replaceNewlines = true,
}: Props): JSX.Element => (
  <Typography
    className={className}
    dangerouslySetInnerHTML={{
      __html: replaceNewlines ? children.replace(/\n/g, "<br />") : children,
    }}
  />
);

export default ProductDescription;
