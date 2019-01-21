import { Text } from "@blueprintjs/core";
import Head from "next/head";
import * as React from "react";
import "./bootstrap.css";
import { Nav } from "./components/Nav";
import "./style.module.scss";
import "@blueprintjs/core/lib/css/blueprint.css";
import Router from "next/router";
import { remove as removeCookie } from "js-cookie";

export const MainLayout = ({ children }) => {
  const handleLogin = () => {
    Router.push("/login");
  };

  const handleLogout = () => {
    removeCookie("user");
    window.location.href = "/login";
  };

  return (
    <div className="main-layout bp3-dark">
      <Head>
        <title>Dota2Stat</title>
        <meta
          name="Description"
          content="We use OpenDota APIs to give you some secrets which turn you into a professional player."
        />
        <link
          rel="shortcut icon"
          href="/static/favicon.ico"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#394b59" />
        <link rel="manifest" href="/static/manifest.json" />
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <nav className="row">
              <Nav
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            </nav>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  {children}
                </div>
              </div>
            </div>
            <footer className="row">
              <div className="col-sm-12 ">
                <Text className="bp3-text-muted">
                  Made with ❤️ by <a href="http://sorousht.com/" target="_blank">sorousht</a>
                </Text>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
