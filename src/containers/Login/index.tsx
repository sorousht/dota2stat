import React from 'react';
import { Button, InputGroup, FormGroup } from '@blueprintjs/core/';
import { PlayerApi } from '../../api/Player';
import { AppToaster } from '../../components/AppToaster';
import { ErrorReason } from '../../api/ErrorReason';
import { I18n, Trans } from '@lingui/react';
import { t } from '@lingui/macro';
import { i18n } from '../../services/i18n';

type LoginProps = {

};

type LoginState = {
  steamId?: string;
  loading: boolean;
  submitted: boolean;
  error: {
    steamId?: string,
  }
};

const STEAM_ID_REGEX = new RegExp('^\\d{9}$');
const VALIDATION_REQUIRED = i18n._(t('login.msg.required')`Please enter your Steam ID.`);
const VALIDATION_INVALID = i18n._(t('login.msg.invalid')`The Steam ID must be a 9 digit number.`);
const MESSAGE_NOT_FOUND = i18n._(t('login.msg.404')`Could not find your Steam profile.`);
const MESSAGE_ERROR = i18n._(t('login.msg.500')`An error has occured while finding your account.`);
const createWelcomeMessage = (name: string) => i18n._(t('login.msg.welcome')`Welcome ${name}`);

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      loading: false,
      submitted: false,
      error: {

      }
    };
  }

  private readonly _validate = (steamId?: string): boolean => {
    if (!steamId) {
      this.setState({
        error: {
          ...this.state.error,
          steamId: VALIDATION_REQUIRED,
        }
      });

      return false;
    }

    if (!STEAM_ID_REGEX.test(steamId)) {
      this.setState({
        error: {
          ...this.state.error,
          steamId: VALIDATION_INVALID,
        },
      });

      return false;
    }

    this.setState({ error: {} });

    return true;
  }

  private readonly _handleLoginClick = async () => {
    const { steamId } = this.state;

    this.setState({ submitted: true });

    if (!this._validate(steamId)) {
      return;
    }


    this.setState({
      loading: true,
    });

    const {
      data,
      error,
      success,
    } = await PlayerApi.getProfile(steamId || '');

    if (!success) {
      const message = error === ErrorReason.NOT_FOUND ?
        MESSAGE_NOT_FOUND :
        MESSAGE_ERROR;

      AppToaster.show({
        message,
        intent: "danger",
      });
    }

    if (data) {
      AppToaster.show({
        message: createWelcomeMessage(data.profile.personaname),
        intent: "success",
      });
    }

    this.setState({
      loading: false,
    });
  }

  private readonly _handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.submitted) {
      this._validate(event.target.value);
    }

    this.setState({ steamId: event.target.value });
  }

  render() {
    const {
      error,
      loading,
    } = this.state;
    return (
      <I18n>
        {({ i18n }) => (
          <div>
            <h1><Trans id="login.steamIdLabel"></Trans></h1>
            <FormGroup
              label={i18n._(t('login.steamIdLabel')`Steam ID`)}
              labelFor="steamIdInput"
              helperText={error.steamId}
            >
              <InputGroup
                required
                id="steamIdInput"
                placeholder={i18n._(t('login.steamIdPlaceholder')`Your Steam32 ID`)}
                intent={error.steamId ? 'warning' : 'none'}
                onChange={this._handleIdChange}
              />
            </FormGroup>
            <Button onClick={this._handleLoginClick} loading={loading}>Login</Button>
          </div>
        )}
      </I18n>
    );
  }
}