import { createAction } from "redux-actions";
import { PlayerApi } from "../../api/Player";

export enum PlayerActions {
  GET = "PLAYER_GET",
}

export const getPlayerAction = createAction(PlayerActions.GET, PlayerApi.getProfile);
