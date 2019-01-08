// tslint:disable-next-line:no-submodule-imports
import { Button, Card, Elevation, FormGroup, InputGroup, Text } from "@blueprintjs/core/";
// tslint:disable-next-line:no-implicit-dependencies
import { t } from "@lingui/macro";
import { addDays } from "date-fns";
import { produce } from "immer";
import { set as setCookie } from "js-cookie";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { getPlayerAction, setPlayerId } from "../../actions/player";
import { ErrorReason } from "../../api/ErrorReason";
import { AppToaster } from "../../components/AppToaster";
import { IPlayer } from "../../models/IPlayer";
import { EntityStatus, IStoreEntity } from "../../reducers/IStoreEntity";
import { IState } from "../../reducers/state";
import { i18n } from "../../services/i18n";
import styles from "./style.module.scss";

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

interface IProps extends IStateProps, IDispatchProps, RouteComponentProps { }

const STEAM_ID_REGEX = new RegExp("^\\d+$");
const VALIDATION_REQUIRED = i18n._(t("login.msg.required")`Please enter your Steam ID.`);
const VALIDATION_INVALID = i18n._(t("login.msg.invalid")`The Steam ID must be digits.`);
const MESSAGE_NOT_FOUND = i18n._(t("login.msg.404")`Could not find your Steam profile.`);
const MESSAGE_ERROR = i18n._(t("login.msg.500")`An error has occured while finding your account.`);
const STEAM_ID_INPUT_LABEL = i18n._(t("login.steamIdLabel")`Steam ID`);
const STEAM_ID_INPUT_PLACEHOLDER = i18n._(t("login.steamIdPlaceholder")`Your Steam32 ID`);
const BUTTON_TEXT = i18n._(t("login.buttonText")`Step In`);
const PAGE_TITLE = i18n._(t("login.pageTitle")`The Gate`);

const createWelcomeMessage = (name: string) => i18n._(t("login.msg.welcome")`Welcome ${name}`);

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
      this.props.history.push("/profile");
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
      <div className={styles.container}>
        <Card interactive={false} elevation={Elevation.TWO} className={styles.card}>
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

export const ConnectedLogin = connect<IStateProps, IDispatchProps, {}, IState>(
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
