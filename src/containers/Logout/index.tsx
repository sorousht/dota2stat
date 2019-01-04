import { remove as removeCookie } from "js-cookie";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { clearPlayer, setPlayerId } from "../../actions/player";
import { IState } from "../../reducers/state";

interface IDispatchProps {
  onSetPlayerId: (userId: string) => void;
  onClearPlayer: () => void;
}

const logout: React.SFC<IDispatchProps> = (props) => {
  removeCookie("user");
  props.onSetPlayerId("");
  props.onClearPlayer();
  return (
    < Redirect to="/login" />
  );
};

export const Logout = connect<{}, IDispatchProps, {}, IState>(
  (state: IState) => {
    return {};
  },
  {
    onClearPlayer: clearPlayer,
    onSetPlayerId: setPlayerId,
  },
)(logout);
