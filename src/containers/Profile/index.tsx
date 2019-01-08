import { Callout, Card, Elevation, H2, Position, Spinner, Tag, Tooltip } from "@blueprintjs/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getPlayerAction, getWinLoss } from "../../actions/player";
import { IPlayer } from "../../models/IPlayer";
import { IWinLoss } from "../../models/IWinLoss";
import { EntityStatus, IStoreEntity } from "../../reducers/IStoreEntity";
import { IState } from "../../reducers/state";
import { WinLoss } from "./components/Winning";
import styles from "./style.module.scss";

interface IStateProps {
  profile: IStoreEntity<IPlayer>;
  winLoss: IStoreEntity<IWinLoss>;
  userId?: string;
}
interface IDispatchProps {
  onGetPlayer: (steamId: string) => void;
  onGetWinLoss: (steamId: string) => void;
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
  const { profile } = value;
  return (
    <>
      <div className={styles.persona}>
        <H2 className="bp3-heading">{profile.personaname}</H2>
        <Tooltip content="Navigate to Steam profile" position={Position.RIGHT}>
          <Tag
            minimal={true}
            icon="link"
            className={styles.steamProfile}
            interactive={true}
            onClick={() => window.location.assign(profile.profileurl)}
          />
        </Tooltip>
      </div>
      <img src={profile.avatarfull} alt={profile.personaname} width={96} style={{ marginBottom: 16 }} />
      <WinLoss
        winLoss={props.winLoss}
        onGetWinLoss={props.onGetWinLoss}
        steamId={props.userId}
        player={props.profile}
      />
    </>
  );
};

export const ConnectedProfile = connect<IStateProps, IDispatchProps, {}, IState>(
  (state: IState) => {
    return {
      profile: state.user,
      userId: state.userId,
      winLoss: state.winLoss,
    };
  },
  {
    onGetPlayer: getPlayerAction,
    onGetWinLoss: getWinLoss,
  },
)(Profile);
