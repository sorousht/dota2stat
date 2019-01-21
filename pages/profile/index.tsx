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
import { AppToaster } from "../../components/AppToaster";

interface IStateProps {
  player: IStoreEntity<IPlayer>;
  winLoss: IStoreEntity<IWinLoss>;
  userId?: string;
}
interface IDispatchProps {
  onGetPlayer: (steamId: string) => void;
  onGetWinLoss: (steamId: string) => void;
}

interface IProps extends IStateProps, IDispatchProps { }

class Profile extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    if (!this.props.userId) {
      AppToaster.show({
        intent: "danger",
        message: "You need to login first!",
        icon: 'error',
      });

      Router.push('/login');

      return
    }

    const { value, status } = this.props.player;

    if (status === EntityStatus.NONE && !value) {
      this.props.onGetPlayer(this.props.userId);
    }
  }

  public render() {
    const { value, error, status } = this.props.player;

    return (
      <MainLayout>
        {
          status === EntityStatus.PENDING || status === EntityStatus.NONE ? this.loadingView :
            (status === EntityStatus.REJECTED && error) || !value ? this.connectionErrorView :
              value &&
              (<>
                <div className="profile-container">
                  <H2 className="bp3-heading">{value.profile.personaname}</H2>
                  <Tooltip content="Navigate to Steam profile" position={Position.RIGHT}>
                    <Tag
                      minimal={true}
                      icon="link"
                      className="steam-link"
                      interactive={true}
                      onClick={() => window.location.assign(value.profile.profileurl)}
                    />
                  </Tooltip>
                </div>
                <img src={value.profile.avatarfull} alt={value.profile.personaname} width={96} style={{ marginBottom: 16 }} />
                <WinLoss
                  winLoss={this.props.winLoss}
                  onGetWinLoss={this.props.onGetWinLoss}
                  steamId={this.props.userId}
                  player={this.props.player}
                />
              </>)
        }
      </MainLayout>
    );
  }

  private loadingView: JSX.Element = (
    <Spinner intent="primary" size={50} />
  );

  private connectionErrorView: JSX.Element = (
    <Callout intent="danger" icon="error">
      Disruptor has broken the connection to the outer world, ask Zeus for help!
      </Callout>
  );
};

const ConnectedProfile = connect<IStateProps, IDispatchProps, {}, IState>(
  (state: IState) => {
    return {
      player: state.user,
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
