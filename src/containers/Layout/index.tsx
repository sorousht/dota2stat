import "flexboxgrid";
import * as React from "react";
import { Nav } from "./components/Nav";

export const Layout: React.SFC<{}> = (props) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-xs">
          <Nav />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-lg-offset-1">
          <div className="box">
            {props.children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
