import { Alignment, Button, Navbar } from "@blueprintjs/core";
// tslint:disable-next-line:no-submodule-imports
import Link from "next/link";
import * as React from "react";
import { connect } from "react-redux";
import { IPlayer } from "../../../../lib/models/IPlayer";
import { EntityStatus, IStoreEntity } from "../../../../lib/reducers/IStoreEntity";
import { IState } from "../../../../lib/reducers/state";

interface IStateProps {
  profile: IStoreEntity<IPlayer>;
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
          <Link href="/">
            <picture>
              <img
                alt="Dota 2 Statistics"
                src="/static/images/dota-2_64.png"
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
        && !!state.user.value.profile.steamid,
      profile: state.user,
    };
  },
  {},
)(nav);
