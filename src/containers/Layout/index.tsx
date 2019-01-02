import { Text } from "@blueprintjs/core";
import classnames from "classnames";
import * as React from "react";
import { IProfile } from "../../models/IProfile";
import { IStoreEntity } from "../../reducers/IStoreEntity";
import { history } from "../../store";
import "./bootstrap.css";
import { Nav } from "./components/Nav";
import styles from "./style.module.scss";

export const Layout: React.SFC<{}> = (props) => {
  const handleProfileClick = () => {
    history.push("/profile");
  };

  return (
    <div className={classnames(styles.layout, "bp3-dark")}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <nav className="row">
              <Nav
                onProfileClick={handleProfileClick}
              />
            </nav>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  {props.children}
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
