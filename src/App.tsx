import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import Particles from "react-particles-js";
import HomePage from "components/pages/home";
import ProductDetailPage from "components/pages/product-detail";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  particlesContainer: {
    zIndex: -1,
    height: "100vh",
    width: "100vw",
    opacity: 0.5,
    position: 'fixed'
  },
});

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      secondary: blue,
    },
    typography: {
      allVariants: {
        color: "#fafafa",
      },
    },
  });

  const classes = useStyles();

  return (
    <>
      <div className={classes.particlesContainer}>
        <Particles
          height="100vh"
          width="100vw"
          params={{
            particles: {
              number: {
                value: Math.max(window.outerWidth / 8, 50),
              },
            },
          }}
        />
      </div>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/product/:productId"
            component={ProductDetailPage}
          />
        </BrowserRouter>
      </MuiThemeProvider>
    </>
  );
}

export default App;
