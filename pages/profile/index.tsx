import { Callout, H2, Position, Spinner, Tag, Tooltip } from "@blueprintjs/core";
import React from "react";
import { connect } from "react-redux";
import { getPlayerAction, getWinLoss } from "../../lib/actions/player";
import { IPlayer } from "../../lib/models/IPlayer";
import { IWinLoss } from "../../lib/models/IWinLoss";
import { EntityStatus, IStoreEntity } from "../../lib/reducers/IStoreEntity";
import { IState } from "../../lib/reducers/state";
import { WinLoss } from "./components/Winning";
import { MainLayout } from "../../layouts/Main";
import "./style.module.scss";
import Router from "next/router";

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
    Router.push("/login");
    return null;
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
    <MainLayout>
      <div className="profile-container">
        <H2 className="bp3-heading">{profile.personaname}</H2>
        <Tooltip content="Navigate to Steam profile" position={Position.RIGHT}>
          <Tag
            minimal={true}
            icon="link"
            className="steam-link"
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
    </MainLayout>
  );
};

const ConnectedProfile = connect<IStateProps, IDispatchProps, {}, IState>(
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

export default ConnectedProfile;
