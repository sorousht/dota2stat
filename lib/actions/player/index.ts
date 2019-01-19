import { createAction } from "redux-actions";
import { PlayerApi } from "../../api/Player";

export enum PlayerActions {
  GET = "PLAYER_GET",
  CLEAR = "PLAYER_CLEAR",
  SET_ID = "PLAYER_SET_ID",
  GET_WIN_LOSS = "PLAYER_GET_WIN_LOSS",
}

export const getPlayerAction = createAction(PlayerActions.GET, PlayerApi.getProfile);
export const setPlayerId = createAction(PlayerActions.SET_ID);
export const clearPlayer = createAction(PlayerActions.SET_ID);
export const getWinLoss = createAction(PlayerActions.GET_WIN_LOSS, PlayerApi.getWinLoss);
