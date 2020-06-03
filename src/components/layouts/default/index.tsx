import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  children: JSX.Element | boolean | null | (JSX.Element | boolean | null)[];
  title?: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    top: 0,
    left: 0,
    zIndex: 1,
    width: '95vw',
    margin: '0 2.5vw'
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
  },
}));
const DefaultLayout = ({ children, title }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        {title ? (
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
        ) : null}

        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
