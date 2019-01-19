// tslint:disable-next-line:no-submodule-imports
import { Button, Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core/";
import { addDays } from "date-fns";
import { produce } from "immer";
import { set as setCookie } from "js-cookie";
import React from "react";
import { connect } from "react-redux";
import { AppToaster } from "../../components/AppToaster";
import { MainLayout } from "../../layouts/Main";
import { getPlayerAction, setPlayerId } from "../../lib/actions/player";
import { ErrorReason } from "../../lib/api/ErrorReason";
import { IPlayer } from "../../lib/models/IPlayer";
import { EntityStatus, IStoreEntity } from "../../lib/reducers/IStoreEntity";
import { IState } from "../../lib/reducers/state";
import "./style.module.scss";
import Router from "next/router";

interface ILoginState {
  steamId?: string;
  submitted: boolean;
  error: {
    steamId?: string,
  };
}
interface IStateProps {
  profile: IStoreEntity<IPlayer>;
  userId?: string;
}
interface IDispatchProps {
  onGetPlayer: (steamId: string) => void;
  onSetUserId: (userId: string) => void;
}

interface IProps extends IStateProps, IDispatchProps { }

const STEAM_ID_REGEX = new RegExp("^\\d+$");
const VALIDATION_REQUIRED = `Please enter your Steam ID.`;
const VALIDATION_INVALID = `The Steam ID must be digits.`;
const MESSAGE_NOT_FOUND = `Could not find your Steam profile.`;
const MESSAGE_ERROR = `An error has occured while finding your account.`;
const STEAM_ID_INPUT_LABEL = `Steam ID`;
const STEAM_ID_INPUT_PLACEHOLDER = `Your Steam32 ID`;
const BUTTON_TEXT = `Step In`;
const PAGE_TITLE = `The Gate`;

const createWelcomeMessage = (name: string) => `Welcome ${name}`;

class Login extends React.Component<IProps, ILoginState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      error: {},
      submitted: false,
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.profile.status === this.props.profile.status) {
      return;
    }

    const { error, status, value } = this.props.profile;
    if (status === EntityStatus.FULFILLED && value) {

      const expires = addDays(Date.now(), 30);
      setCookie("user", value.profile.account_id.toString(), {
        expires,
      });
      this.props.onSetUserId(value.profile.account_id.toString());

      AppToaster.show({
        intent: "success",
        message: createWelcomeMessage(value.profile.personaname),
      });
      Router.push("/profile");
    } else if (status === EntityStatus.REJECTED) {
      const message = error === ErrorReason.NOT_FOUND ?
        MESSAGE_NOT_FOUND :
        MESSAGE_ERROR;

      AppToaster.show({
        intent: "danger",
        message,
      });
    }
  }

  public render() {
    const {
      error,
    } = this.state;

    const { userId } = this.props;

    const loading = this.props.profile.status === EntityStatus.PENDING;

    return (
      <MainLayout>
        <div className="login-container">
          <Card interactive={false} elevation={Elevation.TWO} className="card">
            <h2>
              {PAGE_TITLE}
            </h2>
            <React.Fragment>
              <FormGroup
                label={STEAM_ID_INPUT_LABEL}
                labelFor="steamIdInput"
                helperText={error.steamId}
              >
                <InputGroup
                  required
                  id="steamIdInput"
                  placeholder={userId || STEAM_ID_INPUT_PLACEHOLDER}
                  intent={error.steamId ? "warning" : "none"}
                  onChange={this.handleIdChange}
                />
              </FormGroup>
              <Button
                intent="primary"
                icon="log-in"
                onClick={this.handleLoginClick}
                loading={loading}>
                {BUTTON_TEXT}
              </Button>
            </React.Fragment>
          </Card>
        </div>
      </MainLayout>
    );
  }

  private readonly validate = (steamId?: string): boolean => {
    if (!steamId) {
      this.setState(produce((draft) => {
        draft.error.steamId = VALIDATION_REQUIRED;
      }));

      return false;
    }

    if (!STEAM_ID_REGEX.test(steamId)) {
      this.setState(produce((draft) => {
        draft.error.steamId = VALIDATION_INVALID;
      }));

      return false;
    }

    this.setState(produce((draft) => {
      draft.error = {};
    }));

    return true;
  }

  private readonly handleLoginClick = async () => {
    const { steamId } = this.state;

    this.setState(produce((draft) => {
      draft.submitted = true;
    }));

    if (!this.validate(steamId)) {
      return;
    }

    if (steamId) {
      this.props.onGetPlayer(steamId);
    }
  }

  private readonly handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (this.state.submitted) {
      this.validate(value);
    }

    this.setState(produce((draft) => {
      draft.steamId = value;
    }));
  }
}

const ConnectedLogin = connect<IStateProps, IDispatchProps, {}, IState>(
  (state: IState) => {
    return {
      profile: state.user,
      userId: state.userId,
    };
  },
  {
    onGetPlayer: getPlayerAction,
    onSetUserId: setPlayerId,
  },
)(Login);

export default ConnectedLogin;
