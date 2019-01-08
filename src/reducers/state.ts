import { RouterState } from "connected-react-router";
import { get as getCookie } from "js-cookie";
import { IPlayer } from "../models/IPlayer";
import { IWinLoss } from "../models/IWinLoss";
import { IStoreEntity, StoreEntity } from "./IStoreEntity";

export interface IState {
  readonly userId?: string;
  readonly user: IStoreEntity<IPlayer>;
  readonly winLoss: IStoreEntity<IWinLoss>;
  router: RouterState;
}

const userId = getCookie("user");

export const initialState: IState = {
  router: {} as any,
  user: StoreEntity.empty(),
  userId,
  winLoss: StoreEntity.empty(),
};
