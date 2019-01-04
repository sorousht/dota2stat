import { createAction } from "redux-actions";
import { PlayerApi } from "../../api/Player";

export enum PlayerActions {
  GET = "PLAYER_GET",
  CLEAR = "PLAYER_CLEAR",
  SET_ID = "PLAYER_SET_ID",
}

export const getPlayerAction = createAction(PlayerActions.GET, PlayerApi.getProfile);
export const setPlayerId = createAction(PlayerActions.SET_ID);
export const clearPlayer = createAction(PlayerActions.SET_ID);
