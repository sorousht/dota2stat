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
}

interface IProps extends Partial<IStateProps> {
  onProfileClick: () => void;
}

const nav: React.SFC<IProps> = (props) => {
  const profileFulfilled = props.profile && props.profile.status === EntityStatus.FULFILLED;
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
        <Button
          className="bp3-minimal"
          icon="user"
          text={profileFulfilled && props.profile && props.profile.value ? props.profile.value.personaname : "Anonymus"}
          onClick={props.onProfileClick}
        />
      </Navbar.Group>
    </Navbar>
  );
};

export const Nav = connect<IStateProps, {}, {}, IState>(
  (state: IState) => {
    return {
      profile: state.user,
    };
  },
  {},
)(nav);
