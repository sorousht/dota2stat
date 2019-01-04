import { Text } from "@blueprintjs/core";
import classnames from "classnames";
import { remove as removeCookie } from "js-cookie";
import * as React from "react";
import { withRouter } from "react-router";
import "./bootstrap.css";
import { Nav } from "./components/Nav";
import styles from "./style.module.scss";

export const Layout = withRouter(({ history, children }) => {
  const handleLogin = () => {
    history.push("/login");
  };

  const handleLogout = () => {
    removeCookie("user");
    history.push("/login");
  };

  return (
    <div className={classnames(styles.layout, "bp3-dark")}>
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
});
