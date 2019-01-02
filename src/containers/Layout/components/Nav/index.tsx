import { Alignment, Button, Navbar } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/dota-2_64.png";

export const Nav: React.SFC<{}> = (props) => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <Link to="/">
            <picture>
              <img
                alt="Dota 2 Statistics"
                src={logo}
                width="30"
                height="30"
              />
            </picture>
          </Link>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp3-minimal" icon="user" text="Profile" />
      </Navbar.Group>
    </Navbar>
  );
};
