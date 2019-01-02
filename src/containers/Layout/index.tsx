import classnames from "classnames";
import * as React from "react";
import "./bootstrap.css";
import { Nav } from "./components/Nav";
import styles from "./style.module.scss";

export const Layout: React.SFC<{}> = (props) => {
  return (
    <div className={classnames(styles.layout, "bp3-dark")}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <nav className="row">
              <Nav />
            </nav>
            <section className="row">
              {props.children}
            </section>
            <footer className="row">
              2018
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
