import { Alignment, Button, Navbar } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/dota-2_64.png";
import { IProfile } from "../../../../models/IProfile";
import { EntityStatus, IStoreEntity } from "../../../../reducers/IStoreEntity";
import { IState } from "../../../../reducers/state";

interface IStateProps {
  profile: IStoreEntity<IProfile>;
  isAuth: boolean;
}

interface IProps extends Partial<IStateProps> {
  onLogin: () => void;
  onLogout: () => void;
}

const nav: React.SFC<IProps> = (props) => {
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
        {
          props.isAuth && props.profile && props.profile.value ?
            <Button
              className="bp3-minimal"
              icon="log-out"
              text="Logout"
              onClick={props.onLogout}
            /> :
            <Button
              className="bp3-minimal"
              icon="log-in"
              text="Login"
              onClick={props.onLogin}
            />
        }
      </Navbar.Group>
    </Navbar>
  );
};

export const Nav = connect<IStateProps, {}, {}, IState>(
  (state: IState) => {
    return {
      isAuth: !!state.userId
        && !!state.user
        && state.user.status === EntityStatus.FULFILLED
        && !!state.user.value
        && !!state.user.value.steamid,
      profile: state.user,
    };
  },
  {},
)(nav);
