// tslint:disable-next-line:no-submodule-imports
import { Button, Card, Elevation, FormGroup, InputGroup, Text } from "@blueprintjs/core/";
// tslint:disable-next-line:no-implicit-dependencies
import { t } from "@lingui/macro";
import { produce } from "immer";
import React from "react";
import { connect } from "react-redux";
import { getPlayerAction } from "../../actions/player";
import { ErrorReason } from "../../api/ErrorReason";
import { AppToaster } from "../../components/AppToaster";
import { IProfile } from "../../models/IProfile";
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
  profile: IStoreEntity<IProfile>;
}
interface IDispatchProps {
  onGetPlayer: (steamId: string) => void;
}

interface IProps extends IStateProps, IDispatchProps { }

const STEAM_ID_REGEX = new RegExp("^\\d{9}$");
const VALIDATION_REQUIRED = i18n._(t("login.msg.required")`Please enter your Steam ID.`);
const VALIDATION_INVALID = i18n._(t("login.msg.invalid")`The Steam ID must be a 9 digit number.`);
const MESSAGE_NOT_FOUND = i18n._(t("login.msg.404")`Could not find your Steam profile.`);
const MESSAGE_ERROR = i18n._(t("login.msg.500")`An error has occured while finding your account.`);
const STEAM_ID_INPUT_LABEL = i18n._(t("login.steamIdLabel")`Steam ID`);
const STEAM_ID_INPUT_PLACEHOLDER = i18n._(t("login.steamIdPlaceholder")`Your Steam32 ID`);

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
      AppToaster.show({
        intent: "success",
        message: createWelcomeMessage(value.personaname),
      });
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

    const loading = this.props.profile.status === EntityStatus.PENDING;

    return (
      <div className={styles.container}>
        <Card interactive={false} elevation={Elevation.TWO} className={styles.card}>
          <h2>
            The Gate
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
                placeholder={STEAM_ID_INPUT_PLACEHOLDER}
                intent={error.steamId ? "warning" : "none"}
                onChange={this.handleIdChange}
              />
            </FormGroup>
            <Button
              intent="primary"
              icon="log-in"
              onClick={this.handleLoginClick}
              loading={loading}>
              Step In
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
    };
  },
  {
    onGetPlayer: getPlayerAction,
  },
)(Login);
