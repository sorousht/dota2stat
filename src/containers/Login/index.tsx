// tslint:disable-next-line:no-submodule-imports
import { Button, FormGroup, InputGroup } from "@blueprintjs/core/";
// tslint:disable-next-line:no-implicit-dependencies
import { t } from "@lingui/macro";
import { produce } from "immer";
import React from "react";
import { ErrorReason } from "../../api/ErrorReason";
import { PlayerApi } from "../../api/Player";
import { AppToaster } from "../../components/AppToaster";
import { i18n } from "../../services/i18n";

interface ILoginState {
  steamId?: string;
  loading: boolean;
  submitted: boolean;
  error: {
    steamId?: string,
  };
}

const STEAM_ID_REGEX = new RegExp("^\\d{9}$");
const VALIDATION_REQUIRED = i18n._(t("login.msg.required")`Please enter your Steam ID.`);
const VALIDATION_INVALID = i18n._(t("login.msg.invalid")`The Steam ID must be a 9 digit number.`);
const MESSAGE_NOT_FOUND = i18n._(t("login.msg.404")`Could not find your Steam profile.`);
const MESSAGE_ERROR = i18n._(t("login.msg.500")`An error has occured while finding your account.`);
const STEAM_ID_INPUT_LABEL = i18n._(t("login.steamIdLabel")`Steam ID`);
const STEAM_ID_INPUT_PLACEHOLDER = i18n._(t("login.steamIdPlaceholder")`Your Steam32 ID`);

const createWelcomeMessage = (name: string) => i18n._(t("login.msg.welcome")`Welcome ${name}`);

export class Login extends React.Component<{}, ILoginState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      error: {},
      loading: false,
      submitted: false,
    };
  }

  public render() {
    const {
      error,
      loading,
    } = this.state;

    return (
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
        <Button onClick={this.handleLoginClick} loading={loading}>Login</Button>
      </React.Fragment>
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

    this.setState(produce((draft) => {
      draft.loading = true;
    }));

    const {
      data,
      error,
      success,
    } = await PlayerApi.getProfile(steamId || "");

    if (!success) {
      const message = error === ErrorReason.NOT_FOUND ?
        MESSAGE_NOT_FOUND :
        MESSAGE_ERROR;

      AppToaster.show({
        intent: "danger",
        message,
      });
    }

    if (data) {
      AppToaster.show({
        intent: "success",
        message: createWelcomeMessage(data.profile.personaname),
      });
    }

    this.setState(produce((draft) => {
      draft.loading = false;
    }));
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
