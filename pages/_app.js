import "bootstrap/dist/css/bootstrap.min.css";
import App from "next/app";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../src/theme';
import { ThemeProvider } from "@mui/styles";

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
    );
  }
}

export default MyApp;
