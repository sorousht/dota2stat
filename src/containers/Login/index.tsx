import React from 'react';
import { Button, InputGroup, FormGroup } from '@blueprintjs/core/';
import { PlayerApi } from '../../api/Player';
import { AppToaster } from '../../components/AppToaster';
import { ErrorReason } from '../../api/ErrorReason';

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
          steamId: 'Please enter your Steam ID.',
        }
      });
      
      return false;
    }
    
    if (!STEAM_ID_REGEX.test(steamId)) {
      this.setState({
        error: {
          ...this.state.error,
          steamId: 'The Steam ID must be a 9 digit number.',
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
        'Could not find your Steam profile.' :
        'An error has occured while finding your account.';

      AppToaster.show({
        message,
        intent: "danger",
      });
    }

    if (data) {
      AppToaster.show({
        message: `Welcome ${data.profile.personaname}!`,
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
      <div>
        <FormGroup
          label="Steam ID"
          labelFor="idInput"
          helperText={error.steamId}
        >
          <InputGroup
            required
            id="idInput"
            placeholder="Your Steam32 ID"
            intent={error.steamId ? 'warning' : 'none'}
            onChange={this._handleIdChange}
          />
        </FormGroup>
        <Button onClick={this._handleLoginClick} loading={loading}>Login</Button>
      </div>
    );
  }
}