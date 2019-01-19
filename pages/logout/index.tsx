import { remove as removeCookie } from "js-cookie";
import React from "react";
import { connect } from "react-redux";
import { clearPlayer, setPlayerId } from "../../lib/actions/player";
import { IState } from "../../lib/reducers/state";
import Router from "next/router";

interface IDispatchProps {
  onSetPlayerId: (userId: string) => void;
  onClearPlayer: () => void;
}

const logout: React.SFC<IDispatchProps> = (props) => {
  removeCookie("user");
  props.onSetPlayerId("");
  props.onClearPlayer();
  Router.push("login");
  return null;
};

const ConnectedLogout = connect<{}, IDispatchProps, {}, IState>(
  (state: IState) => {
    return {};
  },
  {
    onClearPlayer: clearPlayer,
    onSetPlayerId: setPlayerId,
  },
)(logout);

export default ConnectedLogout;