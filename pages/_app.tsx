// import "@blueprintjs/core/lib/css/blueprint.css";
import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { AnyAction, Store } from "redux";
import "../global.scss";
import { configureStore } from "../lib/store";

interface IProps {
  store: Store<any, AnyAction>;
}

class MyApp extends App<IProps> {

  public static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  public render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }

}

export default withRedux(configureStore)(MyApp);
