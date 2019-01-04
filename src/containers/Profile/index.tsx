import { Callout, Card, Elevation, Position, Spinner, Tag, Tooltip } from "@blueprintjs/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getPlayerAction } from "../../actions/player";
import { IProfile } from "../../models/IProfile";
import { EntityStatus, IStoreEntity } from "../../reducers/IStoreEntity";
import { IState } from "../../reducers/state";
import styles from "./style.module.scss";

interface IStateProps {
  profile: IStoreEntity<IProfile>;
  userId?: string;
}
interface IDispatchProps {
  onGetPlayer: (steamId: string) => void;
}

interface IProps extends IStateProps, IDispatchProps { }

const Profile: React.SFC<IProps> = (props: IProps) => {

  const { value, error, status } = props.profile;

  if (!props.userId) {
    return (<Redirect to="/login" />);
  }

  if (status === EntityStatus.NONE && !value) {
    props.onGetPlayer(props.userId);
  }

  if (status === EntityStatus.PENDING || status === EntityStatus.NONE) {
    return (
      <div>
        <Spinner intent="primary" size={50} />
      </div>
    );
  }

  if ((status === EntityStatus.REJECTED && error) || !value) {
    return (
      <Callout intent="danger" icon="error">
        Disruptor has broken the connection to the outer world, ask Zeus for help!
      </Callout>
    );
  }

  return (
    <Card elevation={Elevation.TWO}>
      <div className={styles.persona}>
        <h2 className="bp3-heading">{value.personaname}</h2>
        <Tooltip content="Navigate to Steam profile" position={Position.RIGHT}>
          <Tag
            minimal={true}
            icon="link"
            className={styles.steamProfile}
            interactive={true}
            onClick={() => window.location.assign(value.profileurl)}
          />
        </Tooltip>
      </div>
      <img src={value.avatarfull} alt={value.personaname} />
    </Card>
  );
};

export const ConnectedProfile = connect<IStateProps, IDispatchProps, {}, IState>(
  (state: IState) => {
    return {
      profile: state.user,
      userId: state.userId,
    };
  },
  {
    onGetPlayer: getPlayerAction,
  },
)(Profile);
