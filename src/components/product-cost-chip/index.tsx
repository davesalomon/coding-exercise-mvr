import React from "react";
import classnames from "classnames";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { tr } from "../../utils";

interface Props {
  price?: string;
  isFree: boolean;
}

const useStyles = makeStyles((theme) => ({
  chip: {
    color: "#fff",
    marginLeft: 10,
  },
  free: {
    color: green.A400,
  },
}));

const Cost = (props: Props): JSX.Element | null => {
  const classes = useStyles();

  let label = tr("productTile.unknownPrice");

  if (props.isFree) {
    label = tr("productTile.free");
  } else if (props.price) {
    label = `£${props.price}`;
  }

  return (
    <Chip
      className={classnames(classes.chip, {
        [classes.free]: props.isFree,
      })}
      variant="outlined"
      size="small"
      label={label}
    />
  );
};

export default Cost;
